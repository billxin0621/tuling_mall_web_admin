<template> 
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button style="float: right" @click="searchBrandList(0)" type="primary" size="small">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="名称：">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="总用户：">
                        <el-input style="width: 203px" v-model="listQuery.dealPinTotal" placeholder="总用户/关键字">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <!--导出excel表格-->
            <download-excel class="btn-add" :data="excel_data" :fields="excel_fields" :name="excel_name">
                <el-button size="mini" @click="searchBrandList(1)">导出EXCEL</el-button>
            </download-excel>
        </el-card>
        <div class="table-container">
            <el-table ref="brandTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="100" v-if="false" align="center">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="日期"  width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column label="部门" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.branchName }}</template>
                </el-table-column>
                <el-table-column label="数据类型" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.dataType }}</template>
                </el-table-column>
                <el-table-column label="用户" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.user }}</template>
                </el-table-column>
                <el-table-column label="用户同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.userTongbi }}</template>
                </el-table-column>
                <el-table-column label="母婴大盘用户数" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.dapan }}</template>
                </el-table-column>
                <el-table-column label="部门用户占比母婴大盘" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.branchDapanZhanbi }}</template>
                </el-table-column>
                <el-table-column label="成交金额" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.chengjiaojine }}</template>
                </el-table-column>
                <el-table-column label="成交金额同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.chengjiaojineTongbi }}</template>
                </el-table-column>
                <el-table-column label="销量" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.xiaoliang }}</template>
                </el-table-column>
                <el-table-column label="订单" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.dingdan }}</template>
                </el-table-column>
                <el-table-column label="ARPU" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.arpu }}</template>
                </el-table-column>
                <el-table-column label="ARPU同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.arpuTongbi }}</template>
                </el-table-column>
                <el-table-column label="客单价" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.kedanjia }}</template>
                </el-table-column>
                <el-table-column label="客单价同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.kedanjiaTongbi }}</template>
                </el-table-column>
                <el-table-column label="购买频次" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.goumaipinci }}</template>
                </el-table-column>
                <el-table-column label="购买频次同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.goumaipinciTongbi }}</template>
                </el-table-column>
                <el-table-column label="件单价" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.jiandanjia }}</template>
                </el-table-column>
                <el-table-column label="件单价同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.jiandanjiaTongbi }}</template>
                </el-table-column>
                <el-table-column label="人均销量" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.renjunxiaoliang }}</template>
                </el-table-column>
                <el-table-column label="人均销量同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.renjunxiaoliangTongbi }}</template>
                </el-table-column>
                <el-table-column label="人均件数" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.renjunjianshu }}</template>
                </el-table-column>
                <el-table-column label="人均件数同比" width="100" align="center">
                    <template slot-scope="scope">{{ scope.row.renjunjianshuTongbi }}</template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5, 10, 15]"
                :current-page.sync="listQuery.pageNum" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { fetchList } from '@/api/excel'

export default {
    name: 'brandList',
    data() {
        return {
            operates: [
                {
                    label: "显示品牌",
                    value: "showBrand"
                },
                {
                    label: "隐藏品牌",
                    value: "hideBrand"
                }
            ],
            operateType: null,
            listQuery: {//查询条件
                name: null,
                dealPinTotal: null,
                pageNum: 1,
                pageSize: 10
            },
            listQueryExcel: {//导出excel条件
                name: null,
                dealPinTotal: null
            },
            list: null,
            total: null,
            listLoading: true,
            multipleSelection: [],
            //导出excel
            excel_name: "数据.xls",
            excel_fields: {
                "姓名": "name",    //常规字段
                "用户名": "username",
                "所属组织": "organization",
                "权限": "auth",
            },
            excel_data: [{
                name: '杰米',
                username: 'admin2',
                organization: '地球村',
                auth: '超级管理员'
            }]
        }
    },
    created() {
        this.getList(0);
    },
    methods: {
        getList(isExcel) {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
                this.totalPage = response.data.totalPage;
                this.pageSize = response.data.pageSize;
            });
            // 用于查询当前页面查询条件（去掉分页）的数据，并存储到导出excel的数据中
            this.listQueryExcel.name = this.listQuery.name;
            this.listQueryExcel.dealPinTotal = this.listQuery.dealPinTotal;
            fetchList(this.listQueryExcel).then(response => {
                this.excel_fields = {"日期": "date","部门": "branchName","数据类型": "dataType","用户": "user","用户同比": "userTongbi",
                                     "母婴大盘用户数": "dapan","部门用户占比母婴大盘": "branchDapanZhanbi",
                                     "成交金额": "chengjiaojine","成交金额同比": "chengjiaojineTongbi",
                                     "销量": "xiaoliang","订单": "dingdan","ARPU": "arpu","ARPU同比": "arpuTongbi",
                                     "客单价": "kedanjia","客单价同比": "kedanjiaTongbi","购买频次": "goumaipinci",
                                     "购买频次同比": "goumaipinciTongbi","件单价": "jiandanjia",
                                     "件单价同比": "jiandanjiaTongbi","人均销量": "renjunxiaoliang",
                                     "人均销量同比": "renjunxiaoliangTongbi","人均件数": "renjunjianshu",
                                     "人均件数同比": "renjunjianshuTongbi"};
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
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getList();
        },
        searchBrandList(isExcel) {
            this.listQuery.pageNum = 1;
            this.getList(isExcel);
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


