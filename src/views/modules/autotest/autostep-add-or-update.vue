<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父案例id,关联auto_project" prop="projectId">
      <el-input v-model="dataForm.projectId" placeholder="父案例id,关联auto_project"></el-input>
    </el-form-item>
    <el-form-item label="识别方法/接口名称" prop="findBy">
      <el-input v-model="dataForm.findBy" placeholder="识别方法/接口名称"></el-input>
    </el-form-item>
    <el-form-item label="识别内容/接口实例" prop="findContent">
      <el-input v-model="dataForm.findContent" placeholder="识别内容/接口实例"></el-input>
    </el-form-item>
    <el-form-item label="操作类型id" prop="opId">
      <el-input v-model="dataForm.opId" placeholder="操作类型id"></el-input>
    </el-form-item>
    <el-form-item label="操作目标或预期结果" prop="opTarget">
      <el-input v-model="dataForm.opTarget" placeholder="操作目标或预期结果"></el-input>
    </el-form-item>
    <el-form-item label="0默认 start开始 end 结束" prop="circulation">
      <el-input v-model="dataForm.circulation" placeholder="0默认 start开始 end 结束"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="状态：1 有效；0 失效" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态：1 有效；0 失效"></el-input>
    </el-form-item>
    <el-form-item label="类型   1：web   2：接口  " prop="type">
      <el-input v-model="dataForm.type" placeholder="类型   1：web   2：接口  "></el-input>
    </el-form-item>
    <el-form-item label="" prop="orderNum">
      <el-input v-model="dataForm.orderNum" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="描述"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          stepId: 0,
          projectId: '',
          findBy: '',
          findContent: '',
          opId: '',
          opTarget: '',
          circulation: '',
          createUser: '',
          status: '',
          type: '',
          orderNum: '',
          createTime: '',
          remark: ''
        },
        dataRule: {
          projectId: [
            { required: true, message: '父案例id,关联auto_project不能为空', trigger: 'blur' }
          ],
          findBy: [
            { required: true, message: '识别方法/接口名称不能为空', trigger: 'blur' }
          ],
          findContent: [
            { required: true, message: '识别内容/接口实例不能为空', trigger: 'blur' }
          ],
          opId: [
            { required: true, message: '操作类型id不能为空', trigger: 'blur' }
          ],
          opTarget: [
            { required: true, message: '操作目标或预期结果不能为空', trigger: 'blur' }
          ],
          circulation: [
            { required: true, message: '0默认 start开始 end 结束不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态：1 有效；0 失效不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型   1：web   2：接口  不能为空', trigger: 'blur' }
          ],
          orderNum: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.stepId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.stepId) {
            this.$http({
              url: this.$http.adornUrl(`/autotest/autostep/info/${this.dataForm.stepId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.projectId = data.autostep.projectId
                this.dataForm.findBy = data.autostep.findBy
                this.dataForm.findContent = data.autostep.findContent
                this.dataForm.opId = data.autostep.opId
                this.dataForm.opTarget = data.autostep.opTarget
                this.dataForm.circulation = data.autostep.circulation
                this.dataForm.createUser = data.autostep.createUser
                this.dataForm.status = data.autostep.status
                this.dataForm.type = data.autostep.type
                this.dataForm.orderNum = data.autostep.orderNum
                this.dataForm.createTime = data.autostep.createTime
                this.dataForm.remark = data.autostep.remark
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/autotest/autostep/${!this.dataForm.stepId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'stepId': this.dataForm.stepId || undefined,
                'projectId': this.dataForm.projectId,
                'findBy': this.dataForm.findBy,
                'findContent': this.dataForm.findContent,
                'opId': this.dataForm.opId,
                'opTarget': this.dataForm.opTarget,
                'circulation': this.dataForm.circulation,
                'createUser': this.dataForm.createUser,
                'status': this.dataForm.status,
                'type': this.dataForm.type,
                'orderNum': this.dataForm.orderNum,
                'createTime': this.dataForm.createTime,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
