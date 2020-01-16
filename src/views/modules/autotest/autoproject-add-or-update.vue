<template>
  <el-dialog
    :title="!dataForm.projectId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="上级" prop="parentId" v-if="showParentID">
      <el-input v-model="dataForm.parentId" placeholder="上级"   :disabled="true" ></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type" >
      <el-radio-group v-model="dataForm.type" @change="typeCharge">
        <el-radio :label="0" v-if="!showParentID">系统</el-radio>
        <el-radio :label="1" v-if="showParentID">模块</el-radio>
        <el-radio :label="2" v-if="showParentID">用列集</el-radio>
        <el-radio :label="3" v-if="showParentID">接口</el-radio>
      </el-radio-group>
     </el-form-item>
      <el-form-item label="方法名" prop="mname" v-if="showmname" >
        <el-input v-model="dataForm.mname" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注" type="textarea"></el-input>
    </el-form-item>
      <!--
         <el-form-item label="" prop="orderNum">
           <el-input v-model="dataForm.orderNum" placeholder=""></el-input>
         </el-form-item>-->
         </el-form>
         <span slot="footer" class="dialog-footer">
           <el-button @click="visible = false">取消</el-button>
           <el-button type="primary" :loading="isSubmit" @click="dataFormSubmit()">确定</el-button>
         </span>
       </el-dialog>
     </template>

     <script>
       export default {
         data () {
           return {
             visible: false,
             showmname: false,
             showParentID: false,
             isSubmit:false,
             dataForm: {
               projectId: 0,
               parentId: '',
               name: '',
               mname: '',
               type: '',
               pathCode: '',
               status: '',
               remark: '',
               createTime: '',
               createUser: '',
               orderNum: ''
             },
             dataRule: {
             //  parentId: [
             //    { required: true, message: '父菜单ID，一级菜单为0不能为空', trigger: 'blur' }
             //  ],
               name: [
                 { required: true, message: '不能为空', trigger: 'blur' }
               ],

               type: [
                 { required: true, message: '类型不能为空', trigger: 'blur' }
               ],
               mname: [
                 { required: true, message: '类型不能为空', trigger: 'blur' }
               ],
               status: [
                 { required: true, message: '状态不能为空', trigger: 'blur' }
               ]
             }
           }
         },
         methods: {
           init (id) {
             this.showmname= false
             this.dataForm.projectId = id || 0
             this.visible = true
             this.$nextTick(() => {

               this.$refs['dataForm'].resetFields()
               if (this.dataForm.projectId) {
                 this.$http({
                   url: this.$http.adornUrl(`/autotest/autoproject/info/${this.dataForm.projectId}`),
                   method: 'get',
                   params: this.$http.adornParams()
                 }).then(({data}) => {
                   if (data && data.code === 0) {
                     this.dataForm.parentId = data.autoProject.parentId
                     this.dataForm.name = data.autoProject.name
                     this.dataForm.mname = data.autoProject.mname
                     this.dataForm.type = data.autoProject.type
                     this.dataForm.pathCode = data.autoProject.pathCode
                     this.dataForm.status = data.autoProject.status
                     this.dataForm.remark = data.autoProject.remark
                     this.dataForm.createTime = data.autoProject.createTime
                     this.dataForm.createUser = data.autoProject.createUser
                     this.dataForm.orderNum = data.autoProject.orderNum
                   }
                 })
               }
             })
           },
           //
           typeCharge(){
             console.log("进来charge");
             this.showmname = this.dataForm.type==2?true:false
           },

           // 表单提交
           dataFormSubmit () {
             this.$refs['dataForm'].validate((valid) => {
               if (valid) {
                 this.isSubmit=true
                 //系统级别：设置parentId 值0
                 this.dataForm.parentId=this.showParentId?this.dataForm.parentId:0
                 this.$http({
                   url: this.$http.adornUrl(`/autotest/autoproject/${!this.dataForm.projectId ? 'save' : 'update'}`),
                   method: 'post',
                   data: this.$http.adornData({
                     'projectId': this.dataForm.projectId || undefined,
                     'parentId': this.dataForm.parentId,
                     'name': this.dataForm.name,
                     'mname': this.dataForm.mname,
                     'type': this.dataForm.type,
                     'pathCode': this.dataForm.pathCode,
                     'status': this.dataForm.status,
                     'remark': this.dataForm.remark,
                     'createTime': this.dataForm.createTime,
                     'createUser': this.dataForm.createUser,
                     'orderNum': this.dataForm.orderNum
                   })
                 }).then(({data}) => {
                   this.isSubmit=false
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
