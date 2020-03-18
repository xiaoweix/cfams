<template>
<div id="main-layout">
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>学院固定资产管理系统</q-toolbar-title>
        <span class="my-info">1985298599@qq.com</span>
        <span>注销</span>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-tree
          class="q-pl-md"
          :nodes="menu"
          node-key="label"
          no-connectors
          :selected.sync="selected"
          @click.native="getMenu"
        />
      </q-scroll-area>
    </q-drawer>

    <q-page-container style="padding-top: 50px;padding-left: 220px; padding-right: 20px">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</div>
</template>

<script>
  export default {
    name: "MainLayout",
    data() {
      return {
        selected: '首页',
        menu: [
          {
            label: '首页'
          },
          {
            label: '资产管理',
            children: [
              {
                label: '资产列表'
              },
              {
                label: '资产入库'
              },
              {
                label: '资产使用历史'
              }
            ]
          },
          {
            label: '个人中心'
          },
          {
            label: '仓库管理',
            children: [
              {
                label: '仓库列表'
              }
            ]
          },
          {
            label: '用户管理',
            children: [
              {
                label: '用户列表'
              },
              {
                label: '添加用户'
              }
            ]
          },
          {
            label: '综合日志管理',
            children: [
              {
                label: '信息列表'
              },
              {
                label: '操作日志'
              }
            ]
          },
          {label: '资产地图'}
        ]
      }
    },
    methods: {
      getMenu() {
        const menu = this.selected

      }
    }
  }
</script>

<style scoped lang="sass">
.q-header
  height: 50px
  background: #33CCFF
  padding: 0 20px
.my-info
  margin-right: 30px
.q-page-container
  padding: 10px 20px
</style>
