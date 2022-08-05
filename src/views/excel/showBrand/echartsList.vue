<!--HTML的代码--><!--宽高自己改的哈，这是我写好的代码 我需要600 × 260的  你们看着改-->
<template>
    <div ref="RefMain" style="width: 1500px;height:400px;"></div>
</template>


<script>
import * as echarts from 'echarts';
export default {
    name: 'echartsList',
    data() {
        return {
            name: "ceshi",
            datatest: "344"
        }
    },
    mounted() {        //调用方法 初始化
        this.initEchats();
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
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'aa'
                            , 'bb', 'cc', 'dd', 'ee', 'ff'],
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
                        max: 250,
                        interval: 50,
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
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                        ]
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' ml';
                            }
                        },
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 200.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
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
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
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
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 200.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    }
                ]
            });
        }
    }
}
</script>