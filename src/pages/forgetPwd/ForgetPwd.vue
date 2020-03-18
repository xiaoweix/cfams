<template>
  <div id="forgetPassword" class="relative-position">
    <Title></Title>
    <q-form
      class="q-gutter-md"
    >
      <div class="row justify-between my-email-row">
        <q-input
          filled
          type="email"
          v-model="email"
          label="请输入电子邮箱 *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入正确邮箱']"
        />
        <q-btn label="获取邮箱验证码" type="cancel"/>
      </div>


      <q-input
        filled
        type="text"
        v-model="code"
        label="请输入邮箱验证码 *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || '请输入邮箱验证码'
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="newPassword"
        label="请输入新密码 *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || '请输入新密码'
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="newPassword2"
        label="请确认密码 *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || '请确认密码'
        ]"
      />

      <div class="row justify-between my-select" >
        <q-btn label="确认" type="sure" color="primary"/>
        <q-btn label="取消" type="cancel"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import Title from "components/common/Title"
export default {
  name: "ForgetPwd",
  data() {
    return {
      email: '',
      code: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  components: {
    Title
  }
}
</script>

<style scoped lang="sass">
.q-form
  width: 400px
  position: absolute
  left: 50%
  margin-left: -150px
  margin-top: 50px
.my-select .q-btn
  width: 40%
.my-email-row .q-btn
  height: 50px
</style>
