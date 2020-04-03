<template>
  <div class="add-user">
    <sub-title :subTitle="subTitle"></sub-title>
    <div class="add-user-form">
      <el-form :model="addUserForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="addUserForm.status" placeholder="请选择">
            <el-option
              v-for="item in statuses"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人签名">
          <el-input  type="textarea" v-model="addUserForm.describe"></el-input>
        </el-form-item>
        <el-form-item class="row justify-between">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "AddUser",
    data() {
      return {
        subTitle: '添加用户',
        addUserForm: {},
        statuses: [
          {
            value: 1,
            label: '学生'
          },
          {
            value: 2,
            label: '教师'
          },
          {
            value: 3,
            label: '维修工'
          },
          {
            value: 4,
            label: '管理员'
          }
        ],
        status: ''
      }
    },
    components: {
      SubTitle
    }
  }
</script>

<style scoped lang="sass">
.add-user-form
  width: 400px
  margin-top: 30px
  position: relative
  left: 50%
  margin-left: -200px
/deep/.el-button
  width: 120px
</style>
