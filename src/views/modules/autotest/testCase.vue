<template>
  <el-row class="row" style="padding: 0 0 0 0; " >
    <el-col class="col" :span="bMax?0:6" style="padding-right: 5px;">

      <el-row class="row" style="background-color: white;padding: 5px;border-radius: 5px;height: calc(100vh - 150px);overflow-y: auto;margin-top: 5px">

       <el-select v-model="projectId" placeholder="请选择" v-loading="projectListLoading" style="width: 80%" >
               <el-option v-for="item in options" :key="item.projectId" :label="item.name" :value="item.projectId"></el-option>
        </el-select>


        <el-dropdown   trigger="click">
         <div class="el-dropdown-link ">
            <el-button size="mini" type="primary"    >
              <i class="el-icon-plus" style="font-weight:900"></i>
            </el-button>
          </div>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item  @click.native="addOrUpdateHandle(0)" >新增项目</el-dropdown-item>
            <el-dropdown-item v-if="!projectId==''" @click.native="addOrUpdateHandle(projectId)">新增模块</el-dropdown-item>
            <el-dropdown-item v-if="!projectId==''" @click.native="addOrUpdateHandle(projectId)">新增模块</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
                  <list></list>
                </el-row>
              </el-col>
              <el-col :span="bMax?24:18" class="col" id="interfaceContent" style="height: calc(100vh - 130px);">
              <el-row class="row" v-if="true">
                <transition name="component-fade" mode="out-in">
                  <keep-alive>
                    <!--

                              <run  ref="run" :interface_edit="runInterfaceEdit" @wathtoggleMax="toggleMax" ></run>-->

                  </keep-alive>
                </transition>
              </el-row>
            </el-col>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

  </el-row>
          </template>

          <style>
            #searchInterface {
              padding-left: 5px;
              padding-right: 5px;
            }
            #interfaceContent .component-fade-enter-active, .component-fade-leave-active {
              transition: opacity .3s ease;
            }
            #interfaceContent .component-fade-enter, .component-fade-leave-to
              /* .component-fade-leave-active for below version 2.1.8 */ {
              opacity: 0;
            }
          </style>

          <script>

           import list from './component/caseSet.vue';
           import AddOrUpdate from './autoproject-add-or-update'
            export default {

                data: function () {

                  return {
                    bMax: false,
                    sortType:1,
                    addOrUpdateVisible: false,
                    projectListLoading:false,
                    options: [],
                    projectId: '',

                  }
                },
                components: {
                  "list":list,
                  AddOrUpdate
                },

               created () {
                console.log(this.options.length);

               },
              activated () {
                this.getDataList()
              },


                computed: {

                },

                methods: {
                  //获取项目列表
                  getDataList () {
                    this.projectListLoading = true
                    this.$http({
                      url: this.$http.adornUrl('/autotest/autoproject/projectList'),
                      method: 'get',
                      params: this.$http.adornParams({

                      })
                    }).then(({data}) => {
                      if (data && data.code === 0) {
                        this.options = data.projectList
                        //后台返回项目只有一个时默认选择
                        this.projectId=this.options.length==1?this.options[0].projectId:''
                        this.projectListLoading=!this.projectListLoading

                      }
                    })
                  },
                  // 新增修改项目
                  addOrUpdateHandle (id) {

                    this.addOrUpdateVisible = true
                    this.$nextTick(() => {
                      this.$refs.addOrUpdate.init(id)
                    })
                  },
                  //下拉菜单方法
                  projectCommand(command) {
                    console.log("进入common");
                    console.log(command);

                    this.$message('click on item ' + command);
                  },

                  toggleMax: function (data) {

                    this.bMax = !this.bMax

                  },

                },
              }
          </script>
