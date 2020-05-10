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
          label="申请ID">
        </el-table-column>
        <el-table-column
          prop="assetId"
          label="资产编号">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="申请人">
        </el-table-column>
        <el-table-column
          prop="type"
          label="申请类型">
        </el-table-column>
        <el-table-column
          prop="assetName"
          label="资产名称">
        </el-table-column>
        <el-table-column
          prop="number"
          label="申请数量">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="result"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleAgree(scope.row, scope.row.isDeal)" type="text" size="small" :disabled="true">同意</el-button>
            <el-button type="text" size="small" @click="handleReject(scope.row, scope.row.isDeal)" :disabled="scope.row.isDeal">拒绝</el-button>
            <el-button @click="handleDisagree(scope.row)" type="text" size="small">申请详情</el-button>
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
        infoList: [],
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
        queryList: {},
        isDeal: false
      }
    },
    components: {
      SubTitle
    },
    created() {
      this.getList()
    },
    methods: {
      onSubmit() {
        this.getList()
      },
      getList() {
        let urgencyArr = [['1', '2', '3'], ['不急', '一般', '急用']]
        let resultArr = [['0', '1', '2'], ['待处理', '同意', '拒绝']]
        let typeArr = [['1', '2', '3', '4'], ['借用', '申领', '采购', '反馈']]
        this.$get('/asset_manage/apply/assetLogList', {
          assetId: this.queryList.id,
          userName: this.queryList.name,
          status: this.queryList.status,
          telephone: this.queryList.phone,
          jobLevel: this.queryList.level
        })
          .then(data => {
            console.log(data);
            for(let i = 0; i < data.result.length; i++) {
              for(let j = 0; j < urgencyArr[0].length; j++) {
                if(urgencyArr[0][j] == data.result[i].urgency) {
                  data.result[i].urgency = urgencyArr[1][j]
                }
              }
              for(let j = 0; j < resultArr[0].length; j++) {
                if(resultArr[0][j] == data.result[i].result) {
                  data.result[i].result = resultArr[1][j]
                }
              }
              for(let j = 0; j < typeArr[0].length; j++) {
                if(typeArr[0][j] == data.result[i].type) {
                  data.result[i].type = typeArr[1][j]
                }
              }
            }
            this.infoList = data.result;
            for(let i = 0; i < data.result.length; i++) {
              if(data.result[i].result == '同意' || data.result[i].result == '拒绝') {
                data.result[i].isDeal = true;
              } else {
                data.result[i].isDeal = false;
              }
            }
          })
      },
      handleAgree(row, ff) {
        this.$get('/asset_manage/apply/agreeApply', {
          applyId: row.id
        })
          .then(data => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.msg
            })
            for(let i = 0; i < this.infoList.length; i++) {
              if (this.infoList[i].result == '同意' || this.infoList[i].result == '拒绝') {
                this.infoList[i].isDeal = true;
              } else {
                this.infoList[i].isDeal = false;
              }
            }
          })
      },
      handleReject(row, ff) {
        this.$get('/asset_manage/apply/disagreeApply', {
          applyId: row.id
        })
          .then(data => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.msg
            })
            for(let i = 0; i < this.infoList.length; i++) {
              if (this.infoList[i].result == '同意' || this.infoList[i].result == '拒绝') {
                this.infoList[i].isDeal = true;
              } else {
                this.infoList[i].isDeal = false;
              }
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>

