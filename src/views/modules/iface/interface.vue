<template>
  <el-row class="row" style="padding: 0 10px 0 10px;">
    <el-col class="col" :span="bMax?0:6" style="padding-right: 5px;">
      <el-row class="row" style="height: 35px;line-height: 35px">
        <el-tooltip class="item" effect="dark" content="新增分组" placement="bottom">
          <el-button size="mini" type="primary" @click.native="addGroup" v-if="interfaceEditRole">
            <i class="el-icon-plus" style="font-weight:900"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导入分组" placement="bottom" v-if="interfaceEditRole">
          <el-button size="mini" type="primary" style="margin-left: 3px" @click.native="importGroup">
            <i class="el-icon-download" style="font-weight:900"></i>
          </el-button>
        </el-tooltip>
        <el-dropdown trigger="hover" @command="quickTest">
          <div class="el-dropdown-link">
            <el-button size="mini" type="primary" icon="fa fa-bolt" plain>
            </el-button>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="1">新用例</el-dropdown-item>
            <el-dropdown-item :command="2">已有用例</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover">
          <div class="el-dropdown-link">
            <el-button size="mini" icon="fa fa-sort-amount-desc">
            </el-button>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="sortType=0"><i class="el-icon-check" style="color: #11b95c" v-if="sortType==0"></i>&nbsp;名称</div></el-dropdown-item>
            <el-dropdown-item><div @click="sortType=1"><i class="el-icon-check" style="color: #11b95c" v-if="sortType==1"></i>&nbsp;修改时间</div></el-dropdown-item>
            <el-dropdown-item><el-tooltip class="item" effect="dark" content="自定义排序下可以拖动接口或分组来排序" placement="right"><div @click="sortType=2"><i class="el-icon-check" style="color: #11b95c" v-if="sortType==2"></i>&nbsp;自定义</div></el-tooltip></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row class="row" style="background-color: white;padding: 5px;border-radius: 5px;height: calc(100vh - 150px);overflow-y: auto;margin-top: 5px">
        <el-input size="small" placeholder="请输入查找的接口" style="width: 100%;margin-bottom: 10px" v-model="searchText" @input="searchInterface">
          <template slot="prepend">
            <el-select v-model="searchType" @input="searchInterface" style="width: 60px" id="searchInterface">
              <el-option :value="0" label="名称"></el-option>
              <el-option :value="1" label="路径"></el-option>
            </el-select>
          </template>
        </el-input>
        <list></list>
      </el-row>
    </el-col>
    <el-col :span="bMax?24:18" class="col" id="interfaceContent" style="height: calc(100vh - 110px);">
    <el-row class="row" v-if="interfaceEdit">
      <transition name="component-fade" mode="out-in">
        <keep-alive>
          <edit v-if="$store.state.interf.type=='edit'" ref="edit" @wathtoggleMax="toggleMax"></edit>
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
 import list from './component/interfaceList.vue'
 import edit from './component/edit.vue'
 import ellc from '@/views/modules/iface/run/component/ellc.vue'

 //  var edit=require("./component/edit.vue");
  //  var preview=require("./component/preview.vue");
