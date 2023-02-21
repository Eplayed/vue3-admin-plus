<template>
  <!-- 模板 -->
  <div class="template-management">
    <el-form ref="searchForm" :model="searchForm">
      <el-row :gutter="20" type="flex" class="wan-row-justify-box">
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <el-form-item label="模板编码" prop="code">
            <el-input v-model.trim="searchForm.code" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <div class="button">
            <el-button size="small" class="outlineGreenButton mainColor" plain @click="handleQueryClick">查询</el-button>
            <el-button size="small" class="outlineGreenButton" plain @click="resetForm('searchForm')">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="functionButton">
      <el-button class="buttonColor" size="small" @click="handleAddClick"><i class="iconfont icon-icon_add_s" />新增</el-button>
    </div>
    <el-table ref="tableData" style="margin-top: 24px" border :data="tableData" :max-height="tableHeight">
      <!-- 多选 -->
      <el-table-column label="序号" prop="serialNumber" min-width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="模板编码" prop="code" align="center" />
      <el-table-column min-width="120" label="模板类型" prop="typeText" align="center" />
      <el-table-column min-width="120" label="模板名称" prop="name" align="center" />
      <el-table-column min-width="120" label="模板描述" prop="descript" align="center" />
      <el-table-column min-width="120" label="模板地址" prop="path" align="center" />
      <el-table-column label="操作" fixed="right" min-width="100" align="left">
        <template slot-scope="scope">
          <el-button type="text" class="openColor" @click="addOrEditDic(scope.row)">编辑</el-button>
          <el-button type="text" class="closeColor" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <div slot="empty" style="text-align: center">
        <img width="321" src="@/assets/images/空状态@2x.png" alt="">
      </div>
      <!-- <el-table-column min-width="120" label="创建用户" prop="createUser" /> -->
    </el-table>
    <div class="pagination">
      <el-pagination v-show="total > 0" background style="float: right" :current-page="searchForm.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="searchForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogDialog" :close-on-click-modal="false" width="321" @close="closeDialog">
        <div class="dialogScroll">
          <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="150px" label-position="top">
            <el-row :gutter="32">
              <el-col :span="12">
                <el-form-item label="模板编码" prop="code" style="width=100%">
                  <el-input v-model.trim="dialogForm.code" placeholder="请输入" clearable :disabled="isDisable" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="模板类型" prop="type">
                  <anji-select v-model="dialogForm.type" params-name="data" url="/api/sys/v1/dict/type/template_type" label="bizText" option="bizCode" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="模板名称" prop="name">
                  <el-input v-model.trim="dialogForm.name" placeholder="请输入" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="模板描述" prop="descript">
                  <el-input v-model.trim="dialogForm.descript" placeholder="请输入" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="模板地址" prop="path">
                  <el-upload
                    ref="upload"
                    class="upload-infoSubmit"
                    :action="baseUrl + '/api/sys/v1/file/template'"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="success"
                    :on-exceed="handleExceed"
                    :on-error="error"
                    :headers="authHeader"
                    :before-remove="beforeRemove"
                    :on-change="change"
                    :show-file-list="true"
                    :limit="1"
                    enctype="multipart/form-data"
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    name="file"
                    :auto-upload="false"
                  >
                    <!-- <el-input v-model.trim="dialogForm.path" placeholder="请输入" clearable /> -->
                    <el-button type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancelColor" plain @click="closeDialog">取 消</el-button>
          <el-button class="buttonColor" @click="dialogConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getTemplateData, editTemplateData, getNewTemplateData, deleTemplateData } from '@/api/template-management'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
