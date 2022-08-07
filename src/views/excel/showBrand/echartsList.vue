<!--HTML的代码--><!--宽高自己改的哈，这是我写好的代码 我需要600 × 260的  你们看着改-->
<template>
    <div ref="RefMain" style="width: 1200px;height:400px;"></div>
</template>


<script>
import * as echarts from 'echarts';
export default {
    name: 'echartsList',
    props: ['xAxisData','yAxisData1','yAxisData2','yAxisData3','yAxisData4'],//接收父页面传过来的值
    data() {
        return {
            name: "ceshi",
            datatest: "344"
        }
    },
    mounted() {        //调用方法 初始化
        this.initEchats();
    },
    watch:{
        xAxisData(newData, oldData){
            this.initEchats();
        }
    },
    methods: {
        initEchats() {

            // 基于准备好的dom，初始化echarts实例
            //这里注意$refs这是拿到上面的div，这一步很重要
            var myChart = echarts.init(this.$refs.RefMain);
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['Evaporation', 'Precipitation', 'Temperature', 'Temperature1']
                },
                xAxis: [
                    {
                        type: 'category',
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'aa', 'bb', 'cc', 'dd', 'ee', this.ceshi3],
                        data: this.xAxisData,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Precipitation',
                        min: 0,
                        max: 2000000,
                        interval: 400000,
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    }
                    // ,
                    // {
                    //     type: 'value',
                    //     name: 'Temperature',
                    //     min: 0,
                    //     max: 25,
                    //     interval: 5,
                    //     axisLabel: {
                    //         formatter: '{value} °C'
                    //     }
                    // }
                ],
                series: [
                    {
                        name: 'Evaporation',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' ml';
                            }
                        },
                        data: this.yAxisData1
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' ml';
                            }
                        },
                        data: this.yAxisData2
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        // yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' ml';
                            }
                        },
                        data: this.yAxisData3
                    },
                    {
                        name: 'Temperature1',
                        type: 'line',
                        // yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' ml';
                            }
                        },
                        data: this.yAxisData4
                    }
                ]
            });
        }
    }
}
</script>