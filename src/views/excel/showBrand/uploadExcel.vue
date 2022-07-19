<template>
  <div class="app-container">
    <el-form>
      <el-form-item>
        <el-upload class="upload-demo" ref="upload" action="#" :http-request="importFile"
          :before-upload="beforeAvatarUpload" :auto-upload="false" :limit="1" accept=".xls,.xlsx,.csv"
          :on-exceed="handleExceed">
          <el-button slot="trigger" type="primary" size="small">选取文件</el-button>
          <el-button :loading="dataForms.loading" style="margin-left: 10px" type="success" @click="fileSubmit"
            size="small" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在执行..."
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传Excel文件</div> -->
          <el-button type="primary" @click="cancleUpload" size="small">取消</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import XLSX from "xlsx";
import { insertBranchData } from '@/api/excel'//调用后台的接口，封装在此
import Vue from "vue";

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  data() {
    return {
      dataForms: {
        barCode: "",
        loading: false,
      },
      fullscreenLoading: false, // 加载中
      desc: "",
      loadingText: "正在执行...",
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ],
    };
  },
  methods: {
    fileSubmit() {
      //没有选取文件弹出提醒
      if (this.$refs.upload.uploadFiles.length < 1) {
        this.$message.warning("请先选择一个文件");
      } else {
        //否则提交
        this.$refs.upload.submit();
      }
    },
    //上传文件前的钩子，file是文件
    beforeAvatarUpload(file) {
      //拿到文件大小是否小于10
      const isLt10M = file.size / 1024 / 1024 < 10;
      //不小于10提醒过大
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      } else {
        //否则加载效果出现
        this.fullscreenLoading = true;
      }
      return isLt10M;
    },
    //限制选择文件数量一个
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请先删除下方文件,重新选择`);
    },
    //取消上传请求，abord是el-Upload的自带取消上传请求的方法
    cancleUpload() {
      this.$refs.upload.abord();
    },
    //http-request:覆盖默认的上传行为
    importFile(files) {
      //loading图显示正在解析
      this.loadingText = "正在解析";
      //
      var fileReader = new FileReader();
      //加载图显示
      this.dataForms.loading = true;
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files.file);
      fileReader.onload = (ev) => {
        try {
          var data = ev.target.result,
            workbook = XLSX.read(data, {
              type: "binary",
            }) // 以二进制流方式读取得到整份excel表格对象
          var excelDataRead = {};
        } catch (e) {
          this.$message.error("文件类型不正确");
          this.dataForm.loading = false;
          this.imFile = null;
          this.$refs.upload.clearFiles();
          this.fullscreenLoading = false;
          return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = "";
        // 遍历每张表读取，先定义一个开始位置1
        var sheetIndex = 1;
        for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]["!ref"];
            //这是处理好的数据，数组形式，已转换为json格式(每一个sheet)
            let excelSheetRead = [];
            excelSheetRead = excelSheetRead.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );

            // let sheetIndex = sheetBegin % 10;// sheetBegin与10取余，目的是
            switch (sheetIndex) {// 判断此时是第几个sheet，目前只支持9个sheet
              case 1:
                excelDataRead.sheet1 = excelSheetRead;
                break;
              case 2:
                excelDataRead.sheet2 = excelSheetRead;
                break;
              case 3:
                excelDataRead.sheet3 = excelSheetRead;
                break;
              case 4:
                excelDataRead.sheet4 = excelSheetRead;
                break;
              case 5:
                excelDataRead.sheet5 = excelSheetRead;
                break;
              case 6:
                excelDataRead.sheet6 = excelSheetRead;
                break;
              case 7:
                excelDataRead.sheet7 = excelSheetRead;
                break;
              case 8:
                excelDataRead.sheet8 = excelSheetRead;
                break;
              case 9:
                excelDataRead.sheet9 = excelSheetRead;
                break;
            }
            sheetIndex = sheetIndex + 1;
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        this.loadingText = "正在上传...";
        //请求后台
        insertBranchData(excelDataRead).then(response => {
          this.$message({
            message: '提交成功',
            type: 'success',
            duration: 1000
          });
        });
        this.loadingText = "";
      }
      this.dataForms.loading = false;
      this.fullscreenLoading = false;
    }
  }
}
</script>