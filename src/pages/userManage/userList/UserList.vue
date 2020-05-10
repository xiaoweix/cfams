<template>
  <div class="user-list">
    <sub-title :subTitle="subTitle"></sub-title>
    <div class="query">
      <el-form :inline="true" :model="queryList" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="queryList.id" placeholder="输入编号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="queryList.phone" placeholder="输入手机号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="queryList.level" placeholder="请选择">
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="queryList.name" placeholder="输入姓名进行查询"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryList.status" placeholder="请选择">
            <el-option
              v-for="item in statuses"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-list">
      <el-table :data="userList" >
        <el-table-column
          label="id"
          prop="id">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="jobLevel"
          label="级别">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="count"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small" :style="{ display: isSysAdmin ? 'inline-block':'none' }">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index, userList)" :style="{ display: isSysAdmin ? 'inline-block':'none' }">删除</el-button>
            <el-button @click="handleView(scope.row)" type="text" size="small">资料详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogDelete"
      :modal-append-to-body="false"
      top="120px"
      width="30%">
      <span>确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete()">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="提示"
      :visible.sync="dialogDelete"
      :modal-append-to-body="false"
      top="120px"
      width="30%">
      <span>确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "UserList",
    data() {
      return {
        subTitle: '用户列表',
        dialogDelete: false,
        currentRow: {},
        total: 9,
        pageSize: 10,
        levels: [
          {
            value: '1',
            label: '普通学生用户'
          },
          {
            value: '2',
            label: '教师用户'
          },
          {
            value: '3',
            label: '管理员'
          },
          {
            value: '4',
            label: '超级管理员'
          }
        ],
        statuses: [
          {
            value: '1',
            label: '正常'
          },
          {
            value: '2',
            label: '锁定'
          },
          {
            value: '3',
            label: '待处理'
          }
        ],
        queryList: {
          id: '',
          phone: '',
          level: '',
          name: '',
          status: ''
        },
        userList: [],
        deleteId: '',
        currentPage: 1,
        isSysAdmin: true
      }
    },
    components: {
      SubTitle
    },
    created() {
      const userCode = sessionStorage.getItem('userCode')
      if(userCode == 9) {
        this.isSysAdmin = true
      } else {
        this.isSysAdmin = false
      }
      this.queryUserList()
    },
    methods: {
      onSubmit() {
        this.queryUserList()
      },
      handleDelete(row, index, rows) {
        this.dialogDelete = true;
        this.currentRow.id = row.id
        this.currentRow.index = index
      },
      sureDelete () {
        this.userList.splice(this.currentRow.index, 1)
        this.$get('/asset_manage/user/removeUser', {
          userId: this.currentRow.id
        }).then(data => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: data.msg
          })
        })
        this.dialogDelete = false
      },
      handleEdit () {
        // this.$post('/asset_manage/user/modifyUser')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      queryUserList() {
        let jobLevel = [['1', '2', '3', '9'], ['普通学生用户', '教师用户', '管理员', '超级管理员']]
        let userStatus = [['2', '1', '0'], ['正常', '锁定', '待处理']]
        for(let j = 0; j < jobLevel[1].length; j++) {
          if (this.queryList.level == jobLevel[1][j]) {
            this.queryList.level = jobLevel[0][j]
          }
        }
        for(let j = 0; j < userStatus[1].length; j++) {
          if (this.queryList.status == userStatus[1][j]) {
            this.queryList.status = userStatus[0][j]
          }
        }
        this.$get('/asset_manage/user/userList', {
          pageSize: this.pageSize,
          currPage: this.currentPage,
          userId: this.queryList.id ? this.queryList.id : '',
          userName: this.queryList.name ? this.queryList.name : '',
          status: this.queryList.status ? this.queryList.status : '',
          // telephone: this.queryList.phone ? this.queryList.phone : '',
          jobLevel: this.queryList.level ? this.queryList.level : '',
        })
          .then(data => {
            this.total = data.result.length
            for(let i = 0; i < data.result.length; i++) {
              for(let j = 0; j < jobLevel[0].length; j++) {
                if (data.result[i].jobLevel == jobLevel[0][j]) {
                  data.result[i].jobLevel = jobLevel[1][j]
                }
              }
              for(let j = 0; j < userStatus[0].length; j++) {
                if (data.result[i].status == userStatus[0][j]) {
                  data.result[i].status = userStatus[1][j]
                }
              }
            }
            this.userList = data.result
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>

</style>
