<template>
  <el-row class="row" style="padding: 0 0 0 0; " >
    <el-col class="col" :span="bMax?0:6" style="padding-right: 5px;">

      <el-row class="row" style="background-color: white;padding: 5px;border-radius: 5px; border:10px ; height: calc(100vh - 150px);overflow-y: auto;margin-top: 5px">

        <list></list>
      </el-row>
    </el-col>
    <el-col :span="bMax?24:18" class="col" id="interfaceContent" style="height: calc(100vh - 130px);">
    <el-row class="row" v-if="interfaceEdit">
      <transition name="component-fade" mode="out-in">
        <keep-alive>


          <run  ref="run" :interface_edit="runInterfaceEdit" @wathtoggleMax="toggleMax" ></run>

        </keep-alive>
      </transition>
    </el-row>
  </el-col>
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
 // var store=require("./store");
  //  var con=require("common/js/config");
  //  var sessionChange=require("common/mixins/session");
 import list from './component/caseList.vue'
 //import edit from './component/edit.vue'
 import ellc from '@/views/modules/iface/run/component/ellc.vue'
 //var store=require("../../../../store")._modulesNamespaceMap["project/info/interface/run/"].context;
 //  var edit=require("./component/edit.vue");
  //  var preview=require("./component/preview.vue");
 import run from './component/caseConcent.vue'

 // import $ from '@/views/common/js/common.js'
   export default {

      data: function () {

        return {
          bMax: false,
          sortType:1,
          project_id:1,
      }
      },
      components: {
        "list":list,
         // "edit":edit,

        /*  "preview":preview,*/
        "run":run
      },
     //store:store,
      /*watch:{
            sortType:function (val) {
                session.set("sort",val);
                $.startHud("#body");
                this.$store.dispatch("refresh").then(function (data) {
                    $.stopHud();
                    if(data.code!=200)
                    {
                        $.notify(data.msg,0);
                    }
                })
            }
        },*/
     created () {
      // this.$store.dispatch("interf/getAllInterface",{data:this.data1})

      console.log("project_id:"+this.$cookie.get('interface_id'));
       this.$store.dispatch("interf/getCaseMenu",this.$cookie.get('interface_id'));
       var _this=this;

     },



      computed: {
        runInterfaceEdit: function () {
          var obj = $.clone(this.interfaceEdit);
          console.log("obj:");
          console.log(obj);
          return obj;
        },
        interfaceEditRole: function () {
          return 1
        },
        searchText:{
          get:function () {
            return this.$store.state.interf.searchText;
          },
          set:function (val) {
            this.$store.commit('interf/setSearchText', val)
          }
        },
        searchType: {
          get: function () {
            return this.$store.state.interf.searchType;
          },
          set: function (val) {
          this.$store.commit('interf/setSearchType', val)
          }
        },
        interfaceEdit: function () {
          return this.$store.state.interf.interfaceEdit

        },
        interfaceList: function () {
          return store.state.interfaceList
        },
      },
      methods: {

        init1:  function (data,list) {
        var arr=[];


   for(var i=0;i<data.length;i++)
   {
     data[i].menu=0;

     if(data[i].data)
     {
       if(list && list[i] && list[i]._id==data[i]._id)
       {
         data[i].show=list[i].show;
       }
       else
       {
         data[i].show=0;
       }
       data[i].data=this.init1(data[i].data,(list && list[i])?list[i].data:null)
     }
     else
     {
       data[i].select=0;
     }
     arr.push(data[i]);
   }

   return arr;
 },
       addGroup:function () {
         var _this=this;



         $.input("请输入分组名称",function (val) {
           if(!val.value)
           {
             $.tip("请输入分组名称",0);
             return false
           }
           var query={};


           query.type='1';
           query.parentId=0;

           query.name=val.value;
           _this.$store.dispatch("interf/addGroup",{
             query:query,
             //group:item
           }).then(function (data) {
             if(1==1)
             {console.log(22222222)
             }
             else
             {
             }
           })
         });
       },
        methodColor: function (val) {
        /*  return helper.default.methodColor(val);*/
        },
        searchInterface: function () {
         this.$store.commit('interf/searchInterface', val)

        },
        cancelSearch: function () {
          /*store.commit("setSearch", false);
          store.commit("setSearchText", "");
          store.commit("setSearchType", 0);
          store.commit("setInterfaceSearchList", []);*/
        },
        importGroup: function () {
         /* $.inputMul(this, "请输入DOClever导出分组的JSON", function (val) {
            if (!val) {
              $.tip("请输入JSON", 0);
              return false;
            }
            $.startHud();
            net.post("/group/importjson", {
              id: session.get("projectId"),
              json: val
            }).then(function (data) {
              $.stopHud();
              if (data.code == 200) {
                $.notify("导入成功", 1);
                store.commit("initInterfaceList", data.data);
              }
              else {
                $.notify(data.msg, 0);
              }
            })
            return true;
          })*/
        },
        initStatus: function (data) {
          /*store.commit("setStatus", data);*/
        },
        toggleMax: function (data) {

          this.bMax = !this.bMax

        },
        quickTest: function (command) {
         /* var _this = this;
          if (command == 1) {
            $.startHud();
            net.get("/test/allgrouplist").then(function (data) {
              $.stopHud();
              if (data.code != 200) {
                $.notify(data.msg, 0);
              }
              /!*$.showBox(_this,require("./test/test.vue"),{
                            testType:1,
                            propTestGroupList:data.data,
                        });*!/
            })
          }
          else if (command == 2) {
            $.startHud();
            net.get("/test/alllist").then(function (data) {
              $.stopHud();
              if (data.code != 200) {
                $.notify(data.msg, 0);
              }
              /!* $.showBox(_this,require("./test/test.vue"),{
                            testType:2,
                            propArrTest:data.data
                        });*!/
            })
          }*/
        }
      },
    }
</script>
