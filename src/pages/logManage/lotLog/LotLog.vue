<template>
  <div class="lot-log">
    <sub-title :subTitle="subTitle"></sub-title>
    <div class="query">
      <el-form :inline="true" :model="queryList" class="demo-form-inline">
        <el-form-item label="操作人">
          <el-input v-model="queryList.name" placeholder="输入编号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="操作起止时间">
          <el-date-picker
            v-model="queryList.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="lotLogTable" >
      <el-table-column
        prop="name"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="content"
        label="操作内容">
      </el-table-column>
      <el-table-column
        prop="time"
        label="操作时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "LotLog",
    data() {
      return {
        subTitle: '操作日志',
        queryList: {},
        lotLogTable: [
          {
            name: '胡丽霞',
            content: '删除资源',
            time: '2015-53-43'
          }
        ]
      }
    },
    components: {
      SubTitle
    },
    methods: {
      onSubmit() {}
    }
  }
</script>

<style scoped>

</style>
