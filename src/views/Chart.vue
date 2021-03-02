<template>
  <div class="chart">
    <div id="pie" style="width:500px;height:500px">pie</div>
  </div>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      chartOption: {}
    };
  },
  methods: {
    handleRenderPie() {
      const pieCharts = this.$echarts.init(document.getElementById("pie"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{d}%\n{b}"
        },
        legend: {
          top: "5%",
          left: "center"
        },
        series: [
          {
            name: "比率",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 3805.47, name: "500" },
              { value: 2533.7, name: "大摩健康" },
              { value: 1855.89, name: "传媒" },
              { value: 1656.85, name: "基建" },
              { value: 3990.15, name: "红利" },
              { value: 2129.52, name: "宝元" },
              { value: 2560.86, name: "安裕" },
              { value: 2805.43, name: "国开行" },
              { value: 4106.26, name: "趋势优选" },
              { value: 1005.54, name: "高等信用" },
              { value: 4109.9, name: "鹏扬泓利" },
              { value: 3106.99, name: "东方红" },
              { value: 3084.23, name: "民生加银" },
              { value: 4133.71, name: "瑞信" }
            ]
          }
        ]
      };
      pieCharts.setOption(option);
    },
    handleRenderLine() {}
  },
  mounted() {
    // this.handleRenderPie();
    this.handleRenderLine();
  }
};
</script>

<style></style>
