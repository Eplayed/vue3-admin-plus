<template>
  <!-- 系统参数  -->
  <div class="system-parameter">
    <el-form ref="searchForm" :model="searchForm">
      <el-row :gutter="20" type="flex" class="wan-row-justify-box">
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <el-form-item label="编码" prop="code">
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
    <!-- <img v-if="tableData.length < 1" style="margin-left: 35%" width="321" src="@/assets/images/空状态@2x.png" alt=""> -->
    <el-table ref="tableData" style="margin-top: 24px" :data="tableData" :max-height="tableHeight">
      <!-- 多选 -->
      <el-table-column label="序号" prop="serialNumber" min-width="60" align="left">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="编码" prop="code" align="center" />
      <el-table-column min-width="120" label="控值" prop="value" align="center" />
      <el-table-column min-width="150" label="描述" prop="description" align="center" />
      <el-table-column min-width="150" label="创建时间" prop="createTime" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | formTime }}
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="创建人" prop="createUser" align="center" />
      <el-table-column min-width="150" label="修改时间" prop="modifyTime" align="center">
        <template slot-scope="scope">
          {{ scope.row.modifyTime | formTime }}
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="修改人" prop="modifyUser" align="center" />
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
      <el-dialog :title="title" :visible.sync="dialogDialog" :close-on-click-modal="false" @close="closeDialog">
        <div class="dialogScroll">
          <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="150px" label-position="top">
            <el-row :gutter="32">
              <el-col :span="12">
                <el-form-item label="编码" prop="code" style="width=100%">
                  <el-input v-model.trim="dialogForm.code" placeholder="请输入" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配置值" prop="value">
                  <el-input v-model.trim="dialogForm.value" placeholder="请输入" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="描述" prop="description">
                  <el-input v-model.trim="dialogForm.description" placeholder="请输入" clearable />
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
import { getTemplateData, editTemplateData, getNewTemplateData, deleTemplateData } from '@/api/system-parameter'
import { formatDateTime } from '../../utils/index'
// import { getToken } from '@/utils/auth'
// import Cookies from 'js-cookie'
export default {
  name: 'SystemParameter',
  filters: {
    formTime: function(val) {
      if (!val) return ''
      console.log(val * 1)
      return formatDateTime(val)
    },
  },
  data() {
    return {
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
        value: '',
        description: '',
      },
      dialogDialog: false,
      dialogRules: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
        value: [{ required: true, message: '配置值不能为空', trigger: 'blur' }],
        // path: [{ required: true, message: '模板地址不能为空', trigger: 'blur' }],
      },
      title: '',
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
          //   console.log(this.data.list)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    // 新增
    handleAddClick() {
      this.title = '新增系统配置'
      this.dialogDialog = true
      this.isDisable = false
    },

    // 修改
    addOrEditDic(row) {
      this.dialogDialog = true
      this.title = '编辑系统配置'
      this.$nextTick(() => {
        this.dialogForm = JSON.parse(JSON.stringify(row))
        if (!this.dialogForm.isValid) {
          this.$set(this.dialogForm, 'isValid', '')
        }
      })
      this.pkId = row.pkId
    },
    // 确定
    dialogConfirm() {
      this.$refs.dialogForm.validate(async(valid) => {
        if (valid) {
          if (this.title === '新增系统配置') {
            const { resultCode } = await getNewTemplateData(this.dialogForm)
            if (resultCode != 'success') return
            this.closeDialog()
            this.getData()
          } else if (this.title === '编辑系统配置') {
            const { resultCode } = await editTemplateData(this.pkId, this.dialogForm)
            if (resultCode != 'success') return
            this.closeDialog()
            this.getData()
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
.system-parameter {
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
    // margin-top: 70px;
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
