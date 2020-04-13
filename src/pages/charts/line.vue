<template>
  <div id="app">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>

</template>

<script>


  export default {
    methods: {
      drawChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main"));

        // 指定图表的配置项和数据
        let option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    mounted() {
      this.drawChart();
    }

  }
</script>

<style scoped>

</style>
