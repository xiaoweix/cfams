<template>
  <div>
    <SubTitle :subTitle="subTitle"/>
    <div class="query">
      <el-form :inline="true" :model="queryList" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="queryList.id" placeholder="输入编号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="使用人">
          <el-input v-model="queryList.user" placeholder="输入使用人进行查询"></el-input>
        </el-form-item>
        <el-form-item label="资产名">
          <el-input v-model="queryList.asset" placeholder="输入资产名进行查询"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="queryList.status">
            <el-option label="领用" value="shanghai"></el-option>
            <el-option label="使用" value="beijing"></el-option>
            <el-option label="借用" value="shanghai"></el-option>
            <el-option label="维修" value="beijing"></el-option>
            <el-option label="报废" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table
        :data="assetList"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="assetId"
          label="资产编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="assetName"
          label="资产名">
        </el-table-column>
        <el-table-column
          prop="user"
          label="使用人">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="使用时间">
        </el-table-column>
        <el-table-column
          prop="assetType"
          label="类型">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :modal-append-to-body="false"
               width="40%"
               :visible.sync="dialogView"
               title="资产使用详情">
      <el-form :model="assetDetail" label-width="120px">
        <el-form-item label="资产名">
          <el-input v-model="assetDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="资产型号">
          <el-input v-model="assetDetail.model"></el-input>
        </el-form-item>
        <el-form-item label="使用地点">
          <el-input v-model="assetDetail.useAddress"></el-input>
        </el-form-item>
        <el-form-item label="开始使用时间">
          <el-input v-model="assetDetail.startTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="assetDetail.endTime"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度">
          <template>
            <el-radio v-model="assetDetail.urgent" label="1">不急</el-radio>
            <el-radio v-model="assetDetail.urgent" label="2">一般</el-radio>
            <el-radio v-model="assetDetail.urgent" label="3">急用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="assetDetail.count"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="assetDetail.remarks" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogView = false">取 消</el-button>
        <el-button type="primary" @click="dialogView = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "AssetUseHistory",
    data() {
      return {
        subTitle: '资产使用历史',
        dialogView: false,
        queryList: {},
        assetList: [
          {
            assetId: '1001',
          }
        ],
        assetDetail: {}
      }
    },
    components: {
      SubTitle
    },
    methods: {
      handleView(asset) {
        this.dialogView = true
      }
    }
  }
</script>

<style scoped lang="sass">
.query
  margin-top: 20px
/deep/.el-input .el-input__inner
  height: 32px
.el-form-item
  margin: 0 5px
.list
  margin-top: 20px
</style>
