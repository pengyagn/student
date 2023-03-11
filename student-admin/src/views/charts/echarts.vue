<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card" >
                        <div class="content">
                            <i class="fa fa-wrench"></i>&nbsp;就业人数 {{ jobNum }}
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card">
                        <div class="content">
                            <i class="fa fa-mortar-board"></i>&nbsp;升学人数 {{ eduNum }}
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                </div>
            </el-col>
        </el-row>
<!--        <br>-->
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card class="box-card2">
                        <div id="chartColumn" style="width:100%; height:400px;"></div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-card class="box-card2">
                        <div id="chartBar" style="width:100%; height:400px;"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--&lt;!&ndash;                <div id="chartColumn" style="width:100%; height:400px;"></div>&ndash;&gt;-->
<!--            </el-col>-->
<!--&lt;!&ndash;            <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;                <div id="chartBar" style="width:100%; height:400px;"></div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--            <el-col :span="12">-->
<!--                <div id="chartLine" style="width:100%; height:400px;"></div>-->
<!--            </el-col>-->
<!--            <el-col :span="12">-->
<!--                <div id="chartPie" style="width:100%; height:400px;"></div>-->
<!--            </el-col>-->
<!--            <el-col :span="24">-->
<!--                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>-->
<!--            </el-col>-->
<!--        </el-row>-->
    </section>
</template>

<script>
    // import echarts from 'echarts'
    // import * as echarts from 'echarts';
    // 按需引入
    import * as echarts from 'echarts';
    import { getCharts } from '../../api/api'

    export default {
        data() {
            return {
                jobNum: 0,
                eduNum: 0,
                subjects: '',
                jobMajor: '',
                eduMajor: '',
                chartColumn: null,
                chartBar: null,
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    title: {
                        text: '升学就业情况',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        top: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            // dataView: {show: true, readOnly: false},
                            // restore: {show: true},
                            // saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '升学就业情况',
                            type: 'pie',
                            radius: [40, 150],
                            center: ['45%', '45%'],
                            // roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
                            },
                            data: [
                                {value: this.jobNum, name: '就业'},
                                {value: this.eduNum, name: '升学'},
                            ]
                        }
                    ]
                });
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption({
                    title: {
                        text: '各专业统计',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['就业', '升学']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        // 专业名
                        // data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                        data: this.subjects,
                    },
                    series: [
                        {
                            name: '就业',
                            type: 'bar',
                            // data: [18203, 23489, 29034, 104970, 131744, 630230]
                            data: this.jobMajor
                        },
                        {
                            name: '升学',
                            type: 'bar',
                            // data: [19325, 23438, 31000, 121594, 134141, 681807]
                            data: this.eduMajor
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawBarChart()
            },
            initNum() {
                var user = sessionStorage.getItem('user')
                var u = JSON.parse(user)

                let para = {
                    id: u.fkno
                }

                getCharts(para).then(res=> {
                    console.log(res)
                    this.jobNum = res.data.jobNum
                    this.eduNum = res.data.eduNum
                    this.subjects = res.data.subjects
                    this.eduMajor = res.data.eduMajor
                    this.jobMajor = res.data.jobMajor
                })
            }
        },

        mounted: function () {
            this.initNum()
            this.drawCharts()
        },
        updated: function () {
            this.initNum()
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/
    .content{
        /*margin: auto;*/
        /*text-align: center;*/
        /*float: left;*/
        /*position: absolute;*/
        /*right: 0px;*/
        font-size: 18px;
    }

    .el-col {
        padding: 30px 20px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        line-height: 40px;
        height: 80px;
        width: 300px;
    }
</style>