//    var run=require("./run/run.vue")
// import $ from '@/views/common/js/common.js'
   export default {

      data: function () {

        return {
          bMax: false,
          sortType:1,
          project_id:1,
           data1:{"data":[{"type":1,"sort":0,"_id":"5b8cac102235f12be214aef5","name":"#回收站","project":"5b8cac102235f12be214aef3","id":"70337d70-af2a-11e8-89b0-415bd955ebb3","createdAt":"2018-09-03T03:35:44.072Z","updatedAt":"2018-09-03T03:35:44.072Z","__v":0,"data":[{"finish":1,"_id":"5b9782a1fa08107daa8be6b9","name":"登录11122","group":"5b8cac102235f12be214aef5","url":"gateway/login","method":"POST","id":"35f9fa90-b5a0-11e8-9a9c-996ec80ff77b"},{"finish":1,"_id":"5b978032fa08107daa8be652","name":"登录测试","group":"5b8cac102235f12be214aef5","url":"gateway/wjc/jidiide","method":"POST","id":"c22cdb60-b59e-11e8-9a9c-996ec80ff77b"}]},{"type":0,"sort":0,"_id":"5bc44f4bfa08107daa8d9425","name":"21","project":"5b8cac102235f12be214aef3","id":"10f397f0-d054-11e8-9a9c-996ec80ff77b","createdAt":"2018-10-15T08:26:51.504Z","updatedAt":"2018-10-15T08:26:51.504Z","__v":0,"data":[]},{"type":0,"sort":0,"_id":"5bc97510fa08107daa8de704","name":"wjc","project":"5b8cac102235f12be214aef3","id":"84cc0180-d365-11e8-9a9c-996ec80ff77b","createdAt":"2018-10-19T06:09:20.793Z","updatedAt":"2018-10-19T06:09:20.793Z","__v":0,"data":[{"type":0,"sort":0,"_id":"5bcd968cfa08107daa8e0cad","name":"443","project":"5b8cac102235f12be214aef3","id":"d3f39430-d5db-11e8-9a9c-996ec80ff77b","parent":"84cc0180-d365-11e8-9a9c-996ec80ff77b","createdAt":"2018-10-22T09:21:16.540Z","updatedAt":"2018-10-22T09:21:16.540Z","__v":0,"data":[{"type":0,"sort":0,"_id":"5bcd969cfa08107daa8e0cb1","name":"432","project":"5b8cac102235f12be214aef3","id":"dd668e00-d5db-11e8-9a9c-996ec80ff77b","parent":"d3f39430-d5db-11e8-9a9c-996ec80ff77b","createdAt":"2018-10-22T09:21:32.385Z","updatedAt":"2018-10-22T09:21:32.385Z","__v":0,"data":[]}]}]},{"type":0,"sort":0,"_id":"5b978215fa08107daa8be6ab","name":"喂喂喂","project":"5b8cac102235f12be214aef3","id":"e255ee30-b59f-11e8-9a9c-996ec80ff77b","createdAt":"2018-09-11T08:51:33.652Z","updatedAt":"2018-09-11T08:51:33.652Z","__v":0,"data":[{"type":0,"sort":0,"_id":"5bcd927dfa08107daa8e0c35","name":"我问问","project":"5b8cac102235f12be214aef3","id":"68766810-d5d9-11e8-9a9c-996ec80ff77b","parent":"e255ee30-b59f-11e8-9a9c-996ec80ff77b","createdAt":"2018-10-22T09:03:57.202Z","updatedAt":"2018-10-22T09:03:57.202Z","__v":0,"data":[{"type":0,"sort":0,"_id":"5bcd971afa08107daa8e0cca","name":"2342","project":"5b8cac102235f12be214aef3","id":"2876b5f0-d5dc-11e8-9a9c-996ec80ff77b","parent":"68766810-d5d9-11e8-9a9c-996ec80ff77b","createdAt":"2018-10-22T09:23:38.320Z","updatedAt":"2018-10-22T09:23:38.320Z","__v":0,"data":[{"finish":0,"_id":"5bce7c57fa08107daa8e130d","name":"3层","group":"5bcd971afa08107daa8e0cca","url":"gateway/wjc/jidiide","method":"POST","id":"cb87fa00-d664-11e8-9a9c-996ec80ff77b"}]},{"finish":0,"_id":"5bcd9289fa08107daa8e0c36","name":"二层","group":"5bcd927dfa08107daa8e0c35","url":"gateway/wjc/jidiide","method":"POST","id":"6faf9e80-d5d9-11e8-9a9c-996ec80ff77b"}]},{"finish":0,"_id":"5bcd4287fa08107daa8e034f","name":"一层","group":"5b978215fa08107daa8be6ab","url":"gateway/wjc/jidiide","method":"POST","id":"bf75ae30-d5a9-11e8-9a9c-996ec80ff77b"}]}],"baseUrl":[]},
      }
      },
      components: {
        "list":list,
          "edit":edit,
        "ellc":ellc,

        /*  "preview":preview,*/
       //  "run":run
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
       this.$store.dispatch("interf/getInterfaceMenu",this.project_id)
       var _this=this;
     },



      computed: {
        runInterfaceEdit: function () {
          var obj = $.clone(this.interfaceEdit);
          obj.param = $.clone(this.$store.state.param);
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
         // return store.state.interfaceEdit
          return 1

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
