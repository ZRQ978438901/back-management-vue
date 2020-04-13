<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户</span>
        <el-button style="float: right; padding: 3px 0;padding: 5px"
                   @click="dialogVisible = true"
                   type="primary">添加用户</el-button>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"

         >

        <el-row>
          <el-col :span="4" style="line-height: 40px;font-size: 12px">用户名</el-col>
          <el-col :span="18">
            <el-input v-model="userName"></el-input>
          </el-col>
        </el-row>


          <el-row style="margin: 20px 0">
            <el-col :span="4" style="line-height: 40px;font-size: 12px">密码</el-col>
            <el-col :span="18">
              <el-input v-model="password"></el-input>
            </el-col>
          </el-row>

          <div style="display: flex;justify-content: flex-end">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="adduser">确 定</el-button>
          </div>


        </el-dialog>

      </div>

      <div >
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"

        >
          <el-table-column
            prop="userName"
            label="用户名"
            >
          </el-table-column>

          <el-table-column
            prop="create_time"
            label="注册时间"
           >
          </el-table-column>

          <el-table-column
            prop="role.name"
            label="所属角色">
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作">

            <template slot-scope="scope">


                  <div style="display: flex">
                    <el-button @click="handleDel(scope.row)" type="text" size="small" >删除</el-button>



                    <el-button @click="handleMend" type="text" size="small" >修改</el-button>



                    <el-select v-model="tableData[scope.$index].role.name"
                               :disabled="tableData[scope.$index].role.name==='ZRQ管理者'"

                               @change="handleAddRole(scope.row,scope.$index)"
                               placeholder="请选择" style="margin-left: 5px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>

            </template>


          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import moment from "moment"
  export default {
    data(){
      return{
        tableData:[],
        currentRow:{},
        dialogVisible:false,


        userName:'',
        password:'',

        roleList:[],

        options:[],

        selected:'',

      }
    },


    methods:{
      ...mapActions(['reqAddUser','reqGetUsers','reqDelUser','reqGetRoleList','reqUpdateUser']),

      //获取用户列表
      async getUserList(){
        this.tableData=await this.reqGetUsers()

        for(let item of this.tableData){
          item.create_time= moment(item.auth_time).format('YYYY-MM-DD HH:mm:ss')
        }
      },

      //修改
      handleMend(){
        this.$message("别三心两意了，删了再添加吧")
      },


      handleDel(a){
        if(a.userName==="admin"){
          this.$message("不能删除")
          return
        }

        setTimeout(async ()=>{
          await this.reqDelUser({_id:a._id})
          this.getUserList()
        },500)

      },

      //添加用户
      async adduser(){
        this.dialogVisible = false
        await this.reqAddUser({userName: this.userName,
          password:this.password})
        this.getUserList()
      },

      //添加角色
     async handleAddRole(a,b){

        let obj=this.tableData[b]
        let _id=obj._id
        let role=obj.role

        await this.reqUpdateUser({_id,role})

       this.getUserList()

       this.$message("修改成功")


      },

      //绑定角色
     async bandRole(){
        let result=await this.reqGetRoleList()
          this.roleList=result

          for(let item of this.roleList.splice(1)){
            let obj={}
            obj.value=item.name
            obj.label=item.name
            obj.menus=item.menus

            this.options.push(obj)
          }
          console.log(this.options)

      }

    },
    created(){
     this.getUserList()
    },
    mounted(){
      this.bandRole()
    }
  }
</script>

<style scoped>

</style>
