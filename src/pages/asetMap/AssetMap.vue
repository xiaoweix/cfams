<template>
  <div class="asset-map">
    <sub-title :subTitle="subTitle"></sub-title>
    <div class="query">
      <el-form :inline="true" :model="queryList" class="demo-form-inline">
        <el-form-item label="资产名">
          <el-input v-model="queryList.name" placeholder="输入资产名进行查询"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="queryList.id" placeholder="输入资产编号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="queryList.warehouseName" placeholder="输入姓名进行查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "AssetMap",
    data() {
      return {
        subTitle: '资产地图',
        queryList: {}
      }
    },
    components: {
      SubTitle
    },
    methods: {
      onSubmit() {
        console.log("kp")
      }
    }
  }
</script>

<style scoped>

</style>
