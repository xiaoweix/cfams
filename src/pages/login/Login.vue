<template>
<div id="login">
  <div class="formArea">
    <Title></Title>
    <q-form
      @submit="onLogin"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="account"
        label="请输入您的手机号或邮箱 *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '请输入正确的手机号或者邮箱']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="请输入您的密码 *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || '请输入正确的密码'
        ]"
      />

      <div class="forgetPsd" @click="$router.push('/forget-password')">忘记密码</div>

      <div>
        <q-btn label="登录" type="submit" color="primary"/>
      </div>
    </q-form>
</div>
</div>
</template>

<script>
import Title from 'components/common/Title'
export default {
  name: "Login",
  data() {
    return {
      account: '',
      password: ''
    }
  },
  components: {
    Title
  },
  methods: {
    onLogin() {
      console.log('pppp')
    }
  }
}
</script>

<style scoped lang="sass">
.formArea
  position: relative
.q-form
  width: 400px
  position: absolute
  left: 50%
  margin-left: -200px
  margin-top: 100px
.q-btn
  width: 100%
.forgetPsd
  float: right
  color: #31CCEC
  cursor: pointer
.forgetPsd:hover
  color: #1976D2
</style>
