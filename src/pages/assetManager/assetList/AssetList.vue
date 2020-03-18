<template>
  <div id="assets-list">
    <SubTitle :subTitle="subTitle"/>
    <q-btn color="primary"
           text-color="white"
           label="申请采购"
           @click="handleApply"
           class="apply"/>
    <div class="query">
      <el-form :inline="true" :model="queryList" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="queryList.id" placeholder="输入编号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="仓库名">
          <el-input v-model="queryList.warehouse" placeholder="输入仓库名进行查询"></el-input>
        </el-form-item>
        <el-form-item label="资产名">
          <el-input v-model="queryList.asset" placeholder="输入资产名进行查询"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryList.status">
            <el-option label="空闲" value="shanghai"></el-option>
            <el-option label="使用中" value="beijing"></el-option>
            <el-option label="借用中" value="shanghai"></el-option>
            <el-option label="维修中" value="beijing"></el-option>
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
          prop="assetType"
          label="资产类型">
        </el-table-column>
        <el-table-column
          prop="assetStatus"
          label="资产状态">
        </el-table-column>
        <el-table-column
          prop="assetWarehouse"
          label="仓库">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleUse(scope.row)" type="text" size="small">详情</el-button>
            <el-button type="text" size="small" @click="handleBorrow(scope.row)">借用</el-button>
            <el-button @click="handleReceive(scope.row)" type="text" size="small">申领</el-button>
            <el-button type="text" size="small" @click="handleBad(scope.row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block my-page">
      <el-pagination
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <!--弹框-->
    <!--资产借用申请-->
    <el-dialog title="资产借用申请"
               :modal-append-to-body="false"
               :visible.sync="dialogBorrowVisible">
      <el-form :model="assetBorrow" label-width="100px">
        <el-form-item label="资产名">
          <el-input v-model="assetBorrow.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产型号">
          <el-input v-model="assetBorrow.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用地点">
          <el-input v-model="assetBorrow.useAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始借用时间">
              <el-date-picker
                v-model="assetBorrow.borrowDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归还时间">
              <el-date-picker
                v-model="assetBorrow.sendDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="紧急程度">
          <template>
            <el-radio v-model="assetBorrow.urgent" label="1">不急</el-radio>
            <el-radio v-model="assetBorrow.urgent" label="2">一般</el-radio>
            <el-radio v-model="assetBorrow.urgent" label="3">急用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="assetBorrow.remarks"
                    autocomplete="off"
                    type="textarea"
                    autosize></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBorrowVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogBorrowVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--资产领用申请-->
    <el-dialog title="资产领用申请"
               :modal-append-to-body="false"
               :visible.sync="dialogReceiveVisible">
      <el-form :model="assetReceive" label-width="100px">
        <el-form-item label="资产名">
          <el-input v-model="assetReceive.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产型号">
          <el-input v-model="assetReceive.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用地点">
          <el-input v-model="assetReceive.useAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="assetReceive.count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度">
          <template>
            <el-radio v-model="assetReceive.urgent" label="1">不急</el-radio>
            <el-radio v-model="assetReceive.urgent" label="2">一般</el-radio>
            <el-radio v-model="assetReceive.urgent" label="3">急用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="assetReceive.remarks"
                    autocomplete="off"
                    type="textarea"
                    autosize></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReceiveVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogReceiveVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--资产损坏反馈-->
    <el-dialog title="资产损坏反馈"
               :modal-append-to-body="false"
               :visible.sync="dialogBadVisible">
      <el-form :model="assetBad" label-width="100px">
        <el-form-item label="资产名">
          <el-input v-model="assetBad.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产型号">
          <el-input v-model="assetBad.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="损坏地点">
          <el-input v-model="assetBad.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="损坏程度">
          <template>
            <el-radio v-model="assetBad.badLevel" label="1">普通</el-radio>
            <el-radio v-model="assetBad.badLevel" label="2">一般</el-radio>
            <el-radio v-model="assetBad.badLevel" label="3">严重</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="损坏图片">
          <el-image
            style="width: 100px; height: 100px"
            :src="assetBad.badPic1"></el-image>
          <el-image
            style="width: 100px; height: 100px"
            :src="assetBad.badPic2"></el-image>
          <el-image
            style="width: 100px; height: 100px"
            :src="assetBad.badPic3"></el-image>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="assetBad.remarks"
                    autocomplete="off"
                    type="textarea"
                    autosize></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBadVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogBadVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--申请采购-->
    <el-dialog title="申请采购"
               :modal-append-to-body="false"
               :visible.sync="dialogApplyVisible">
      <el-form :model="assetApply" label-width="100px">
        <el-form-item label="资产名">
          <el-input v-model="assetApply.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产型号">
          <el-input v-model="assetApply.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input v-model="assetApply.store" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始借用时间">
              <el-date-picker
                v-model="assetBorrow.borrowDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归还时间">
              <el-date-picker
                v-model="assetBorrow.sendDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="紧急程度">
          <template>
            <el-radio v-model="assetApply.urgent" label="1">不急</el-radio>
            <el-radio v-model="assetApply.urgent" label="2">一般</el-radio>
            <el-radio v-model="assetApply.urgent" label="3">急用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="assetApply.count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源图片">
          <el-image
            style="width: 100px; height: 100px"
            :src="assetApply.assetPic1"></el-image>
          <el-image
            style="width: 100px; height: 100px"
            :src="assetApply.assetPic2"></el-image>
          <el-image
            style="width: 100px; height: 100px"
            :src="assetApply.assetPic3"></el-image>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="assetApply.remarks"
                    autocomplete="off"
                    type="textarea"
                    autosize></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogApplyVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogApplyVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--资产使用-->
    <el-dialog title="资产使用"
               :modal-append-to-body="false"
               :visible.sync="dialogUseVisible">
      <el-form :model="assetUse" label-width="100px">
        <el-form-item label="资产名">
          <el-input v-model="assetUse.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产型号">
          <el-input v-model="assetUse.model" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用地点">
          <el-input v-model="assetUse.useAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="assetUse.remarks"
                    autocomplete="off"
                    type="textarea"
                    autosize></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUseVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogUseVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "AssetsList",
    data() {
      return {
        subTitle: '资产列表',
        dialogBorrowVisible: false,
        dialogReceiveVisible: false,
        dialogBadVisible: false,
        dialogApplyVisible: false,
        dialogUseVisible: false,
        queryList: {
          id: '',
          warehouse: '',
          asset: '',
          status: '空闲'
        },
        assetList: [
          {
          assetId: '1001',
          assetName: '打印机',
          assetType: 'E130',
          assetStatus: '空闲',
          assetWarehouse: '11楼1103'
        },{
          assetId: '1001',
          assetName: '打印机',
          assetType: 'E130',
          assetStatus: '空闲',
          assetWarehouse: '11楼1103'
        },{
          assetId: '1001',
          assetName: '打印机',
          assetType: 'E130',
          assetStatus: '空闲',
          assetWarehouse: '11楼1103'
        },{
          assetId: '1001',
          assetName: '打印机',
          assetType: 'E130',
          assetStatus: '空闲',
          assetWarehouse: '11楼1103'
        }],
        assetBorrow: {
          name: '',
          model: '',
          useAdress: '',
          borrowDate: '',
          sendDate: '',
          urgent: '',
          remarks: ''
        },
        assetReceive: {
          name: '',
          model: '',
          useAdress: '',
          borrowDate: '',
          sendDate: '',
          urgent: '',
          remarks: ''
        },
        assetBad: {},
        assetApply: {},
        assetUse: {}
      }
    },
    components: {
      SubTitle
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleBorrow(asset) {
        this.dialogBorrowVisible = true
        this.assetBorrow.name = asset.assetName
      },
      handleReceive(asset) {
        this.dialogReceiveVisible = true
        this.assetReceive.name = asset.assetName
      },
      handleUse(asset) {
        this.dialogUseVisible = true
        this.assetUse.name = asset.assetName
      },
      handleApply() {
        this.dialogApplyVisible = true
      },
      handleBad(asset) {
        this.dialogBadVisible = true
        this.assetBad.name = asset.assetName
      }
    }
  }
</script>

<style scoped lang="sass">
.apply
  margin-top: -50px
  float: right
.my-page
  position: fixed
  bottom: 20px
  left: 50%
  margin-left: -100px
.query
  margin-top: 30px
</style>
