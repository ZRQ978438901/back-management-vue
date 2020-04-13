<template>
  <div>
    <el-card class="box-card">
      <div slot="header" >
        <span >
          <el-cascader
            style="width: 250px"
            v-model="selectValue"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        </span>

        <span >
          <el-input style="margin-left:10px;width: 180px"
                    v-show="selectValue[0]==='名称'"
                    placeholder="请输入商品名称"
                    v-model="searchValue"></el-input>
        </span>



        <el-button style="float: right; padding: 3px 0;background-color: #0A8C70;padding: 5px;color: white"
                   @click="showDialog"
                   type="text"><i class="el-icon-plus"></i>添加商品</el-button>


        <el-dialog title="商品名称" :visible.sync="dialogFormVisible" style="font-weight: bold;font-size: 15px;line-height: 40px">

            <el-row >
              <el-col :span="3">选择分类</el-col>
              <el-col :span="21">
                <el-cascader
                v-model="selectValue2"

                :options="options.slice(1)"
                :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-col>
            </el-row>

            <el-row style="margin: 10px 0">
                <el-col :span="3" >商品名称</el-col>
              <el-col :span="21">
                <el-input
                  v-model="goodsName" autocomplete="off"></el-input>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3">商品价格</el-col>
              <el-col :span="21">
                <el-input v-model="goodsPrice"
                          type="Number"
                ></el-input>
              </el-col>

            </el-row>


          <el-row>
            <el-col :span="3" style="margin: 10px 0">上传图片</el-col>
          </el-row>

          <el-upload
            :action="imageUrl"
            :fileList="fileList"
            ref="upload"
            :limit="1"
            list-type="picture-card"

            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleImgChange"
            :on-success="handleSuccess"

          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>


          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancle">取 消</el-button>
            <el-button type="primary" @click="addGoods">确 定</el-button>
          </div>


        </el-dialog>



      </div>
      <div >

        <el-table
          :data="goodsArr"
          style="width: 100%;"
          border
          height="450px"
        >
          <el-table-column
            prop="ID"
            label="ID"
          >
          </el-table-column>

          <el-table-column
            prop="NAME"
            label="商品描述"
          >
          </el-table-column>

          <el-table-column
            prop="PRESENT_PRICE"
            label="价格"
            width="80px"
          >
          </el-table-column>


          <el-table-column
            prop="MALL_CATEGORY_NAME"
            label="操作"
            width="250px"
          >
            <template slot-scope="scope">
              <el-button-group style="display: flex;" >
                <el-button style="color: #000"
                           size="mini "
                           type="info"plain icon="el-icon-arrow-left"
                            :disabled="goodsArr[scope.$index].ID.length>31"
                           @click="delGoods(scope.$index, scope.row)"
                >删除</el-button>
                <el-button style="color: #000;"
                           size="mini"

                           @click="vimGoodsInfo(scope.$index, scope.row)"
                           type="info" plain>查看详情<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              </el-button-group>
            </template>
          </el-table-column>



        </el-table>

        <div class="block">
          <el-pagination
            v-show="searchValue===''"
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :total="count">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import url from "../../../api/api.config"

  import {mapActions} from 'vuex'

  export default {
    data(){
      return{
        searchValue:'',

        goodsArr:[],
        count:0,
        currentPage:1,

        selectValue:'',//选择器的值

        options:[{value:"名称", label:"按名称搜索"}],//选择器配置

        //dialog
        selectValue2:'',//添加商品时选择器的值
        dialogTableVisible: false,
        dialogFormVisible: false,
        goodsName:"",
        goodsPrice:'',
        imgurl:"",//服务器返回的静态资源图片

        //上传图片
        fileList:[],
        imageUrl:'',//上传地址，不知道什么原因错误,只能手动上传
        dialogImageUrl: '',//预览
        dialogVisible: false,//预览
        upData:{},//上传对象

      }
    },
    watch:{
      searchValue:{
        handler(newvalue){
          if(newvalue===''){
            this.getGoodsFromPage()
            return
          }
           this.searchGoods(newvalue)
        }
      },

    },
    methods:{
      ...mapActions(['reqGetGoods','reqGoodsFromSubID','reqSearchGoods','reqGetCategory','reqGetSubCategory','reqGoodsFromID','reqUpLoadImg','reqDelLoadImg','reqAddGoods','reqDelGoods']),
      //根据页数获取商品
      async getGoodsFromPage(){
        let result= await this.reqGetGoods(this.currentPage)
        this.goodsArr= result.message
        this.count= Math.floor(result.count/7*10)
      },
      //分页获取
      async handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage=val
        localStorage.currentPage=JSON.stringify(this.currentPage)
        let result= await this.reqGetGoods(this.currentPage)
        this.goodsArr= result.message
      },

      //获取分类商品
      async getGoodsFromSub(subid){
        let result= await  await this.reqGoodsFromSubID(subid)
        this.goodsArr= result.message
        this.count= Math.floor(result.count/7*10)

      },

      //搜索商品
      async searchGoods(newvalue){
        this.goodsArr=await this.reqSearchGoods(newvalue)
      },
      //查看商品详情
      vimGoodsInfo(a,b){
        this.$router.push({name:'Detail',params:{goodsId:b.ID}})
      },
      //获取一级二级分类填充选择器
      async getCategory(){
       let result= await this.reqGetCategory()
        for(let item of result){
          let obj={}
          obj.value=item.MALL_CATEGORY_NAME
          obj.label=item.MALL_CATEGORY_NAME
          obj.children=[]
          let subcategory=await this.reqGetSubCategory(item.ID)

          for(let gory of subcategory){
            let object={}
            object.value=gory.ID
            object.label=gory.MALL_SUB_NAME
            obj.children.push(object)
          }
          this.options.push(obj)
        }
      },



      //选择器
      async handleChange(value){
        if(this.selectValue[0]==='名称'){
          this.currentPage=1
          this.getGoodsFromPage()
          return
        }

      let result= await this.reqGoodsFromID(this.selectValue[1])
        this.goodsArr=result.message
        this.count=10

      },

      //显示添加商品对话框
      showDialog(){
        this.dialogFormVisible = true

        console.log(this.selectValue2)
      },

      //添加商品
     async addGoods(){
        if(this.imgurl===""||this.goodsName===''
        ||this.goodsPrice===''||this.selectValue2[1]===''){
          this.$message("信息不完善")
          return
        }
        this.dialogFormVisible = false
        let data={
          NAME:this.goodsName,
          SUB_ID:this.selectValue2[1],
          IMAGE1:this.imgurl,
          PRESENT_PRICE:this.goodsPrice,
        }
        let result=await this.reqAddGoods(data)
        await this.searchGoods(result.message)

       {
         this.selectValue2= this.goodsName= this.goodsPrice= this.imgurl=''
       }


      },
      //删除商品
      async delGoods(a,b){
        await  this.reqDelGoods(b.ID)

        await this.searchGoods(b.NAME)

      },

      //删除图片
        async handleRemove(file, fileList) {
        let name=file.name
        let result= await this.reqDelLoadImg({name})
          console.log(result,'删除')
          fileList=[]
          file={}
          this.upData={}
      },

      //取消上传也要删除服务器图片
     async handleCancle(){
        this.dialogFormVisible = false

        if(this.upData.name){
          this.fileList=[]
         await this.reqDelLoadImg({name:this.upData.name})
        }
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(file)

        this.dialogVisible = true;
      },

       handleSuccess(res,file,filelist){
        console.log(res)
      },
      //上传图片
      async handleImgChange(file,fileList){

         this.getBase64(file.raw).then(res => {
           this.upData.image=res
           this.upData.name=file.name
         });

         let image=this.upData.image
         let name=this.upData.name
         this.imgurl=await this.reqUpLoadImg({image,name})

        console.log(this.imgurl)
      },

      //转化base64
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },

    },



    created(){
      if(localStorage.currentPage){
        this.currentPage=JSON.parse(localStorage.currentPage)
      }
        this.imageUrl=url.testUpload


    },

    mounted(){
      if(JSON.stringify(this.$route.params)!=="{}"){
        let obj=this.$route.params.subCategory
         this.getGoodsFromSub(obj.ID)
        this.getCategory()
        return
      }

      this.getGoodsFromPage()
      //填充选择器
      this.getCategory()

    },

    destroyed () {
      // if(localStorage.currentPage){
      //   localStorage.removeItem("currentPage")
      // }
    }
  }
</script>

<style scoped>
.block{
  float: right;
}
</style>
