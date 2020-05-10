<template>
  <div>
    <SubTitle :subTitle="subTitle"/>
    <q-btn color="primary"
           text-color="white"
           label="新建仓库"
           @click="handleAddWarehouse"
           class="add-warehouse"/>
    <div class="query">
      <el-form :inline="true" :model="queryList" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="queryList.id" placeholder="输入编号进行查询"></el-input>
        </el-form-item>
        <el-form-item label="仓库名">
          <el-input v-model="queryList.warehouse" placeholder="输入仓库名进行查询"></el-input>
        </el-form-item>
        <el-form-item label="所在地名">
          <el-input v-model="queryList.address" placeholder="输入所在地名进行查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="wareList">
      <el-table :data="wareList" >
        <el-table-column
          prop="id"
          label="仓库编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="仓库名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="仓库所在地">
        </el-table-column>
        <el-table-column
          prop="assetNum"
          label="仓库资源数">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="count"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--对话框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogDelete"
        :modal-append-to-body="false"
        top="120px"
        width="30%">
        <span>确认删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDelete = false">取 消</el-button>
          <el-button type="primary" @click="sureDelete()">确 定</el-button>
        </span>
      </el-dialog>
    <el-dialog
      title="编辑仓库"
      :visible.sync="dialogView"
      :modal-append-to-body="false"
      top="120px"
      width="30%">
      <el-form :model="currentRow" label-width="100px">
        <el-form-item label="仓库名">
          <el-input v-model="currentRow.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地点">
          <el-input v-model="currentRow.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogView = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加仓库"
      :visible.sync="dialogAdd"
      :modal-append-to-body="false"
      top="120px"
      width="30%">
      <el-form :model="currentRow" label-width="100px">
        <el-form-item label="仓库名">
          <el-input v-model="currentRow.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地点">
          <el-input v-model="currentRow.address" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="地图ID">-->
<!--          <el-input v-model="currentRow.mapId" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="管理员ID">-->
<!--          <el-input v-model="currentRow.manageId" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="备注">
          <el-input v-model="currentRow.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "Warehouse",
    data() {
      return {
        subTitle: '仓库列表',
        queryList: {},
        deleteId: '',
        currentRow: {},
        dialogView: false,
        dialogDelete: false,
        dialogAdd: false,
        wareList: []
      }
    },
    components: {
      SubTitle
    },
    created() {
      this.getWareList()
    },
    methods: {
      handleAddWarehouse() {
        this.dialogAdd = true
      },
      onSubmit() {
        this.getWareList()
      },
      handleView (row) {
        this.dialogView = true
        this.currentRow.name = row.name
        this.currentRow.address = row.address
      },
      handleDelete (row) {
        this.dialogDelete = true
        this.deleteId = row.id
        this.currentRow = row
      },
      sureDelete () {
        const id = this.deleteId
        for (let item in this.wareList) {
          if(this.wareList[item].id = id) {
            this.wareList.splice(item, 1)
            return this.wareList
          }
        }
        this.$get('/asset_manage/warehouse/removeWarehouse', {
          warehouseId: id
        })
        this.dialogDelete = false
      },
      sureAdd () {
        this.wareList.push(this.currentRow)
        this.$post('/asset_manage/warehouse/addWarehouse', {
          name: this.currentRow.name,
          address: this.currentRow.name,
          // mapId: this.currentRow.mapId,
          // manageId: this.currentRow.manageId,
          manageId: 0,
          remarks: this.currentRow.remarks
        })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
        this.dialogAdd = false
      },
      getWareList() {
        this.$get('/asset_manage/warehouse/warehouseList', {
          currPage: 1,
          pageSize: 50,
          warehouseName: this.queryList.warehouse,
          assetId: this.queryList.id,
          address: this.queryList.address
        }).then(data => {
          for(let i = 0; i < data.result.length; i++) {
            // data.result[i].createTime = new Date(data.result[i].createTime)
            data.result[i].createTime = this.dateFormat(data.result[i].createTime)
          }
          this.wareList = data.result
          console.log(this.wareList);
        })
      },
      dateFormat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      }
    }
  }
</script>

<style scoped lang="sass">
.add-warehouse
  float: right
  margin-top: -45px
</style>
