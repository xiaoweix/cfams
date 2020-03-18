<template>
  <div id="asset-profile">
    <SubTitle :subTitle="subTitle"/>
    <div id="all-count" class="row justify-between">
      <SpecificAsset :myColor="allColor" :title="allTitle" :number="allNum"/>
      <SpecificAsset :myColor="useColor" :title="useTitle" :number="useNum"/>
      <SpecificAsset :myColor="borrowColor" :title="borrowTitle" :number="borrowNum"/>
      <SpecificAsset :myColor="badColor" :title="badTitle" :number="badNum"/>
    </div>
    <div class="bar-box row justify-between q-mt-lg">
      <div id="assetsUse" style="width: 500px;height: 400px"></div>
      <div id="assetsBorrow" style="width: 500px;height: 300px"></div>
    </div>
    <div id="halfYearUse" style="width: calc(100vw - 300px);height: 400px"></div>
  </div>
</template>

<script>
  import SubTitle from "components/common/SubTitle";
  import SpecificAsset from "components/SpecificAsset";
  export default {
    name: "AssetProfile",
    data() {
      return {
        subTitle: '资产概况',
        allColor: '#FFDF25',
        allTitle: '资产总数量',
        allNum: '1234',
        useColor: '#36A9CE',
        useTitle: '投入使用的资源数量',
        useNum: '567',
        borrowColor: '#D0E17D',
        borrowTitle: '出借资源数量',
        borrowNum: '234',
        badColor: '#EF5AA1',
        badTitle: '损坏资源数量',
        badNum: '20'
      }
    },
    components: {
      SubTitle,
      SpecificAsset
    },
    mounted(){
      this.drawPie();
      this.drawBar();
      this.drawLine();
    },
    methods: {
      drawPie() {
        // 基于准备好的dom，初始化echarts实例
        let myPie = this.$echarts.init(document.getElementById('assetsUse'))
        // 绘制图表
        myPie.setOption({
          title: {
            text: '资源使用情况',
            left: 'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          grid: {
            top: 10
          },
          legend: {
            orient: 'vertical',
            right: 'right',
            data: ['借用', '领用', '维修', '固定使用']
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['40%', '40%'],
              label:{
                position: 'inside',
                formatter: '{b}: {d}%'
              },
              data: [
                {value: 25, name: '借用'},
                {value: 25, name: '领用'},
                {value: 25, name: '维修'},
                {value: 25, name: '固定使用'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      drawBar() {
        let myBar = this.$echarts.init(document.getElementById('assetsBorrow'))
        myBar.setOption({
          title: {
            text: '资源借用排行'
          },
          color: ['#36A9CE'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 80,
            bottom: 40
          },
          xAxis: [
            {
              type: 'category',
              data: ['照相机', '摄像机', '指纹录入器', 'ID识别器', '单片机'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'bar',
              barWidth: '40%',
              data: [25, 10, 25, 2, 14]
            }
          ]
        })
      },
      drawLine() {
        let myLine = this.$echarts.init(document.getElementById('halfYearUse'))
        myLine.setOption({
          title: {
            text: '最近半年资源使用情况'
          },
          xAxis: {
            type: 'category',
            data: ['2019.09', '2019.10', '2019.11', '2019.12', '2020.01', '2020.02']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        })
      }
    }
  }
</script>

<style scoped lang="sass">
#all-count
  margin-top: 30px
  padding: 10px 20px
  border: 1px solid #1D1D1D
</style>
