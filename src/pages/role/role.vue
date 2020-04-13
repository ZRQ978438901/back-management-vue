<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">

        <el-button type="primary" @click="showDialog">创建角色</el-button>
        <el-dialog title="设置角色"  :visible.sync="dialogFormVisible"

          ref="dialog">

          <el-row>
            <el-col :span="4" style="text-align: center;line-height: 40px;">角色名称</el-col>
            <el-col :span="14"><el-input v-model="name" autocomplete="off"></el-input></el-col>
          </el-row>

          <el-row>
            <el-col :span="4" style="text-align: center;line-height: 40px;margin-top: 20px">选择权限</el-col>
          </el-row>

          <el-tree
            v-if="isShow"
            :props="props"
            :load="loadNode"
            node-key="id"
            :default-expanded-keys="['2']"
            :default-checked-keys="isChecked"

            lazy
            show-checkbox
            @check-change="handleCheckChange">
          </el-tree>

          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancleTree">取 消</el-button>
            <el-button type="primary" @click="handleAddRole">确 定</el-button>
          </div>

        </el-dialog>


        <el-button type="primary"   @click="handleRolePower"

                   :disabled="JSON.stringify(currentRow)==='{}'"

        >设置角色权限</el-button>
      </div>
      <div >
        <el-table
          ref="singleTable"
          :data="RoleDate"
          tooltip-effect="dark"
          style="width: 100%"

          highlight-current-row
          @current-change="handleSelectionChange"

          height="400px"
        >

          <el-table-column
            type="index"
            width="80">
          </el-table-column>

          <el-table-column
            prop="name"
            label="角色名称"
          >
          </el-table-column>


          <el-table-column
            prop="create_time"
            label="创建时间"

          >
          </el-table-column>

          <el-table-column
            prop="auth_time"
            label="授权时间"
          >
          </el-table-column>

          <el-table-column
            prop="auth_name"
            label="授权人"
          >
          </el-table-column>



          <!--<el-table-column-->
            <!--label="日期"-->
            <!--width="120">-->
            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
          <!--</el-table-column>-->

        </el-table>

        <el-row style="float:right">
          <el-button @click="cancelSelect" type="info">取消选择</el-button>

          <el-button @click="delRole" type="success"

                     
                     :disabled="JSON.stringify(currentRow)==='{}'"
          >删除角色</el-button>

        </el-row>
      </div>
    </el-card>


  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import moment from 'moment'

  export default {
    data(){
      return{
        RoleDate:[],
        currentRow :{},
        name:'',
        isShow:true,
        dialogFormVisible: false,
        formLabelWidth: '80px',

        props: {
          label: 'name',
          children: 'zones'
        },
        menus:{
        "2" : false,
        "3" : false,
        "4" : false,
        "5" : false,
        "2-1" : false,
        "2-2" : false
        },

        isMend:false,//是否修改
        isChecked:[],
      }
    },
    methods:{
      ...mapActions(['reqGetRoleList','reqAddRole','reqDelRole','reqMendRole']),

      handleSelectionChange(val){
          this.currentRow =val
          this.isChecked=[]
      },
      cancelSelect() {
        this.$refs.singleTable.setCurrentRow({});
      },
      //删除Role
      async delRole(){
        if(this.currentRow.auth_name==="赵瑞权"){
          this.$message("最高权限不能修改")
          return
        }
          await this.reqDelRole({name:this.currentRow.name})

          this.getRoles()
          this.dealTree()
          this.currentRow={}
          this.isChecked=[]
          this.dialogFormVisible=false
      },

      //取消
      handleCancleTree(){
        this.dialogFormVisible=this.isMend = false
        this.dealTree()

      },

      handleCheckChange(data, checked, indeterminate) {
        this.menus[data.id]=checked
        console.log(data)
      },
      //节点懒加载
      loadNode(node, resolve){
        if (node.level === 0) {
          return resolve([{ id:"1",name: '首页',disabled: true }, { id:"2",name: '商品' },{id:"3",name:"用户管理"},{id:"4",name:"角色管理"},{id:"5",name:"图形图表"}]);
        }
        if (node.level > 3) return resolve([]);

        let hasChild;
        if (node.data.name === '商品') {
          hasChild=true
        } else {
          hasChild=false
        }
        setTimeout(() => {
          let data;
          if (hasChild) {
            data = [{
              id:"2-1",
              name: '品类管理'
            }, {
              id:"2-2",
              name: '商品管理'
            }];
          } else {
            data = [];
          }
          resolve(data);
        }, 0);
      },
      //显示
      showDialog(){
        this.dialogFormVisible = true
      },
      //添加角色
      async handleAddRole(){
        //修改角色
        if(this.isMend){
          console.log({name:this.currentRow.name,
            newName:this.name,newMenus: this.menus},'提交对象')
            await this.reqMendRole({name:this.currentRow.name,
            newName:this.name,newMenus: this.menus})
          this.isMend=false
        }
        else {
          if(this.name===''){
            this.$message("角色名称不能为空")
            return
          }
          let auth_name=JSON.parse(localStorage.manager).userName//授权人
          let name=this.name
          let menus=this.menus
         let result= await this.reqAddRole({name,auth_name,menus})
          if(result.code===1){
            this.$message("角色名称不能重复")
            return
          }

        }


        this.currentRow={}
        this.getRoles()
        this.dealTree()
        this.dialogFormVisible=false
      },

      //树形控件bug
      dealTree(){
        this.isShow=false
        setTimeout(()=>{
          this.isShow=true
        },0)
      },


      //获取角色列表
      async getRoles(){
        console.log(    this.$refs.dialog,'对象')

          let result= await this.reqGetRoleList()
          this.RoleDate=result
          for(let item of this.RoleDate){
            item.auth_time= moment(item.auth_time).format('YYYY-MM-DD HH:mm:ss')
            item.create_time= moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')
          }

      },

      //处理修改权限
    async  handleRolePower(){

        this.isMend=true
        if(this.currentRow.auth_name==="赵瑞权"){
          this.$message("最高权限不能修改")
          return
        }
        this.dialogFormVisible=true

        this.name=this.currentRow.name
        this.menus=this.currentRow.menus[0]
        for(let item in this.menus){
            if(this.menus[item]===true){
              this.isChecked.push(item)
            }
        }

      },

    },

      mounted () {
      this.getRoles()
    },


  }
</script>

<style scoped>

  .selecter{

  }
</style>
