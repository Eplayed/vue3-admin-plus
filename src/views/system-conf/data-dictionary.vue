<template>
  <div class="app-container">
    <el-form ref="formSearch" :model="searchData" :rules="searchRules">
      <ExtensibleRow :row="'1'" :form="searchData" :is-first-row="true">
        <template #searchQuery>
          <el-row :gutter="20" type="flex" class="wan-row-justify-box">
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('systemConf.bizType')" prop="bizType">
                <el-select v-model="searchData.bizType" filterable :placeholder="$t('placeholder.select')" clearable style="width: 100%">
                  <el-option v-for="item in dictionaryTypeList" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <div style="margin-top: 28px">
                <el-button class="mainColor" plain size="small" @click="queryData('formSearch')">{{ $t('btn.query') }}</el-button>
                <el-button class="outlineGreenButton" plain size="small" @click="resetForm('formSearch')">{{ $t('btn.reset') }}</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
      </ExtensibleRow>
    </el-form>
    <!-- <el-form ref="formSearch" :model="searchData" class="formStyle" label-width="110px" :rules="searchRules">
      <el-row>
        <el-col :span="19">
          <el-row class="form-table">
            <el-col :span="10">
              <el-form-item :label="$t('systemConf.bizType')" prop="bizType">
                <el-select v-model="searchData.bizType" filterable :placeholder="$t('placeholder.select')" clearable style="width: 100%;">
                  <el-option v-for="item in dictionaryTypeList" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="queryData('formSearch')">{{ $t('btn.query') }}</el-button>
          <el-button type="danger" @click="resetForm('formSearch')">{{ $t('btn.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form> -->
    <div class="btnRow">
      <!-- <el-button size="small" class="outlineGreenButton" plain :disabled="selectedList.length != 1" @click="addOrEditDic('edit', selectedList[0])"><i class="iconfont icon-Vector" />{{ $t('btn.edit') }}</el-button> -->
      <!-- <el-button size="small" plain class="outlineGreenButton" :disabled="selectedList.length != 1" @click="handleDel(selectedList[0])"><i class="iconfont icon-icon_delete_s" />{{ $t('btn.delete') }}</el-button> -->
      <el-button size="small" :disabled="!searchData.bizType" class="mainColor" @click="addOrEditDic('add', null)"><i class="iconfont icon-icon_add_s" />{{ $t('btn.add') }}</el-button>
    </div>
    <!-- <img v-if="tableData.length < 1" style="margin-left: 35%" width="350" src="@/assets/images/空状态@2x.png" alt=""> -->
    <el-table :data="tableData" style="margin-top: 24px" :max-height="tableHeight" border @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="40" center />
      <el-table-column prop="bizType" :label="$t('systemConf.bizType')" align="center" />
      <el-table-column prop="bizCode" :label="$t('systemConf.bizCode')" align="center" />
      <el-table-column prop="bizText" :label="$t('systemConf.bizText')" align="center" />
      <el-table-column prop="description" :label="$t('systemConf.description')" align="center" />
      <el-table-column prop="seq" :label="$t('systemConf.seq')" align="center" />
      <el-table-column label="操作" fixed="right" min-width="100" align="left">
        <template slot-scope="scope">
          <el-button type="text" class="openColor" @click="addOrEditDic('edit', scope.row)">编辑</el-button>
          <el-button type="text" class="closeColor" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <div slot="empty" style="text-align: center">
        <img width="321" src="@/assets/images/空状态@2x.png" alt="">
      </div>
    </el-table>
    <!-- 新增和编辑的弹窗 -->
    <el-dialog :title="$t(`btn.${minDialogTitle}`)" :visible.sync="minDialogVisible" width="321" :close-on-click-modal="false" @close="miniClose">
      <el-form ref="dictionaryRules" :model="addEditData" :rules="dictionaryRules" label-width="150px">
        <el-row>
          <el-col :lg="24" :xl="24" :md="24">
            <el-form-item v-if="minDialogTitle === 'view'" :label="$t('systemConf.bizType')" prop="bizType">
              <el-select v-model="addEditData.bizType" filterable clearable style="width: 100%">
                <el-option v-for="item in dictionaryTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item v-else :label="$t('systemConf.bizType')">
              <el-input v-model="addEditData.bizType" disabled type="text" />
            </el-form-item>
            <el-form-item :label="$t('systemConf.bizCode')" prop="bizCode">
              <el-input v-model="addEditData.bizCode" type="text" />
            </el-form-item>
            <el-form-item :label="$t('systemConf.bizText')" prop="bizText">
              <el-input v-model="addEditData.bizText" type="text" />
            </el-form-item>
            <el-form-item :label="$t('systemConf.description')" prop="description">
              <el-input v-model="addEditData.description" type="text" />
            </el-form-item>
            <el-form-item :label="$t('systemConf.seq')" prop="seq">
              <el-input v-model="addEditData.seq" type="text" @change.native="changeValue" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button class="cancelColor" plain @click="minDialogVisible = false">{{ $t('btn.cancel') }}</el-button>
        <el-button class="mainColor" @click="submitForm('dictionaryRules')">{{ $t('btn.confirm') }}</el-button>
      </template>
    </el-dialog>
    <el-dialog :title="$t('promptMessage.deleteTipTitle')" :visible.sync="firstDialogVisible" width="30%">
      <span>{{ $t('systemConf.strongHints') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancelColor" @click="firstDialogVisible = false">{{ $t('btn.cancel') }}</el-button>
        <el-button class="mainColor" @click="handleClose()">{{ $t('btn.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dictionaryType, dictionaryCodesQuery, dictionaryDelete, dictionaryEdit, dictionaryAdd } from '@/api/system-conf'
export default {
  name: 'DataDictionary',
  data() {
    return {
      // 查询参数
      searchData: {
        bizType: '',
      },
      dictionaryTypeList: [],
      searchRules: {
        bizType: [{ required: true, message: this.$t('placeholder.select'), trigger: 'change' }],
      },
      // 表格数据
      tableData: [],
      selectedList: [],
      // 新增编辑弹框
      minDialogVisible: false,
      firstDialogVisible: false,
      // 弹窗的标题
      minDialogTitle: 'view',
      isRemove: true,
      tableHeight: document.documentElement.clientHeight - 302 - 45,
      // 车场新建数据规则
      dictionaryRules: {
        bizCode: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        bizText: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        bizType: [{ required: true, message: this.$t('placeholder.input'), trigger: 'change' }],
        // description: [{ required: true, message: '请输入字典描述', trigger: 'blur' }]
      },
      // 新增和编辑的数据
      addEditData: {
        bizCode: '',
        bizText: '',
        bizType: '',
        description: '',
        seq: null,
      },
      deleteId: '',
    }
  },
  created() {
    this.getDictType()
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
    async getDictType() {
      // 获取字典类型
      const { resultCode, data } = await dictionaryType()
      if (resultCode != 'success') return
      this.dictionaryTypeList = data
    },
    // 查询过程 提交表单加验证
    queryData(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const { resultCode, data } = await dictionaryCodesQuery(this.searchData)
          if (resultCode != 'success') return
          this.tableData = data
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.tableData = []
      this.$refs[formName].resetFields()
    },
    // 新增或编辑数据字典
    addOrEditDic(title, data) {
      console.log(title, 'title')
      switch (title) {
        case 'edit':
          // statements_1
          this.addEditData = JSON.parse(JSON.stringify(data))
          break
        default:
          // statements_def
          break
      }
      if (title == 'add') {
        this.addEditData.bizType = this.searchData.bizType
      }
      this.minDialogTitle = title
      this.minDialogVisible = true
    },
    // 删除
    handleDel(current) {
      this.firstDialogVisible = true
      this.deleteId = current.pkId
      this.isRemove = true
    },
    handleClose() {
      this.firstDialogVisible = false
      this.$confirm(`${this.$t('promptMessage.handleTip')}`, {
        dangerouslyUseHTMLString: true,

        type: 'warning',
      })
        .then(async(_) => {
          // 此处判断是删除操作还是编辑操作
          if (this.isRemove) {
            const { resultCode } = await dictionaryDelete(this.deleteId)
            if (resultCode != 'success') return
            this.queryData('formSearch')
          } else {
            if (this.minDialogTitle == 'add') {
              const { resultCode } = await dictionaryAdd(this.addEditData)
              if (resultCode != 'success') return
              this.queryData('formSearch')
              this.minDialogVisible = false
            } else if (this.minDialogTitle == 'edit') {
              const { resultCode } = await dictionaryEdit(this.addEditData)
              if (resultCode != 'success') return
              this.queryData('formSearch')
              this.minDialogVisible = false
            }
          }
        })
        .catch((_) => {})
    },
    // 提交表单加验证
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.minDialogTitle === 'view') {
            // 新建提交操作
            const { resultCode } = await dictionaryAdd(this.addEditData)
            if (resultCode != 'success') return
            if (this.addEditData.bizType === this.searchData.bizType) {
              this.queryData('formSearch')
            }
            this.minDialogVisible = false
          } else {
            this.isRemove = false // 标识删除操作
            this.firstDialogVisible = true
          }
        } else {
          return false
        }
      })
    },
    miniClose() {
      this.addEditData = {
        bizCode: '',
        bizText: '',
        bizType: '',
        description: '',
        seq: '',
      }
      this.$refs['dictionaryRules'].resetFields()
    },
    changeValue() {
      this.addEditData.seq = this.addEditData.seq.replace(/[^\d，,]]*/g, '')
      this.addEditData.seq = this.addEditData.seq.replace(/,/g, '')
    },
    // 选择项改变时
    handleSelectionChange(val) {
      this.selectedList = val
    },
  },
}
</script>
<style scoped lang="scss">
/deep/ .el-form-item__label {
  text-align: left;
}
/deep/.el-dialog__header {
  text-align: left;
}
.btnRow {
  text-align: right;
  margin-top: 50px;
}
.buttonColor {
  color: #ffffff;
  background-image: linear-gradient(#00bebe, #00b3be);
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
</style>
