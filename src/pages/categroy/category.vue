<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          <span>
            <el-button style="color: green"
                       @click="retFirstCategory">{{title}}</el-button>
            <span style="font-size: 15px">{{secondTitle? ' -> ' + secondTitle:null}}</span>
          </span>

          <el-button style="float: right; padding: 3px 0;background-color: #0A8C70;padding: 5px;color: white"
                     @click="open"
                     type="text">
            <i class="el-icon-plus"></i>
            添加分类</el-button>

        </div>
        <div style="position: absolute;right:10px;
                    top:45px;
                    color: red;
                  font-size: 15px">一级分类信息最多只存在7个</div>
      </div>

      <div class="text item" style="height:100%">
        <!--一级分类-->
        <el-table
          :data="tableData"
          v-if="currentCategory===1"
          style="width: 100%;"
          border
        >
              <el-table-column
                prop="ID"
                label="ID"
              >
              </el-table-column>

              <el-table-column
                prop="MALL_CATEGORY_NAME"
                label="name"
              >
              </el-table-column>

              <el-table-column
                prop="MALL_CATEGORY_NAME"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button-group style="display: flex">
                    <el-button style="color: #000"
                               size="mini "
                               type="info"plain icon="el-icon-arrow-left"
                               :disabled="tableData[scope.$index].message==='不可删除'"

                               @click="delCategory(scope.$index, scope.row)"
                    >删除</el-button>
                    <el-button style="color: #000;"
                               size="mini"

                               @click="vimCategorySub(scope.$index, scope.row)"

                               type="info" plain>查看子分类<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                  </el-button-group>
                </template>
              </el-table-column>



              <el-table-column
                prop="message"
                label="补充信息"
              >
                <template slot-scope="scope" >

                  <div  v-show="tableData[scope.$index].message==='不可删除'" style="color: red">
                    默认信息不可改动
                  </div>

                <div v-show="tableData[scope.$index].message!=='不可删除'">
                  最多可以存在7个主分类
                </div>

                </template>
              </el-table-column>


        </el-table>


        <!--二级分类-->
        <el-table
          v-if="currentCategory===2"
          :data="subTableData"
          style="width: 100%;"
          border
          height="480px"


        >
          <el-table-column
            prop="ID"
            label="ID"
          >
          </el-table-column>


          <el-table-column
            prop="MALL_SUB_NAME"
            label="name"
          >
          </el-table-column>

          <el-table-column


            label="操作"
          >
            <template slot-scope="scope">
              <el-button-group style="display: flex">
                <el-button style="color: #000"
                           size="mini "
                           type="info"plain icon="el-icon-arrow-left"
                           :disabled="subTableData[scope.$index].ID.length>31"
                           @click="delSubCategory(scope.$index, scope.row)"


                >删除</el-button>
                <el-button style="color: #000;"
                           size="mini"

                           @click="vimSubCategorySub(scope.$index, scope.row)"

                           type="info" plain>查看子商品<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              </el-button-group>
            </template>
          </el-table-column>

        </el-table>
      </div>



    </el-card>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import 'element-ui/lib/theme-chalk/display.css';


  export default {
   data(){
     return{
       title:"一级分类列表",
       secondTitle:"",

       tableData: [],//一级分类
       subTableData:[],//二级分类
       categoryID:'',//一级分类ID
       currentCategory:1,//默认是一级分类
     }
   },
    components:{
    },
    methods:{
      ...mapActions(['reqGetCategory','reqGetSubCategory','reqAddCategory','reqDelCategory','reqAddCategorySub','reqDelSubCategory']),

      //查看子分类
      vimCategorySub(a,b){
        // console.log(b)
        this.secondTitle=b.MALL_CATEGORY_NAME
         // this.title=`一级分类列表 -> ${b.MALL_CATEGORY_NAME}`
        this.categoryID=b.ID
        //获取二级分类
        this.getSubCategory(b.ID)
      },

      //查看子商品
      vimSubCategorySub(a,b){

        this.$store.commit('changeDefultActive','2-2')
        localStorage.defaultActive=JSON.stringify('2-2')
        localStorage.currentTitle=JSON.stringify('商品管理')
        this.$store.commit('changeTitle',"商品管理")
        this.$router.push({name:"ProductHome",params:{subCategory:b}})

      },

      //异步获取二级分类接口
      async getSubCategory(categoryId){
          let result=await this.reqGetSubCategory(categoryId)
          this.subTableData=result

        this.currentCategory=2
        localStorage.subTableData=JSON.stringify(this.subTableData)
        localStorage.secondTitle=JSON.stringify(this.secondTitle)

        console.log('子分类长度',this.subTableData.length)

      },

      //返回一级分类列表
      retFirstCategory(){
        if(localStorage.secondTitle){
          localStorage.removeItem('subTableData')
          localStorage.removeItem('secondTitle')
          this.secondTitle=''
          this.currentCategory=1
          this.getFirstCategory()
        }
      },

      //异步获取一级分类
     async getFirstCategory(){
       let result= await this.reqGetCategory()
       for(let item in result){
         if(item<=4){
           result[item].message="不可删除"
         }else {
           break
         }
       }
       console.log(result,'一级结果')
       this.tableData=result
      },

      //添加分类
      open() {
        //如果大于7个直接退出
        if(this.tableData.length>=7&&this.currentCategory===1){
          this.$message({
            type: 'fail',
            message: "一级分类上限"
          });
          return
        }
        this.$prompt('请输入需要添加的分类类名，在一级分类页面添加的是一级类名，二级就是二级', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          inputPattern: '',

        }).then( async ({value}) => {
          //添加一级
          if(this.currentCategory===1){
            let MALL_CATEGORY_NAME=value
            let ID=this.tableData.length+1
            await this.reqAddCategory({MALL_CATEGORY_NAME,ID})
            this.getFirstCategory()
          }

          //添加二级
          else if(this.currentCategory===2){

            let MALL_SUB_NAME=value
            let ID=this.subTableData.length+1
            // let MALL_CATEGORY_ID=this.subTableData[0].MALL_CATEGORY_ID

            let MALL_CATEGORY_ID=this.categoryID

            let res=await this.reqAddCategorySub({MALL_CATEGORY_ID,MALL_SUB_NAME,ID})

            this.getSubCategory(MALL_CATEGORY_ID)

          }
            this.$message({
              type: 'success',
              message: '新分类： ' + value
            });

        }).catch(() => {

        });
      },

      //删除一级分类
      delCategory(a,b){
       this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning',
         center: true
       }).then(async() => {
         await this.reqDelCategory(b.MALL_CATEGORY_NAME)
         this.getFirstCategory()
         this.$message({
           type: 'success',
           message: '删除成功!'
         })})
         .catch()

      },

      //删除二级分类
      delSubCategory(a,b){
        console.log(b)

        if(b.ID.length<30){
            this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(async() => {
              await this.reqDelSubCategory(b.ID)
               this.getSubCategory(b.MALL_CATEGORY_ID)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })})

              .catch(()=>{
              })
        }


       },



    },



    async mounted(){
     //解决刷新bug
     if(localStorage.subTableData){
       this.currentCategory=2
       this.subTableData=JSON.parse(localStorage.subTableData)
       this.secondTitle=JSON.parse(localStorage.secondTitle)
       return
     }
    //获取一级分类
      this.getFirstCategory()
    },
  }
</script>

<style scoped>
.box-card{
  height: 580px;
  position: relative;
}
  .on{
    color: red;
  }
  .block{
    position: absolute;
    bottom: 2px;
    right: 5px;
  }
</style>