export default {
  name: 'TemplateManagement',
  data() {
    return {
      authHeader: {
        Authorization: `Bearer ` + getToken(),
        'current-whse-id': Cookies.get('current-whse-id'),
      },
      isDisable: false,
      searchForm: {
        code: '',
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      tableHeight: document.documentElement.clientHeight - 302 - 62,
      tableData: [],
      dialogForm: {
        code: '',
        name: '',
        path: '',
        type: '',
        descript: '',
      },
      dialogDialog: false,
      dialogRules: {
        code: [{ required: true, message: '模板编码不能为空', trigger: 'blur' }],
        // path: [{ required: true, message: '模板地址不能为空', trigger: 'blur' }],
      },
      title: '',
      baseUrl: process.env.VUE_APP_BASE_API,
      Loading: false,
    }
  },
  created() {
    // this.getData()
  },
  mounted() {
    var that = this
    window.onresize = () => {
      return (() => {
        window.tableHeight = document.documentElement.clientHeight
        that.tableHeight = window.tableHeight - 302 - 45
      })()
    }
  },
  methods: {
    getData() {
      getTemplateData(this.searchForm)
        .then((res) => {
          this.tableData = res.data.list
          this.total = res.data.total
          console.log(this.data.list)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    // 新增
    handleAddClick() {
      this.title = '新增模板'
      this.dialogDialog = true
      this.isDisable = false
    },

    // 修改
    addOrEditDic(row) {
      this.dialogDialog = true
      this.title = '编辑模板'
      this.isDisable = true
      this.$nextTick(() => {
        this.dialogForm = JSON.parse(JSON.stringify(row))
      })

      console.log(row)
      this.pkId = row.pkId
    },
    // 确定
    dialogConfirm() {
      this.$refs.dialogForm.validate(async(valid) => {
        if (valid) {
          if (this.title === '新增模板') {
            // console.log('33')
            if (this.dialogForm.path == '' || this.dialogForm.path == null) {
              this.$message.error('模板地址不能为空')
            } else {
              const { resultCode } = await getNewTemplateData(this.dialogForm)
              if (resultCode != 'success') return
              this.closeDialog()
              this.getData()
            }
          } else if (this.title === '编辑模板') {
            if (this.dialogForm.path == '' || this.dialogForm.path == null) {
              this.$message.error('模板地址不能为空')
            } else {
              const { resultCode } = await editTemplateData(this.pkId, this.dialogForm)
              if (resultCode != 'success') return
              this.closeDialog()
              this.getData()
            }
          }
        }
      })
    },
    async handleDel(row) {
      this.$confirm('是否删除此条数据?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'deleteCancelBtn',
        type: 'warning',
      })
        .then(async() => {
          const res = await deleTemplateData(row.pkId)
          if (res.resultCode != 'success') return
          this.getData()
        })
        .catch((err) => {
          if (err != 'cancel') return
          this.$message.info('取消操作!')
        })
    },
    // 重置
    resetForm(formName) {
      this.tableData = []
      this.total = 0
      this.$refs[formName].resetFields()
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs['dialogForm'].resetFields()
      this.title = ''
      this.dialogDialog = false
    },
    // 分页功能
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.searchForm.pageNum = 1
      this.searchForm.pageSize = val
      this.getData()
    },
    handleCurrentChange(pageNum) {
      this.searchForm.pageNum = pageNum
      this.getData()
    },
    // 查询
    handleQueryClick() {
      this.searchForm.pageNum = 1
      this.getData()
    },
    // 导入
    handlePreview(file, fileList) {
      // console.log(file, fileList)
    },
    handleRemove(files, fileList) {
      // console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.error(`当前限制选择 1 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    change(file, fileList) {
      // console.log(fileList)
      this.fileList = fileList
      this.$refs.upload.submit() // 提交按钮

      console.log(this.fileList, 'this.fileList')
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    },
    async submitUpload() {
      // console.log(this.fileList)
      if (this.fileList == '') {
        this.Loading = false
      } else {
        this.Loading = true
      }

      //   this.$refs.dialogForm.validate(async(valid) => {
      //     if (valid) {
      //       if (this.title === '新增模板') {
      //         const { resultCode } = await getNewTemplateData(this.dialogForm)
      //         if (resultCode != 'success') return
      //         this.closeDialog()
      //         this.getData()
      //       } else if (this.title === '编辑模板') {
      //         const { resultCode } = await editTemplateData(this.pkId, this.dialogForm)
      //         if (resultCode != 'success') return
      //         this.closeDialog()
      //         this.getData()
      //       }
      //       this.$refs.upload.submit() // 提交按钮
      //     }
      //   })
    },
    handleClose() {
      this.$refs.upload.clearFiles() // 重置按钮
      this.dialogImprotVisible = false
      return
    },
    success(response) {
      console.log(response.data, '分隔符')
      if (response.resultCode != 'success') {
        this.$message({
          showClose: true,
          message: response.displayMsg,
          type: 'error',
          center: true,
        })
      } else {
        this.$message({
          showClose: true,
          message: response.displayMsg,
          type: 'success',
          center: true,
        })
        this.handleClose()
      }
      this.dialogForm.path = response.data
      console.log(this.dialogForm.path, 'asdffgggg')
      console.log(this.tableData)
      this.$refs.upload.clearFiles()
      this.Loading = false
    },
    error(err) {
      this.$message.error('提交失败')
      this.Loading = false
    },
  },
}
</script>
<style lang="scss" scope>
.dialogScroll {
  margin-right: 0px !important;
}
::v-deep .el-input.is-disabled .el-input__inner {
  cursor: default !important;
}
.template-management {
  /deep/ .el-dialog__header {
    text-align: left;
  }
  /deep/ .el-form-item__label {
    text-align: left;
  }
  font-size: 14px;
  font-family: BlueSkyNoto-Regular, BlueSkyNoto;
  color: #242629;
  line-height: 22px;
  padding: 24px;
  .button {
    margin-top: 28px;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
  .buttonColor {
    color: #ffffff;
    background-image: linear-gradient(#00bebe, #00b3be);
  }
  .reset {
    color: #00bebe;
    border: 1px solid #00bebe;
  }

  .functionButton {
    display: flex;
    justify-content: flex-end;
    margin-top: 46px;
  }
  .wan-row-justify-box {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media screen and (min-width: 1200px) {
    .el-col-md-6 {
      width: 20%;
    }
  }
}
</style>
