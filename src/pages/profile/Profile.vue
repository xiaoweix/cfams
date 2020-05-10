<template>
  <div class="my-profile">
    <SubTitle :subTitle="subTitle"/>
    <el-link class="edit-profile" type="primary" @click="editForm">编辑资料</el-link>
    <el-form :model="profile" label-width="80px" :disabled="formDisabled">
      <el-form-item label="姓名">
        <el-input v-model="profile.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="profile.telephone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="profile.email"></el-input>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input v-model="profile.signature"></el-input>
      </el-form-item>
      <q-separator></q-separator>
      <el-form-item label="资源使用历史" label-width="160">
        <el-table
          :data="history"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="资产编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="assetName"
            label="资产名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="applyType"
            label="使用方式">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="使用时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="使用状态">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "Profile",
    data() {
      return {
        subTitle: '个人中心',
        formDisabled: true,
        profile: {},
        history: []
      }
    },
    created() {
      this.$get('/asset_manage/user/personalZone')
        .then(data => {
          this.profile = data.result
        })
      this.$get('/asset_manage/asset/getHistoryList', {
        userName: sessionStorage.getItem('userEmail')
      })
        .then(data => {
          this.history = data.result
        })
    },
    components: {
      SubTitle
    },
    methods: {
      editForm() {
        this.formDisabled = false
      }
    }
  }
</script>

<style scoped lang="sass">
.my-profile
  position: relative
.el-form
  margin-top: 30px
  width: 800px
/deep/.el-input__inner
  border: none
  background: none

/deep/.el-input.is-disabled .el-input__inner
  color: slategrey

.edit-profile
  position: absolute
  top: 80px
  right: 0
  margin-right: 40px
</style>
