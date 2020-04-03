<template>
  <div>
    <SubTitle :subTitle="subTitle"/>
    <q-btn color="primary"
           text-color="white"
           label="新建仓库"
           @click="dialogAdd = true"
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
          prop="count"
          label="仓库资源数">
        </el-table-column>
        <el-table-column
          prop="time"
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
        wareList: [
          {
            id: '1001',
            name: '11楼仓库',
            address: '科技楼11楼',
            count: 5,
            time: "2020-02-27"
          },
          {
            id: '1007',
            name: '11楼仓库',
            address: '科技楼11楼',
            count: 5,
            time: "2020-02-27"
          }
        ]
      }
    },
    components: {
      SubTitle
    },
    methods: {
      handleAddWarehouse() {},
      onSubmit() {},
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
        this.dialogDelete = false
      },
      sureAdd () {
        this.wareList.push(this.currentRow)
        this.dialogAdd = false
      }
    }
  }
</script>

<style scoped lang="sass">
.add-warehouse
  float: right
  margin-top: -45px
</style>
