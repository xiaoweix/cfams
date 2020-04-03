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
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="level"
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
            <el-button @click="handleView(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="dialogDelete = true">删除</el-button>
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
          levels: [
            {
              value: '1',
              label: '学生'
            },
            {
              value: '2',
              label: '教师'
            },
            {
              value: '3',
              label: '维修工'
            },
            {
              value: '4',
              label: '管理员'
            }
          ],
          statuses: [
            {
              value: '1',
              label: '正常'
            },
            {
              value: '2',
              label: '冻结'
            },
            {
              value: '3',
              label: '待处理'
            }
          ],
          queryList: {
            id: '',
            phone: '',
            level: '学生'
          },
          userList: [
            {
              id: 1002,
              name: '小微',
              phone: '15783928953',
              level: '管理员',
              status: '正常'
            }
          ],
          deleteId: ''
        }
      },
      components: {
        SubTitle
      },
    methods: {
      onSubmit() {
        console.log('ok')
      },
      handleDelete (row) {

      },
      sureDelete () {

      },
    }
  }
</script>

<style scoped>

</style>
