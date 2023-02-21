<template>
  <div class="app-container">
    <el-form ref="formSearch" :model="searchForm">
      <ExtensibleRow :row="'2'" :form="searchForm">
        <template #searchQuery>
          <el-row :gutter="20" type="flex" class="wan-row-justify-box">
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.userId')" prop="account">
                <el-input v-model="searchForm.account" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item label="权限分配" prop="isRole">
                <el-select v-model="searchForm.isRole" :placeholder="$t('placeholder.select')" clearable>
                  <el-option label="否" :value="0" />
                  <el-option label="是" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item label="所属角色" prop="roleId">
                <AnjiSelect
                  v-model="searchForm.roleId"
                  url="/api/sys/v1/role/query/role"
                  filterable
                  params-name="data"
                  label="roleName"
                  option="pkId"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.userName')" prop="name">
                <el-input v-model="searchForm.name" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.email')" prop="email">
                <el-input v-model="searchForm.email" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.mobile')" prop="mobile">
                <el-input v-model="searchForm.mobile" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item :label="$t('userManage.status')" prop="isDel">
                <el-select v-model="searchForm.isDel" :placeholder="$t('placeholder.select')">
                  <el-option key="1" :label="$t('userManage.isDelete')" :value="1" />
                  <el-option key="0" :label="$t('userManage.noDelete')" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
              <el-form-item label="用户类型" prop="type">
                <el-select v-model="searchForm.type" :placeholder="$t('placeholder.select')">
                  <el-option key="1" label="NIO用户" :value="1" />
                  <el-option key="0" label="PORTAL用户" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template #searchBtn>
          <el-row>
            <el-col>
              <el-form-item>
                <div class="button">
                  <el-button
                    class="mainColor"
                    plain
                    size="small"
                    @click="
                      searchForm.pageNum = 1
                      getData()
                    "
                  >
                    {{ $t('btn.query') }}
                  </el-button>
                  <el-button class="outlineGreenButton" plain size="small" @click="resetForm('formSearch')">
                    {{ $t('btn.reset') }}
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </ExtensibleRow>
    </el-form>
    <!-- <el-form ref="formSearch" :model="searchForm" label-width="100px" label-position="top">
      <ExtensibleRow :row="'2'">
        <template #searchQuery>
          <el-row>
            <el-col :span="24">
              <el-row class="form_table" :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.userId')" prop="account">
                    <el-input v-model="searchForm.account" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.userName')" prop="name">
                    <el-input v-model="searchForm.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.email')" prop="email">
                    <el-input v-model="searchForm.email" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="form_table" :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.mobile')" prop="mobile">
                    <el-input v-model="searchForm.mobile" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item :label="$t('userManage.idCard')" prop="idCard">
                  <el-input v-model="searchForm.idCard"   />
                </el-form-item>
              </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.status')" prop="isDel">
                    <el-select v-model="searchForm.isDel" :placeholder="$t('placeholder.select')">
                      <el-option key="1" :label="$t('userManage.isDelete')" :value="1" />
                      <el-option key="0" :label="$t('userManage.noDelete')" :value="0" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
        <template #searchBtn>
          <el-row class="seachBtn">
            <el-col>
              <el-button
                size="small"
                @click="
                  searchForm.pageNum = 1
                  getData()
                "
              >{{ $t('btn.query') }}</el-button>
              <el-button size="small" @click="resetForm('formSearch')">{{ $t('btn.reset') }}</el-button>
            </el-col>
          </el-row>
        </template>
      </ExtensibleRow>
    </el-form> -->
    <div class="btnRow">
      <!-- <el-button class="outlineGreenButton" size="small" :disabled="selectedList.length != 1" @click="editDetail('edit', null)"><i class="iconfont icon-Vector" />{{ $t('btn.edit') }}</el-button> -->
      <el-button
        class="outlineGreenButton"
        plain
        size="small"
        :disabled="selectedList.length != 1"
        @click="resetPassword"
      >
        <i class="iconfont icon-icon_overduetask_24beifen" />
        {{ '重置密码' }}
      </el-button>
      <!-- <delete-btn :disabled="selectedList.length != 1" @handleDelete="handleDelete" /> -->
      <el-button class="outlineGreenButton" plain size="small" @click="handelBulkImport">
        <i class="iconfont icon-Unionbeifen" />
        导入
      </el-button>
      <el-button class="mainColor" size="small" @click="openCreateUser">
        <i class="iconfont icon-icon_add_s" />
        {{ $t('btn.add') }}
      </el-button>
    </div>
    <!-- <img v-if="tableList.length < 1" style="margin-left: 35%" width="350" src="@/assets/images/空状态@2x.png" alt=""> -->
    <el-table
      style="width: 100%; margin-top: 24px"
      :max-height="tableHeight"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="40" align="left" />
      <el-table-column :label="$t('userManage.userId')" align="left" min-width="180" fixed>
        <template slot-scope="scope">
          <span class="view" @click="editDetail('view', scope.row)">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('userManage.userName')" align="left" min-width="160" />
      <el-table-column prop="typeText" label="用户类型" align="left" min-width="160" />
      <el-table-column prop="mobile" :label="$t('userManage.mobile')" align="left" min-width="160" />
      <el-table-column prop="email" :label="$t('userManage.email')" align="left" min-width="160" />
      <el-table-column prop="rolesText" :label="$t('userManage.userRoles')" align="left" min-width="180" />
      <!-- <el-table-column prop="idCard" :label="$t('userManage.idCard')" align="center" min-width="160" /> -->
      <el-table-column prop="isDelText" :label="$t('userManage.status')" align="left" min-width="160" />
      <el-table-column prop="tel" :label="$t('userManage.tel')" align="left" min-width="150" />
      <el-table-column prop="lastLoginTime" :label="$t('userManage.lastLoginTime')" align="left" min-width="160" />
      <el-table-column prop="frozenTime" :label="$t('userManage.frozenTime')" align="left" min-width="160" />
      <!-- <el-table-column prop="password" :label="$t('userManage.password')" align="center" min-width="180" /> -->
      <el-table-column prop="remark" :label="$t('userManage.remark')" align="left" min-width="160" />
      <el-table-column prop="createDate" :label="$t('userManage.creationTime')" align="left" min-width="160" />
      <el-table-column prop="createUser" :label="$t('userManage.creator')" align="left" min-width="160" />
      <el-table-column prop="updateDate" :label="$t('userManage.modifyTime')" align="left" min-width="180" />
      <el-table-column prop="updateUser" :label="$t('userManage.modifyUser')" align="left" min-width="140" />
      <el-table-column label="操作" fixed="right" min-width="100" align="left">
        <template slot-scope="scope">
          <el-button type="text" class="openColor" @click="editDetail('edit', scope.row)">编辑</el-button>
          <el-button type="text" class="closeColor" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <div slot="empty" style="text-align: center">
        <img width="321" src="@/assets/images/空状态@2x.png" alt="" />
      </div>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-show="total > 0"
        background
        :current-page.sync="searchForm.pageNum"
        :page-sizes="$pageSizeAll"
        :page-size="searchForm.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="$t(`btn.${dialogTittle}`)"
      width="60%"
      :close-on-click-modal="false"
      :visible.sync="userDialog"
      @close="closeDialog"
    >
      <div class="dialogScroll">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{ $t('userManage.baseInfo') }}</span>
          </div>
          <el-form
            ref="userForm"
            :model="dialogForm"
            :rules="userFormRules"
            label-width="120px"
            style="padding-right: 15px"
            :disabled="dialogTittle == 'view'"
            label-position="top"
          >
            <el-row class="form_table" :gutter="30">
              <el-col :span="12">
                <el-form-item :label="$t('userManage.userId')" prop="account">
                  <el-input v-model="dialogForm.account" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('userManage.userName')" prop="name">
                  <el-input v-model="dialogForm.name" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('userManage.mobile')" prop="mobile">
                  <el-input v-model="dialogForm.mobile" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('userManage.email')" prop="email">
                  <el-input v-model="dialogForm.email" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col v-if="dialogTittle != 'add'" :span="12">
                <el-form-item :label="$t('userManage.status')" prop="isDel">
                  <el-select v-model="dialogForm.isDel" :placeholder="$t('placeholder.select')">
                    <el-option key="1" :label="$t('userManage.isDelete')" :value="1" />
                    <el-option key="0" :label="$t('userManage.noDelete')" :value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('userManage.tel')" prop="tel">
                  <el-input v-model="dialogForm.tel" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户类型" prop="type">
                  <el-select v-model="dialogForm.type" :placeholder="$t('placeholder.select')">
                    <el-option key="1" label="NIO用户" :value="1" />
                    <el-option key="0" label="PORTAL用户" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
              <el-form-item :label="$t('userManage.password')" prop="password">
                <el-input v-model="dialogForm.password" />
              </el-form-item>
            </el-col> -->
              <el-col :span="24">
                <el-form-item :label="$t('userManage.remark')" prop="remark">
                  <el-input v-model="dialogForm.remark" placeholder="请输入" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <!-- 角色信息关联 -->
        <user-role v-if="userDialog" ref="userRole" :roles="dialogForm.roles" :disabled="dialogTittle" />
      </div>
      <!-- <el-card v-if="roleList.length" style="margin-top:10px">
        <div slot="header" class="clearfix">
          <span>{{ $t('userManage.roleInfo') }}</span>
        </div>
        <el-checkbox v-model="checkAll" :disabled="dialogTittle=='view'" style="margin-bottom:10px" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checked" :disabled="dialogTittle=='view'" @change="handleCheckedChange">
          <el-checkbox v-for="item in roleList" :key="item.pkId" style="margin-bottom:5px" :label="item.pkId">{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-card> -->
      <div slot="footer" style="text-align: right">
        <el-button class="cancelColor" plain @click="userDialog = false">取 消</el-button>
        <el-button v-if="dialogTittle != 'view'" class="mainColor" @click="UserConfirm">
          {{ $t('btn.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog
      style="padding: 0"
      :append-to-body="true"
      title="文件上传"
      :visible.sync="dialogImprotVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="640px"
      :before-close="handleClose"
    >
      <div>
        <el-row>
          <el-col>
            <el-button type="text" @click="downloadFileByBlob">
              <i class="iconfont icon-icon_download_24" />
              下载导入模板
            </el-button>
          </el-col>
          <el-col :span="24">
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :action="baseUrl + '/api/sys/v1/user/import/userRole'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="success"
              :on-error="error"
              :headers="authHeader"
              :on-change="change"
              :limit="1"
              enctype="multipart/form-data"
              name="file"
              :auto-upload="false"
            >
              <div style="margin-top: 60px; margin-bottom: 10px"><i class="iconfont icon-icon_add_s" /></div>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <!-- <el-button style="margin-left: 0px !important" class="outlineGreenButton" size="small">选择文件</el-button>
                <span style="margin-left: 10px" disabled>请导入数据</span> -->
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancelColor" plain @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { userAdd, userEdit, resetPassword, userDelete, userQuery, importData } from '@/api/user-management'
import { getToken } from '@/utils/auth'
export default {
  components: {
    UserRole: require('./components/UserRole.vue').default
  },
  data() {
    return {
      authHeader: {
        Authorization: `Bearer ` + getToken(),
        'current-whse-id': Cookies.get('current-whse-id')
      },
      userStatus: [],
      selectedList: [],
      searchForm: {
        account: '', // 用户名
        name: '', // 用户姓名
        email: '', // 邮箱
        idCard: '', // 身份证
        isDel: '', // 是否有效 0有效 1，无效
        mobile: '', // 手机
        tel: '', // 电话
        type: '', // 用户类型
        isRole: '', // 权限分配
        roleId: '',
        pageNum: 1,
        pageSize: 10
      },
      tableList: [],
      total: 0,
      dialogImprotVisible: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      dialogTittle: 'view',
      userDialog: false,
      dialogForm: {
        account: '', // 用户id,
        name: '', //  用户名称',
        mobile: '', //  手机',
        email: '', //  用户邮箱',
        roles: [], //  所属角色',
        isDel: 0, //  状态',
        tel: '', //  电话',
        remark: '', //  备注',
        type: ''
      },
      unplanned: {
        code: 'user'
      },
      tableHeight: document.documentElement.clientHeight - 302 - 45,
      userFormRules: {
        account: [
          { required: true, message: this.$t('placeholder.input'), trigger: 'blur' },
          { pattern: /[0-9a-zA-Z_]$/, message: this.$t('userManage.vilad') }
        ],
        name: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        email: [
          { required: false, message: this.$t('placeholder.input'), trigger: 'blur' },
          // { pattern: /^([a-zA-Z\d])(\w|\-)+@\S+\.[a-zA-Z]{2,4}$/, message: this.$t('userManage.viladEmail') },
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: this.$t('userManage.viladEmail')
          }
        ],
        isDel: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        mobile: [
          // { required: true, message: this.$t('placeholder.input'), trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: this.$t('userManage.mobileVilid') }
        ],
        type: [{ required: true, message: this.$t('placeholder.select'), trigger: 'blur' }]
      }
    }
  },
  created() {},
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
    UserConfirm() {
      this.$refs.userForm.validate((valid, obj) => {
        if (valid) {
          this.dialogForm.roles = this.$refs.userRole.selectedList.map((item) => {
            return item.pkId
          })
          if (this.dialogTittle == 'add') {
            userAdd(this.dialogForm).then((res) => {
              if (res.resultCode === 'success') {
                this.closeDialog(true)
                return
              }
            })
          } else {
            userEdit(this.dialogForm).then((res) => {
              if (res.resultCode === 'success') {
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
      this.$refs['userForm'].resetFields()
      this.dialogForm.roles = []
      this.userDialog = false
    },
    resetPassword() {
      this.$confirm(this.$t('userManage.resetpsw'), this.$t('promptMessage.deleteTipTitle'), {
        type: 'warning'
      })
        .then(() => {
          resetPassword(this.selectedList[0].pkId).then((res) => {
            if (res.resultCode === 'success') {
              this.getData()
              return
            }
          })
        })
        .catch(() => {})
    },
    // 删除操作
    handleDelete(row) {
      this.$confirm('是否删除此数据?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'deleteCancelBtn',
        type: 'warning'
      })
        .then(async () => {
          userDelete(row.pkId).then((res) => {
            if (res.resultCode === 'success') {
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
      // this.getRoles()
      this.dialogTittle = 'add' // 新建
      this.userDialog = true
    },
    // 编辑和查看操作
    editDetail(title, row) {
      this.dialogTittle = title
      this.userDialog = true
      this.$nextTick(() => {
        this.dialogForm = JSON.parse(JSON.stringify(row || this.selectedList[0]))
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.tableList = []
      this.total = 0
    },
    // 查询
    getData() {
      userQuery(this.searchForm).then((res) => {
        if (res.resultCode == 'success') {
          this.tableList = res.data.list
          this.total = res.data.total
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
    // 批量导入
    handelBulkImport() {
      this.dialogImprotVisible = true
    },
    handlePreview(file, fileList) {
      // console.log(file, fileList)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    change(file, fileList) {
      // console.log(fileList)
      this.fileList = fileList
      console.log(this.fileList, 'this.fileList')
    },
    async submitUpload() {
      // console.log(this.fileList)
      if (this.fileList == '') {
        this.Loading = false
      } else {
        this.Loading = true
      }
      // const res = await bulkImport(this.fileList[0])
      // console.log(res)
      this.$refs.upload.submit() // 提交按钮
    },
    handleClose() {
      this.$refs.upload.clearFiles() // 重置按钮
      this.dialogImprotVisible = false
      return
    },
    success(response) {
      if (response.resultCode != 'success') {
        this.$message({
          showClose: true,
          message: response.displayMsg,
          type: 'error',
          center: true
        })
      } else {
        // 导入成功后的操作
        this.getData()
        this.handleClose()
      }
      this.$refs.upload.clearFiles()
      this.Loading = false
    },
    error(err) {
      this.$message.error('提交失败')
      this.Loading = false
    },
    async downloadFileByBlob() {
      const res = await importData(this.unplanned)
      window.open(res.data)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .form_table {
  margin-bottom: 30px;
}
.form_table .el-col {
  height: 80px !important;
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
