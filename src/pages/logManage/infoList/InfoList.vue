<template>
  <div class="info-list">
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
    <div class="info-list">
      <el-table :data="infoList" >
        <el-table-column
          prop="id"
          label="资产编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="申请人">
        </el-table-column>
        <el-table-column
          prop="type"
          label="申请类型">
        </el-table-column>
        <el-table-column
          prop="count"
          label="申请数量">
        </el-table-column>
        <el-table-column
          prop="time"
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="count"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">同意</el-button>
            <el-button type="text" size="small" @click="dialogDelete = true">拒绝</el-button>
            <el-button @click="handleView(scope.row)" type="text" size="small">申请详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "InfoList",
    data() {
      return {
        subTitle: '信息列表',
        infoList: [
          {
            id: '0002',
            name: 'jello',
            type: '借用',
            count: 5,
            time: '2018-09-09',
            status: '待处理'
          }
        ],
        queryList: {}
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

