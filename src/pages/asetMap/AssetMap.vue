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
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="floor">
      <div class="floorU10">
        <div class="asset" id="1001">1001</div>
        <div class="asset" id="1002">1002</div>
      </div>
      <div class="floorM10">
        <div class="floor-name10">科技楼10楼平面图</div>
      </div>
      <div class="floorD10">
        <div class="asset" id="1003">1003</div>
        <div class="asset" id="1004">1004</div>
      </div>
    </div>
    <div class="floor">
      <div class="floorU">
    <div class="asset stairs" id="1101">楼梯</div>
    <div class="asset classroom south1101" id="1102">南1101</div>
    <div class="asset discussion-room" id="1103">讨论室</div>
    <div class="asset network-center" id="1104">网络中心</div>
    <div class="asset study-room" id="1105">青干班</div>
    <div class="asset committee" id="1106">党委书记</div>
    <div class="asset group-meeting" id="1107">团会议室</div>
    <div class="asset classroom" id="1108">南1102</div>
    <div class="asset stairs right-stairs" id="1109">楼梯</div>
  </div>
    <div class="floorM">
      <div class="aside-flex">
        <div class="asset null-room" id="1122">机房</div>
        <div class="asset aside-room" id="1121">书院</div>
      </div>
      <div class="floor-name">科技楼11楼平面图</div>
      <div class="aside-flex">
        <div class="asset null-room" id="1110">学生事务中心</div>
        <div class="asset aside-room" id="1111">辅导员办公</div>
      </div>
    </div>
    <div class="floorD">
      <div class="asset stairs" id="1120">楼梯</div>
      <div class="asset classroom south1101" id="1119">南1103</div>
      <div class="asset discussion-room" id="1118">学生会</div>
      <div class="asset network-center" id="1117">会议室</div>
      <div class="asset study-room" id="1116">后勤</div>
      <div class="asset committee" id="1115">院长办公</div>
      <div class="asset group-meeting" id="1114">仓库</div>
      <div class="asset classroom" id="1113">南1104</div>
      <div class="asset stairs right-stairs" id="1112">楼梯</div>
    </div>
  </div>
    <div class="floor">
      <div class="floorU floorU12">
        <div class="asset" id="1201">北1201</div>
        <div class="asset" id="1202">北1202</div>
        <div class="asset" id="1203">北1203</div>
        <div class="asset" id="1204">北1204</div>
        <div class="asset" id="1205">北1205</div>
        <div class="asset" id="1206">北1206</div>
        <div class="asset" id="1207">北1207</div>
        <div class="asset right" id="1208">北1208</div>
      </div>
      <div class="floorM">
        <div class="aside-flex">
          <div class="asset null-room null-room12" id="1209">东1209</div>
          <div class="asset aside-room null-room12" id="1210">东1210</div>
        </div>
        <div class="floor-name">科技楼12楼平面图</div>
        <div class="aside-flex">
          <div class="asset null-room null-room12" id="1219">西1219</div>
          <div class="asset aside-room null-room12" id="1220">西1220</div>
        </div>
      </div>
      <div class="floorD floorD12">
        <div class="asset" id="1211">南1211</div>
        <div class="asset" id="1212">南1212</div>
        <div class="asset" id="1213">南1213</div>
        <div class="asset" id="1214">南1214</div>
        <div class="asset" id="1215">南1215</div>
        <div class="asset" id="1216">南1216</div>
        <div class="asset" id="1217">南1217</div>
        <div class="asset right" id="1218">南1218</div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogNull"
      :modal-append-to-body="false"
      top="120px"
      width="30%">
      <span>未查找到资源请确认名称或id输入正确</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNull = false">确  定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  export default {
    name: "AssetMap",
    data() {
      return {
        subTitle: '资产地图',
        queryList: {},
        dialogNull: false
      }
    },
    components: {
      SubTitle
    },
    methods: {
      query() {
        this.$get('/asset_manage/dataMap/getAssetLocation', {
          assetId: this.queryList.id,
          assetName: this.queryList.name
        })
          .then(data => {
            if(data.result.length == 0) {
              this.dialogNull = true
            }
            for (let j = 0; j < document.getElementsByClassName('asset').length; j++) {
              document.getElementsByClassName('asset')[j].style.backgroundColor = 'transparent'
            }
            for (let i = 0; i < data.result; i++) {
              for (let j = 0; j < document.getElementsByClassName('asset').length; j++) {
                if(data.result[i] == document.getElementsByClassName('asset')[j].id) {
                  let id = document.getElementsByClassName('asset')[j].id
                  document.getElementById(id).style.backgroundColor = 'pink'
                }
              }
            }
          })
      }
    }
  }
</script>

<style scoped lang="sass">
.floor
  border: 1px solid #000
  text-align: center
  width: 804px
  height: 400px
  margin-top: 20px
  .floorU, .floorD
    width: 100%
    height: 100px
  .floorM
    width: 100%
    height: 200px
  .floorU
    border-bottom: 1px solid #000
  .floorD
    border-top: 1px solid #000
.floorU div,
.floorD div
  display: inline-block
  height: 100%
  line-height: 100px
.stairs
  width: 80px
  height: 100px
  border-right: 1px solid #000
.right-stairs
  border-right: none
.classroom
  width: 130px
  border-right: 1px solid #000
.discussion-room,
.study-room
  width: 100px
  border-right: 1px solid #000
.committee,
.network-center,
.group-meeting
  width: 60px
  border-right: 1px solid #000
.floorM
  display: flex
  flex-direction: row
  justify-content: space-between
.aside-flex
  width: 80px
.null-room
  height: 50px
  border-bottom: 1px solid #000
.aside-room
  height: 148px
  line-height: 148px
.floor-name
  width: 640px
  height: 198px
  line-height: 198px
  border-right: 1px solid #000
  border-left: 1px solid #000
.floorU12, .floorD12
  display: flex
  flex-direction: row
  justify-content: space-between
  div
    border-right: 1px solid #000
    width: 100px
.right
  border-right: none!important
.null-room12
  height: 100px
.floorU10, .floorD10
  line-height: 100px
  width: 800px
  height: 100px
.floorU10 div, .floorD10 div
  display: inline-block
  border-right: 1px solid #000
  float: left
  width: 100px
  height: 100px
.floorM10
  width: 802px
  height: 200px
  line-height: 200px
  border-bottom: 1px solid #000
  border-top: 1px solid #000
</style>
