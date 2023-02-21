<template>
  <div class="app-container">
    <el-form ref="formSearch" :model="searchForm">
      <el-row :gutter="20" type="flex" class="wan-row-justify-box">
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <el-form-item :label="$t('userManage.roleId')" prop="roleCode">
            <el-input v-model="searchForm.roleCode" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <el-form-item :label="$t('userManage.roleName')" prop="roleName">
            <el-input v-model="searchForm.roleName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <el-form-item :label="$t('userManage.status')" prop="status">
            <el-select v-model="searchForm.status" :placeholder="$t('placeholder.select')">
              <el-option :key="1" :label="$t('userManage.invalid')" value="invalid" />
              <el-option :key="0" :label="$t('userManage.normal')" value="normal" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="6" :lg="{ span: '4-8' }" :sm="12">
          <div style="margin-top: 28px; margin-left: -20px">
            <el-button
              class="mainColor"
              size="small"
              plain
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
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-form ref="formSearch" :model="searchForm" label-position="top">
      <ExtensibleRow :row="'1'">
        <template #searchQuery>
          <el-row>
            <el-col :span="24">
              <el-row class="form_table">
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.roleId')" prop="roleCode">
                    <el-input v-model="searchForm.roleCode" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.roleName')" prop="roleName">
                    <el-input v-model="searchForm.roleName" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('userManage.status')" prop="status">
                    <el-select v-model="searchForm.status" :placeholder="$t('placeholder.select')">
                      <el-option :key="1" :label="$t('userManage.invalid')" value="invalid" />
                      <el-option :key="0" :label="$t('userManage.normal')" value="normal" />
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
              <el-form-item>
                <div class="button">
                  <el-button
                    size="small"
                    @click="
                      searchForm.pageNum = 1
                      getData()
                    "
                  >{{ $t('btn.query') }}</el-button>
                  <el-button size="small" @click="resetForm('formSearch')">{{ $t('btn.reset') }}</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </ExtensibleRow>
    </el-form> -->
    <div class="btnRow">
      <!-- <el-button class="outlineGreenButton" size="small" :disabled="selectedList.length != 1" @click="editDetail('edit', null)"><i class="iconfont icon-Vector" />{{ $t('btn.cancel') }}</el-button> -->
      <!-- <delete-btn :disabled="selectedList.length != 1" @handleDelete="handleDelete" /> -->
      <el-button class="mainColor" size="small" @click="openCreateUser">
        <i class="iconfont icon-icon_add_s" />
        {{ $t('btn.add') }}
      </el-button>
    </div>
    <!-- <img v-if="tableList.length < 1" style="margin-left: 35%" width="350" src="@/assets/images/空状态@2x.png" alt=""> -->
    <el-table
      :max-height="tableHeight"
      style="width: 100%; margin-top: 24px"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="40" center />
      <el-table-column :label="$t('userManage.roleId')" align="left" min-width="180">
        <template slot-scope="scope">
          <span class="view" @click="editDetail('view', scope.row)">{{ scope.row.roleCode }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" :label="$t('userManage.roleName')" align="left" min-width="180" />
      <el-table-column prop="statusText" :label="$t('userManage.status')" align="left" min-width="160" />
      <el-table-column prop="descript" :label="$t('userManage.described')" align="left" min-width="160" />
      <el-table-column prop="createUser" :label="$t('userManage.creator')" align="left" min-width="150" />
      <el-table-column prop="createTime" :label="$t('userManage.creationTime')" align="left" min-width="180" />
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
    <div class="dialog">
      <el-dialog
        :title="$t(`btn.${dialogTittle}`)"
        width="50%"
        :close-on-click-modal="false"
        center
        :visible.sync="userDialog"
        @close="closeDialog"
      >
        <div class="dialogScroll">
          <el-form
            ref="roleForm"
            :model="dialogForm"
            :rules="userFormRules"
            label-width="110px"
            style="padding-right: 15px"
            :disabled="dialogTittle == 'view'"
            label-position="top"
          >
            <el-row class="form_table">
              <el-col :span="8">
                <el-form-item :label="$t('userManage.roleId')" prop="roleCode">
                  <el-input v-model="dialogForm.roleCode" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('userManage.roleName')" prop="roleName">
                  <el-input v-model="dialogForm.roleName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('userManage.status')" prop="status">
                  <el-select v-model="dialogForm.status" :placeholder="$t('placeholder.select')">
                    <el-option :key="1" :label="$t('userManage.invalid')" value="invalid" />
                    <el-option :key="0" :label="$t('userManage.normal')" value="normal" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="margin-top: 30px">
                <el-form-item :label="$t('userManage.described')" prop="descript">
                  <el-input v-model="dialogForm.descript" :rows="2" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-card class="card_one">
            <div slot="header" class="flex_class">
              <span>{{ $t('userManage.roleManage') }}</span>
              <el-button v-if="dialogTittle != 'view'" class="outlineGreenButton" plain @click="openPermission">
                {{ $t('userManage.addPer') }}
              </el-button>
            </div>
            <el-table max-height="400px" :data="permissionList" border>
              <el-table-column prop="type" :label="$t('userManage.type')" align="center" />
              <el-table-column prop="name" :label="$t('userManage.name')" align="center" />
              <el-table-column prop="attribute" :label="$t('userManage.attribute')" align="center" />
              <el-table-column prop="value" :label="$t('userManage.value')" align="center" />
              <el-table-column v-if="dialogTittle != 'view'" :label="$t('userManage.operate')" align="center">
                <template slot-scope="scope" style="text-algin: center">
                  <el-button type="danger" plain @click="deletePer(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="card_one">
            <div slot="header" class="flex_class">
              <span>APP管理</span>
            </div>
            <div class="block" style="text-align: left; padding-bottom: 20px">
              <!-- <el-checkbox-group v-model="dialogForm.menuAppIds" :disabled="dialogTittle == 'view'">
                <el-checkbox v-for="item in appList" :key="item.menuId" class="app-module-item" :label="item.menuId">{{ item.title }}</el-checkbox>
              </el-checkbox-group> -->
              <el-tree
                ref="roleAppTree"
                :data="menuAppData"
                show-checkbox
                node-key="menuId"
                default-expand-all
                :default-checked-keys="checkedAppKeys"
                :props="defaultAppProps"
              />
            </div>
          </el-card>
          <el-card style="margin-top: 60px">
            <div slot="header">{{ $t('userManage.menuManage') }}</div>
            <el-tree
              ref="roleTree"
              :data="menuData"
              show-checkbox
              node-key="menuId"
              default-expand-all
              :default-checked-keys="checkedKeys"
              :props="defaultProps"
            />
          </el-card>
        </div>
        <div slot="footer" style="text-align: right">
          <el-button class="cancelColor" plain @click="userDialog = false">取 消</el-button>
          <el-button v-if="dialogTittle != 'view'" class="mainColor" @click="UserConfirm">
            {{ $t('btn.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
    <role-permission ref="rolePer" :visib="dialogPermission" @handleClose="handleClose" />
  </div>
</template>
<script>
import RolePermission from './components/RolePermission.vue'
import { allMenu, roleAdd, roleEdit, roleDelete, roleList, getAPPmenu } from '@/api/user-management'
export default {
  name: 'Role',
  components: {
    RolePermission
  },
  data() {
    return {
      appList: [],
      userStatus: [],
      selectedList: [],
      searchForm: {
        roleCode: '',
        roleName: '',
        status: '', // normal: 已激活 invalid: 未激活
        pageSize: 10,
        pageNum: 1
      },
      tableList: [],
      total: 0,

      dialogTittle: 'view',
      userDialog: false,
      dialogForm: {
        descript: '', // 描述
        menuIds: [], // 菜单id
        roleCode: 'ROLE_', // 角色代码
        roleName: '', // 角色名称
        status: '', // 状态
        permissionIds: [], // 权限id
        menuAppIds: []
      },
      tableHeight: document.documentElement.clientHeight - 302 - 45,
      permissionList: [], // 权限列表
      dialogPermission: false,
      userFormRules: {
        roleCode: [
          { required: true, message: this.$t('placeholder.input'), trigger: 'blur' },
          { pattern: /^ROLE_([0-9A-Z_-]){1,20}$/, message: this.$t('userManage.roleRule'), trigger: 'blur' }
        ],
        roleName: [{ required: true, message: this.$t('placeholder.input'), trigger: 'blur' }],
        status: [{ required: true, message: this.$t('placeholder.input'), trigger: 'change' }]
      },
      checkedKeys: [], // 当前选中的keys
      checkedAppKeys: [], // 当前选中的app keys
      menuData: [], // 所有的菜单
      menuAppData: [], // app所有的菜单
      parentMenuIds: [], // 非叶子节点的菜单id
      parentAppMenuIds: [], // app非叶子节点的菜单id
      defaultProps: {
        children: 'children',
        label: (data, node) => {
          return data.meta.title
        },
        disabled: (data, node) => {
          return this.dialogTittle == 'view'
        }
      },
      defaultAppProps: {
        children: 'children',
        label: (data, node) => {
          return data.title
        },
        disabled: (data, node) => {
          return this.dialogTittle == 'view'
        }
      }
    }
  },
  created() {
    this.getAllMenus().then(() => {
      this.getParentMenuIds(this.menuData)
    })
    this.getAPP()
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
    async getAPP() {
      const { data } = await getAPPmenu()
      this.menuAppData = data
      this.getAppParentMenuIds(this.menuAppData)
    },
    // 获取所有的菜单树形结构
    getAllMenus() {
      return allMenu().then((res) => {
        if (res.resultCode == 'success') {
          this.menuData = res.data
        }
      })
    },
    // 获取非叶子节点的菜单id
    getParentMenuIds(list) {
      list.forEach((item) => {
        if (item.children && item.children.length != 0) {
          this.parentMenuIds.push(item.menuId)
          this.getParentMenuIds(item.children)
        }
      })
    },
    // 获取App非叶子节点的菜单id
    getAppParentMenuIds(list) {
      list.forEach((item) => {
        if (item.children && item.children.length != 0) {
          this.parentAppMenuIds.push(item.menuId)
          this.getAppParentMenuIds(item.children)
        }
      })
    },
    //  只留下叶子节点的id（去除父节点的id）
    // menuIds是包含父节点的已选中id的list
    deleteParentMenuIds(menuIds) {
      this.checkedKeys = menuIds.filter((item) => {
        return !this.parentMenuIds.includes(item)
      })
    },
    deleteAppParentMenuIds(menuIds) {
      this.checkedAppKeys = menuIds.filter((item) => {
        return !this.parentAppMenuIds.includes(item)
      })
    },
    // 删除权限列表中的某一项
    deletePer(index) {
      this.permissionList.splice(index, 1)
    },
    // 选择权限弹窗关闭后执行的操作
    handleClose(list) {
      list.forEach((item) => {
        if (!this.permissionList.some((ele) => item.pkId == ele.pkId)) {
          this.permissionList.push(item)
        }
      })
      this.dialogPermission = false
    },
    // 打开权限选择弹框
    openPermission() {
      this.dialogPermission = true
      this.$refs.rolePer.getData()
    },

    //  去除查询条件中的空项
    deleteItem(object) {
      var newObj = {}
      for (const key in object) {
        if (object[key]) {
          newObj[key] = object[key]
        }
      }
      return newObj
    },
    // 获取选中菜单的id
    getMenuIds() {
      return this.$refs.roleTree.getCheckedKeys().concat(...this.$refs.roleTree.getHalfCheckedKeys())
    },
    getAppMenuIds() {
      return this.$refs.roleAppTree.getCheckedKeys().concat(...this.$refs.roleAppTree.getHalfCheckedKeys())
    },
    // 提交
    UserConfirm() {
      this.$refs.roleForm.validate((valid, obj) => {
        if (valid) {
          // 转换为 权限pkid的list
          this.dialogForm.permissionIds = this.permissionList.map((item) => item.pkId)
          // 此处处理菜单list
          this.dialogForm.menuIds = this.getMenuIds()
          this.dialogForm.menuAppIds = this.getAppMenuIds()
          if (this.dialogTittle == 'add') {
            // 新增
            roleAdd(this.dialogForm).then((res) => {
              if (res.resultCode == 'success') {
                this.closeDialog(true)
                return
              }
            })
          } else {
            // 编辑
            roleEdit(this.dialogForm).then((res) => {
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
      this.permissionList = []
      this.checkedKeys = []
      this.$refs.roleTree.setCheckedKeys([])
      this.checkedAppKeys = []
      this.$refs.roleAppTree.setCheckedKeys([])
      this.$refs['roleForm'].resetFields()
      // this.dialogForm.menuAppIds = []
      this.userDialog = false
    },
    // 删除操作 做 提示
    handleDelete(row) {
      this.$confirm('是否删除此数据?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        cancelButtonClass: 'deleteCancelBtn',
        type: 'warning'
      })
        .then(async () => {
          roleDelete(row.pkId).then((res) => {
            if (res.resultCode == 'success') {
              this.searchForm.pageNum = 1
              this.getData()
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
      // console.log(this.checkedKeys)
      this.userDialog = true
    },
    // 编辑和查看操作
    editDetail(title, row) {
      this.dialogTittle = title

      this.userDialog = true
      this.$nextTick(() => {
        this.dialogForm = JSON.parse(JSON.stringify(row || this.selectedList[0]))
        // 赋值到权限列表绑定的list上
        this.permissionList = this.dialogForm.permissions
        // 将菜单非叶子节点的menuId过滤出来
        this.deleteParentMenuIds(this.dialogForm.menuIds)
        this.deleteAppParentMenuIds(this.dialogForm.menuAppIds)
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
      roleList(this.deleteItem(this.searchForm)).then((res) => {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  // .flex_class {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  // }
  .btnRow {
    text-align: right;
    margin-top: 16px;
  }
  // .el-form-item {
  //   margin-right: 24px;
  // }
  .seachBtn {
    .el-col {
      text-align: right;
      // margin-top: -18px;
    }
  }
  /deep/.el-dialog__header {
    text-align: left;
  }
  .card_one {
    margin-top: 60px;
  }
  .buttonColor {
    color: #ffffff;
    background-image: linear-gradient(#00bebe, #00b3be);
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
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
