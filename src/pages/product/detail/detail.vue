<template>
  <div style="padding: 15px">
    <el-row class="formm">
      <el-col :span="2" style="margin-right: 20px">ID</el-col>
      <el-col :span="10">
        <el-input :placeholder="goodsInfo.ID"
                  disabled></el-input>
      </el-col>
    </el-row>

    <el-row class="formm" style="margin: 20px 0">
      <el-col :span="2" style="margin-right: 20px">商品名称</el-col>
      <el-col :span="10">
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>

    <el-row class="formm">
      <el-col :span="2" style="margin-right: 20px">商品价格</el-col>
      <el-col :span="10">
        <el-input v-model="price" type="Number" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>

    <el-row style="line-height: 40px;text-align: center;margin: 20px 0">

      <el-col :span="2">商品图片</el-col>

    </el-row>

    <el-row style="margin-left: 10px">
      <el-upload
      :action="imageUrl"
      :fileList="fileList"

      :limit="1"
      list-type="picture-card"

      :on-preview="handlePictureCardPreview"

      :on-remove="handleRemove"
      :on-change="ImgChange"

      >
      <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

    </el-row>

    <el-row style="margin-top: 50px">
      <el-col :span="6" style="text-align: center">
        <el-button type="info" @click="handleCancle" >取消</el-button>
      </el-col>

      <el-col :span="6" style="text-align: center">
        <el-button type="success" @click="saveGoods" >保存</el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import url from '../../../api/api.config'

  import {mapActions} from 'vuex'
  export default {
  data(){
    return{
      name:'',
      price:"",

      goodsInfo:{},

      //上传图片
      fileList:[],
      imageUrl:'',//上传地址，不知道什么原因错误,只能手动上传

      dialogImageUrl: '',//预览
      dialogVisible: false,//预览

      upData:{},//上传对象

    }
  },
    created(){
      this.imageUrl=url.testUpload
    },

    async mounted(){

    if(this.$route.params===null) {
      return
    }

      let goodsId=this.$route.params.goodsId
      this.goodsInfo= await this.reqGetGoodsInfo(goodsId)
      this.name=this.goodsInfo.NAME
      this.price=this.goodsInfo.PRESENT_PRICE

      let obj={url:this.goodsInfo.IMAGE1}

      this.fileList.push(obj)
    },


    methods:{
      ...mapActions(['reqUpLoadImg','reqGetGoodsInfo','reqMendGoodsInfo']),


      //删除图片
      async handleRemove(file, fileList) {
        // this.delImgNace=this.upData.name
        fileList=[]
        this.fileList=[]
        file={}
        this.upData={}
      },

      //取消
      async handleCancle(){
       this.$router.push('/product')
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },


      //图片改变时转换Base64
       ImgChange(file,fileList){
        this.getBase64(file.raw).then(res => {
          this.upData.image=res
          this.upData.name=file.name
        });
        this.fileList=fileList

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

      //保存修改
      saveGoods() {


      if(this.name===""||this.price===""){
        this.$message({
          type: 'fail',
          message: '信息不能为空!'
        });
        return
      }
      if(this.name===this.goodsInfo.NAME&&
      this.price===this.goodsInfo.PRESENT_PRICE
      &&this.fileList[0].url===this.goodsInfo.IMAGE1){
        this.$message({
          type: 'success',
          message: '信息没有改动不需要保存'
        });
        return
      }


       this.$confirm('此操作将修改该商品, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async () => {
         let NAME=this.name
         let PRESENT_PRICE=this.price
         let ID=this.goodsInfo.ID
         let IMAGE1=this.goodsInfo.IMAGE1

         console.log(this.upData)
         // //如果照片墙做了修改并且有值
         let image=this.upData.image
         let name=this.upData.name


         // console.log(await this.reqUpLoadImg({image,name}),'图片地址')


          if(this.fileList.length>0&&JSON.stringify(this.upData)!== "{}"){
            let image=this.upData.image
            let name=this.upData.name
            IMAGE1=await this.reqUpLoadImg({image,name})
            console.log(IMAGE1,'图片地址')
          }


          const result= await this.reqMendGoodsInfo({NAME,PRESENT_PRICE,IMAGE1,ID})
          console.log(result,'修改结果')

          this.$message({
            type: 'success',
            message: '修改成功!'
          });

       }).catch(() => {
       })







      }

    }
  }
</script>

<style scoped>
.formm{
 line-height: 40px;
  text-align: center;
  border: 1px solid #eee;
}
</style>
