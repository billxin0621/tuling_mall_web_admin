<template> 
    <div class="app-container">
        <!-- 搜索区 -->
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchBrandList()" type="primary" size="small">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="部门名称：">
                        <el-input style="width: 203px" v-model="listQuery.branchName" placeholder="部门名称/模糊查询">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="数据类型：">
                        <el-input style="width: 203px" v-model="listQuery.dataType" placeholder="数据类型/模糊查询">
                        </el-input>
                    </el-form-item>
                    <!--<el-form-item label="模糊查询：">
                        <el-input style="width: 203px" v-model="listQuery.anyMatch" placeholder="日期/部门名称/数据类型">
                        </el-input>
                    </el-form-item>-->
                    <el-form-item label="日期：">
                        <el-date-picker v-model="dateRange" type="datetimerange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"
                            value-format="yyyy-MM-dd" @change="dateChange">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 表格上方功能按钮区 -->
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <!--导出excel表格按钮-->
            <download-excel class="btn-add" :data="excel_data" :fields="excel_fields" :name="excel_name">
                <el-button size="mini">导出EXCEL</el-button>
            </download-excel>
        </el-card>
        <!-- 表格数据展示 -->
        <div class="table-container">
            <el-table ref="brandTable" :data="tableDataList" style="width: 100%"
                @selection-change="handleSelectionChange" v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="100" v-if="false" align="center">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="日期" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column :label="tablename" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.branchName }}</template>
                </el-table-column>
                <el-table-column label="数据类型" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.dataType }}</template>
                </el-table-column>
                <el-table-column label="用户" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.user }}</template>
                </el-table-column>
                <el-table-column label="用户同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.userTongbi < '0' ? 'color-danger' : ''">
                            <!--自定义颜色，颜色维护在src\styles\index.scss-->
                            {{ scope.row.userTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="母婴大盘用户数" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.dapan < '0' ? 'color-danger' : ''">
                            {{ scope.row.dapan }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="部门用户占比母婴大盘" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.branchDapanZhanbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.branchDapanZhanbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="成交金额" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.chengjiaojine < '0' ? 'color-danger' : ''">
                            {{ scope.row.chengjiaojine }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="成交金额同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.chengjiaojineTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.chengjiaojineTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="销量" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.xiaoliang < '0' ? 'color-danger' : ''">
                            {{ scope.row.xiaoliang }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订单" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.dingdan < '0' ? 'color-danger' : ''">
                            {{ scope.row.dingdan }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="ARPU" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.arpu < '0' ? 'color-danger' : ''">
                            {{ scope.row.arpu }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="ARPU同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.arpuTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.arpuTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="客单价" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.kedanjia < '0' ? 'color-danger' : ''">
                            {{ scope.row.kedanjia }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="客单价同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.kedanjiaTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.kedanjiaTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="购买频次" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.goumaipinci < '0' ? 'color-danger' : ''">
                            {{ scope.row.goumaipinci }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="购买频次同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.goumaipinciTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.goumaipinciTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="件单价" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.jiandanjia < '0' ? 'color-danger' : ''">
                            {{ scope.row.jiandanjia }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="件单价同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.jiandanjiaTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.jiandanjiaTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="人均销量" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.renjunxiaoliang < '0' ? 'color-danger' : ''">
                            {{ scope.row.renjunxiaoliang }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="人均销量同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.renjunxiaoliangTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.renjunxiaoliangTongbi }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="人均件数" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.renjunjianshu < '0' ? 'color-danger' : ''">
                            {{ scope.row.renjunjianshu }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="人均件数同比" width="100" align="center">
                    <template slot-scope="scope">
                        <div :class="scope.row.renjunjianshuTongbi < '0' ? 'color-danger' : ''">
                            {{ scope.row.renjunjianshuTongbi }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 表格当前页及每页大小调整 -->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15]"
                :current-page.sync="listQuery.pageNum" :total="total">
            </el-pagination>
        </div>
        <!-- 表格当前页及每页大小调整 -->
        <div class="pagination-container">
            <echartsListVue :xAxisData="xAxisDataToSub" :yAxisData1="yAxisDataToSub1" 
             :yAxisData2="yAxisDataToSub2" :yAxisData3="yAxisDataToSub3" :yAxisData4="yAxisDataToSub4"></echartsListVue>
        </div>
        
    </div>
</template>
<script>
import Vue from "vue";
import { fetchList } from '@/api/excel'
import echartsListVue from "./echartsList";//引入vue文件

Vue.component('echartsListVue', echartsListVue)//vue文件注册为组件

export default {
    // name: 'brandList',
    data() {
        return {
            //表格数据查询条件
            listQuery: {
                branchName: null,
                dataType: null,
                anyMatch: null,
                dateStart:null,
                dateEnd:null,
                pageNum: 1,
                pageSize: 10
            },
            //导出excel条件
            listQueryExcel: {
                branchName: null,
                dataType: null,
                anyMatch: null,
                dateStart:null,
                dateEnd:null
            },
            //表格展示数据
            tableDataList: null,
            total: null,
            //图表横坐标
            xAxisDataToSub:[],
            //图表纵坐标
            yAxisDataToSub1:[],
            yAxisDataToSub2:[],
            yAxisDataToSub3:[],
            yAxisDataToSub4:[],
            //数据加载显示loadling
            listLoading: true,
            multipleSelection: [],
            //导出excel
            excel_name: "数据.xls",
            excel_fields: {},
            excel_data: [],
            tablename: "部门",//表头测试动态赋值
            // 日期框
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dateRange:[]
        }
    },
    created() {
        this.getList();
    },
    methods: {
        dateChange(){
            if(this.dateRange.length == 2){
                this.listQuery.dateStart = this.dateRange[0];
                this.listQuery.dateEnd = this.dateRange[1];
            }
        },
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.tableDataList = response.data.list;
                this.total = response.data.total;
                this.totalPage = response.data.totalPage;
                this.pageSize = response.data.pageSize;

                //图表数据赋值
                let tempX = [];
                let tempY1 = [];
                let tempY2 = [];
                let tempY3 = [];
                let tempY4 = [];
                for(var i = 0; i < response.data.list.length; i++){
                    // console.log(response.data.list[i].date);
                    tempX[i] = response.data.list[i].date;
                    tempY1[i] = response.data.list[i].user;
                    tempY2[i] = response.data.list[i].dingdan;
                    tempY3[i] = response.data.list[i].user;
                    tempY4[i] = response.data.list[i].dingdan;
                    // console.log(this.xAxisDataToSub[i]);
                }
                this.xAxisDataToSub = tempX;
                this.yAxisDataToSub1 = tempY1;
                this.yAxisDataToSub2 = tempY2;
                this.yAxisDataToSub3 = tempY3;
                this.yAxisDataToSub4 = tempY4;
            });
            // 用于查询当前页面查询条件（去掉分页）的数据，并存储到导出excel的数据中
            this.listQueryExcel.branchName = this.listQuery.branchName;
            this.listQueryExcel.dataType = this.listQuery.dataType;
            this.listQueryExcel.anyMatch = this.listQuery.anyMatch;
            this.listQueryExcel.dateStart = this.listQuery.dateStart;
            this.listQueryExcel.dateEnd = this.listQuery.dateEnd;
            fetchList(this.listQueryExcel).then(response => {
                this.excel_fields = {
                    "日期": "date", "部门": "branchName", "数据类型": "dataType", "用户": "user", "用户同比": "userTongbi",
                    "母婴大盘用户数": "dapan", "部门用户占比母婴大盘": "branchDapanZhanbi",
                    "成交金额": "chengjiaojine", "成交金额同比": "chengjiaojineTongbi",
                    "销量": "xiaoliang", "订单": "dingdan", "ARPU": "arpu", "ARPU同比": "arpuTongbi",
                    "客单价": "kedanjia", "客单价同比": "kedanjiaTongbi", "购买频次": "goumaipinci",
                    "购买频次同比": "goumaipinciTongbi", "件单价": "jiandanjia",
                    "件单价同比": "jiandanjiaTongbi", "人均销量": "renjunxiaoliang",
                    "人均销量同比": "renjunxiaoliangTongbi", "人均件数": "renjunjianshu",
                    "人均件数同比": "renjunjianshuTongbi"
                };
                this.excel_data = response.data.list;
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleUpdate(index, row) {
            this.$router.push({ path: '/pms/updateBrand', query: { id: row.id } })
        },
        handleDelete(index, row) {
            this.$confirm('是否要删除该品牌', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteBrand(row.id).then(response => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
            });
        },
        getProductList(index, row) {
            console.log(index, row);
        },
        getProductCommentList(index, row) {
            console.log(index, row);
        },
        handleFactoryStatusChange(index, row) {
            var data = new URLSearchParams();
            data.append("ids", row.id);
            data.append("factoryStatus", row.factoryStatus);
            updateFactoryStatus(data).then(response => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            }).catch(error => {
                if (row.factoryStatus === 0) {
                    row.factoryStatus = 1;
                } else {
                    row.factoryStatus = 0;
                }
            });
        },
        handleShowStatusChange(index, row) {
            let data = new URLSearchParams();
            ;
            data.append("ids", row.id);
            data.append("showStatus", row.showStatus);
            updateShowStatus(data).then(response => {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            }).catch(error => {
                if (row.showStatus === 0) {
                    row.showStatus = 1;
                } else {
                    row.showStatus = 0;
                }
            });
        },
        // 表格当前页及每页大小调用方法
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getList();
        },
        searchBrandList() {
            this.listQuery.pageNum = 1;
            this.getList();
        },
        handleBatchOperate() {
            console.log(this.multipleSelection);
            if (this.multipleSelection < 1) {
                this.$message({
                    message: '请选择一条记录',
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            let showStatus = 0;
            if (this.operateType === 'showBrand') {
                showStatus = 1;
            } else if (this.operateType === 'hideBrand') {
                showStatus = 0;
            } else {
                this.$message({
                    message: '请选择批量操作类型',
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            let ids = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                ids.push(this.multipleSelection[i].id);
            }
            let data = new URLSearchParams();
            data.append("ids", ids);
            data.append("showStatus", showStatus);
            updateShowStatus(data).then(response => {
                this.getList();
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            });
        },
        addBrand() {
            this.$router.push({ path: '/pms/addBrand' })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


