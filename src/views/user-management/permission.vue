<template>
  <div class="app-container">
    <el-form ref="formSearch" :model="searchForm">
      <ExtensibleRow :row="'1'" :form="searchForm" :is-first-row="true">
        <template #searchQuery>
          <el-row :gutter="20" type="flex" class="wan-row-justify-box">
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.type')" prop="type">
                <el-select v-model="searchForm.type" :placeholder="$t('placeholder.select')">
                  <el-option v-for="item in permissionTypes" :key="item.bizCode" :label="item.bizText" :value="item.bizCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.typeName')" prop="type">
                <el-select v-model="searchForm.type" :placeholder="$t('placeholder.select')" disabled>
                  <el-option v-for="item in permissionTypes" :key="item.bizCode" :label="item.bizText" :value="item.bizCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('businessGlossary.isValid')" prop="isValid">
                <el-select v-model="searchForm.isValid" :placeholder="$t('placeholder.select')">
                  <el-option :key="0" :label="$t('businessGlossary.no')" :value="0" />
                  <el-option :key="1" :label="$t('businessGlossary.yes')" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <div style="margin-top: 28px">
                <el-button
                  class="mainColor"
                  plain
                  size="small"
                  @click="
                    searchForm.pageNum = 1
                    getData()
                  "
                >{{ $t('btn.query') }}</el-button>
                <el-button class="outlineGreenButton" plain size="small" @click="resetForm('formSearch')">{{ $t('btn.reset') }}</el-button>
              </div>
            </el-col>
          </el-row>
        </template>
      </ExtensibleRow>
    </el-form>
    <!-- <el-form ref="formSearch" :model="searchForm" label-width="100px">
      <el-row>
        <el-col :span="19">
          <el-row class="form_table">
            <el-col :span="8">
              <el-form-item :label="$t('userManage.type')" prop="type">
                <el-select v-model="searchForm.type" :placeholder="$t('placeholder.select')">
                  <el-option v-for="item in permissionTypes" :key="item.bizCode" :label="item.bizCode" :value="item.bizCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('userManage.typeName')" prop="type">
                <el-select v-model="searchForm.type" :placeholder="$t('placeholder.select')" disabled>
                  <el-option v-for="item in permissionTypes" :key="item.bizCode" :label="item.bizText" :value="item.bizCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('businessGlossary.isValid')" prop="isValid">
                <el-select v-model="searchForm.isValid" :placeholder="$t('placeholder.select')">
                  <el-option :key="0" :label="$t('businessGlossary.no')" :value="0" />
                  <el-option :key="1" :label="$t('businessGlossary.yes')" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <el-button
            type="primary"
            @click="
              searchForm.pageNum = 1
              getData()
            "
          >{{ $t('btn.query') }}</el-button>
          <el-button type="danger" @click="resetForm('formSearch')">{{ $t('btn.reset') }}</el-button>
        </el-col>
      </el-row>
    </el-form> -->
    <div class="btnRow">
      <!-- <el-button size="small" class="outlineGreenButton" :disabled="selectedList.length != 1" @click="editDetail('edit', null)"><i class="iconfont icon-Vector" />{{ $t('btn.edit') }}</el-button> -->
      <!-- <delete-btn :disabled="selectedList.length == 0" @handleDelete="handleDelete" /> -->
      <el-button size="small" class="buttonColor" @click="openCreateUser"><i class="iconfont icon-icon_add_s" />{{ $t('btn.add') }}</el-button>
    </div>
    <!-- <img v-if="tableList.length < 1" style="margin-left: 35%" width="350" src="@/assets/images/空状态@2x.png" alt=""> -->
    <el-table style="width: 100%; margin-top: 24px" :max-height="tableHeight" :data="tableList" @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="40" align="left" />
      <el-table-column :label="$t('userManage.type')" align="left" min-width="180">
        <template slot-scope="scope">
          <span class="view" @click="editDetail('view', scope.row)">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" :label="$t('userManage.typeName')" align="left" min-width="180" />
      <el-table-column prop="name" :label="$t('userManage.name')" align="left" min-width="180" />
      <el-table-column prop="value" :label="$t('userManage.value')" align="left" min-width="180" />
      <el-table-column prop="attribute" :label="$t('userManage.attribute')" align="left" min-width="180" />
      <el-table-column prop="isValid" :label="$t('businessGlossary.isValid')" align="left" min-width="160">
        <template slot-scope="scope">
          {{ $t(`businessGlossary.${scope.row.isValid ? 'yes' : 'no'}`) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('userManage.creationTime')" align="left" min-width="180" />
      <el-table-column prop="createUser" :label="$t('userManage.creator')" align="left" min-width="150" />
      <el-table-column prop="modifyTime" :label="$t('userManage.modifyTime')" align="left" min-width="140" />
      <el-table-column prop="modifyUser" :label="$t('userManage.modifyUser')" align="left" min-width="180" />
      <el-table-column label="操作" fixed="right" min-width="100" align="left">
        <template slot-scope="scope">
          <el-button type="text" class="openColor" @click="editDetail('edit', scope.row)">编辑</el-button>
          <el-button type="text" class="closeColor" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <div slot="empty" style="text-align: center">
        <img width="321" src="@/assets/images/空状态@2x.png" alt="">
      </div>
    </el-table>
    <div class="pagination">
      <el-pagination v-show="total > 0" small background :current-page.sync="searchForm.pageNum" :page-sizes="$pageSizeAll" :page-size="searchForm.pageSize" layout="total, prev, pager, next, jumper, sizes" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog :title="$t(`btn.${dialogTittle}`)" width="40%" :close-on-click-modal="false" :visible.sync="userDialog" @close="closeDialog">
      <div class="dialogScroll">
        <el-form ref="premissionForm" :model="dialogForm" :rules="userFormRules" label-width="120px" :disabled="dialogTittle == 'view'">
          <el-row class="form_table_permission">
            <el-col :span="24">
              <el-form-item :label="$t('userManage.type')">
                <!-- <el-input v-model="dialogForm.type" /> -->
                <el-select v-model="dialogForm.type" :placeholder="$t('placeholder.select')" :disabled="dialogTittle != 'add'">
                  <el-option v-for="item in permissionTypes" :key="item.bizCode" :label="item.bizText" :value="item.bizCode" />
                </el-select>
              </el-form-item>
              <div v-if="dialogForm.type == 'url'" style="margin-top: -13px; margin-left: 120px; color: #f56c6c; font-size: 12px">URL权限设定不当会导致系统访问问题,请谨慎使用</div>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('userManage.name')">
                <!-- <el-select v-model="dialogForm.type" :placeholder="$t('placeholder.select')" disabled>
                    <el-option v-for="item in permissionTypes" :key="item.bizCode" :label="item.bizText" :value="item.bizCode" />
                  </el-select> -->
                <el-input v-model="dialogForm.name" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item v-if="dialogForm.type == 'url'" label="Http URL">
                <el-input v-model="dialogForm.value" placeholder="请输入" />
              </el-form-item>
              <el-form-item v-if="dialogForm.type == ''" label="权限值">
                <el-input v-model="dialogForm.value" placeholder="请输入" />
              </el-form-item>
              <el-form-item v-if="dialogForm.type == 'button'" label="权限属性">
                <el-input v-model="dialogForm.attribute" placeholder="请输入" />
              </el-form-item>
              <div v-if="dialogForm.type == 'button'" style="margin-top: -13px; margin-left: 120px; color: #f56c6c; font-size: 12px">按钮权限属性名. 例:manage_confirm</div>
              <div v-if="dialogForm.type == 'url'" style="margin-top: -13px; margin-left: 120px; color: #f56c6c; font-size: 12px">输入Http URL地址,可包含通配符. 例:/api/sys/v1/user/**</div>
            </el-col>
            <el-col v-if="dialogForm.type == ''" :span="24">
              <el-form-item label="权限属性">
                <el-input v-model="dialogForm.attribute" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col v-if="dialogForm.type == 'url'" :span="24">
              <el-form-item label="Http Method">
                <el-input v-model="dialogForm.attribute" placeholder="请输入" />
              </el-form-item>
              <div v-if="dialogForm.type == 'url'" style="margin-top: -13px; margin-left: 120px; color: #f56c6c; font-size: 12px">输入Http Method,逗号分割,空为全部. 例:get,post,put,delete</div>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('businessGlossary.isValid')" prop="isValid">
                <el-select v-model="dialogForm.isValid" :placeholder="$t('placeholder.select')">
                  <el-option :key="0" :label="$t('businessGlossary.no')" :value="0" />
                  <el-option :key="1" :label="$t('businessGlossary.yes')" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" style="text-align: right">
        <el-button class="cancelColor" plain @click="userDialog = false">取 消</el-button>
        <el-button v-if="dialogTittle != 'view'" class="mainColor" @click="UserConfirm">{{ $t('btn.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDictList } from '@/api/dict-data'
import { permissionAdd, permissionEdit, permissionDelete, getPermissionList } from '@/api/user-management'
export default {
  data() {
    return {
      permissionTypes: [],
      selectedList: [],
      searchForm: {
        isValid: null,
        type: '',
        pageSize: 10,
        pageNum: 1,
      },
      tableList: [],
      total: 0,

      dialogTittle: 'view',
      userDialog: false,
      dialogForm: {
        type: '', // '权限类型',
        name: '', // '权限名称',
        attribute: '', // 权限属性
        value: '', // '权限值',
        isValid: 1, // '状态'
      },
      userFormRules: {
        type: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        value: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        attribute: [{ required: false, message: this.$t('placeholder.input'), trigger: 'blur' }],
        name: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        isValid: [{ required: true, message: this.$t('placeholder.input'), trigger: 'change' }],
      },
      tableHeight: document.documentElement.clientHeight - 302 - 45,
    }
  },
  created() {
    this.getTypes()
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
    getTypes() {
      getDictList('permission_type').then((res) => {
        if (res.resultCode == 'success') {
          this.permissionTypes = res.data
          return
        }
      })
    },
    UserConfirm() {
      if (!this.dialogForm.type) {
        this.$message.error('权限类型必填')
        return
      }
      if (!this.dialogForm.name) {
        this.$message.error('权限名称必填')
        return
      }
      if (this.dialogForm.type == 'url') {
        if (!this.dialogForm.value) {
          this.$message.error('Http URL地址必填')
          return
        }
      }
      if (this.dialogForm.type == 'button') {
        if (!this.dialogForm.value) {
          this.$message.error('权限属性必填')
          return
        }
      }

      this.$refs.premissionForm.validate((valid, obj) => {
        if (valid) {
          if (this.dialogTittle == 'add') {
            permissionAdd(this.dialogForm).then((res) => {
              if (res.resultCode == 'success') {
                this.getTypes()
                this.closeDialog(true)
                return
              }
            })
          } else {
            permissionEdit(this.dialogForm).then((res) => {
              if (res.resultCode == 'success') {
                this.closeDialog(true)
                return
              }
            })
          }
        } else {
          return
        }
      })
    },
    closeDialog(bool) {
      bool && this.getData()
      ;(this.dialogForm = {
        type: '', // '权限类型',
        name: '', // '权限名称',
        attribute: '', // 权限属性
        value: '', // '权限值',
        isValid: 1, // '状态'
      }),
      this.$refs.premissionForm.resetFields()
      this.userDialog = false
    },
    // 删除操作 做 提示
    handleDelete(row) {
      this.$confirm('是否删除此数据?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'deleteCancelBtn',
        type: 'warning',
      })
        .then(async() => {
          permissionDelete(row.pkId).then((res) => {
            if (res.resultCode == 'success') {
              this.searchForm.pageNum = 1
              this.getData()
              return
            }
          })
        })
        .catch((err) => {
          if (err != 'cancel') return
          this.$message.info('取消操作!')
        })
    },
    // 新建操作
    openCreateUser() {
      this.dialogTittle = 'add' // 新建
      this.userDialog = true
    },
    // 编辑和查看操作
    editDetail(title, row) {
      this.dialogTittle = title
      this.dialogForm = JSON.parse(JSON.stringify(row || this.selectedList[0]))
      this.userDialog = true
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.tableList = []
      this.total = 0
    },
    // 查询
    getData() {
      this.$refs.formSearch.validate((valid) => {
        if (valid) {
          getPermissionList(this.searchForm).then((res) => {
            if (res.resultCode == 'success') {
              this.tableList = res.data.list
              this.total = res.data.total
              return
            }
          })
        } else {
          return
        }
      })
    },
    // 选择项改变时
    handleSelectionChange(val) {
      this.selectedList = val
    },
    // 页码改变
    handleCurrentChange(pageNum) {
      this.searchForm.pageNum = pageNum
      this.getData()
    },
    // 每页size改变时
    handleSizeChange(val) {
      this.searchForm.pageNum = 1
      this.searchForm.pageSize = val
      this.getData()
    },
  },
}
</script>
<style scoped lang="scss">
/deep/ .el-form-item__label {
  text-align: left;
}
.button {
  display: flex;
  justify-content: flex-end;
  position: relative;
  right: 180%;
}
.form_table_permission .el-col {
  height: 55px !important;
}
.btnRow {
  text-align: right;
  margin-top: 46px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
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
