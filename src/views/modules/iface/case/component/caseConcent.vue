<template>
    <el-row class="row" id="run">


      <el-row class="row" style="height: 35px;line-height: 35px">
            <el-button type="primary" size="mini" style="float: right;margin-top: 4px;margin-right: 5px;margin-left: 0px" title="运行" id="run1" :loading="runPending" @click="runcase">
                运行
            </el-button>

        <el-button type="primary" size="mini" style="float: right;margin-top: 4px;margin-right: 5px;margin-left: 0px" title="保存" id="save" :loading="runSave" @click="save"  >
          保存
        </el-button>
        <el-button type="primary" size="mini" style="float: right;margin-top: 4px;margin-right: 5px;margin-left: 0px" title="另存为" id="saveas" :loading="runasPending" @click="saveAs">
          另存为
        </el-button>
            <el-button size="mini" type="text" icon="fa fa-arrows-alt" style="margin-left: 5px;font-size: 15px" title="放大/缩小" @click="maxorsmall"></el-button>
<!--
            <el-button size="mini" type="text" icon="fa fa-bolt" style="margin-left: 5px;font-size: 15px" title="加入用例" @click="joinTest"></el-button>
-->
        </el-row>
          <el-row class="row" style="margin-top: 5px;overflow-y: auto;height: calc(100vh - 170px);padding-bottom: 10px;border-radius: 5px;font-size: 14px;background-color: white">
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
              <el-input size="small" style="width: 50%" placeholder="请填入用例名称" v-model="interface.caseName">
                  <template slot="prepend">用例名称</template>
               </el-input>
             <el-col class="col" :span="12">
                  <el-cascader expand-trigger="hover" :options="arrGroup" change-on-select :show-all-levels="false" style="width: 90%;text-align: center" v-model="group" size="small"></el-cascader>
              </el-col>
            </el-row>
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
                <el-col class="col" :span="5">

<!--                  <el-select size="small" v-model="interface_edit.infMethod" @input="changeMethod" id="method" style="width: 90%" :readonly="true">

                      <el-option  value="GET" label="GET"></el-option>
                        <el-option  value="POST" label="POST"></el-option>
                        <el-option  value="PUT" label="PUT"></el-option>
                        <el-option  value="DELETE" label="DELETE"></el-option>
                        <el-option  value="PATCH" label="PATCH"></el-option>
                    </el-select>
                -->
              <el-input size="small" style="width: 90%"  v-model="interface_edit.infMethod"  :readonly="true"></el-input>
                </el-col>
              <el-col class="col" :span="12">
                <el-input size="small" style="width: 100%" placeholder="域名或ip地址加端口" v-model="interface_edit.baseurl"></el-input>

                </el-col>
           <!--     <el-col class="col" :span="11">
                    <el-input size="small" style="width: 100%" placeholder="请填入你请求的路由地址" v-model="interface_edit.infUrl" ></el-input>
                </el-col>-->
            </el-row>
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
              <el-input size="small" style="width: 100%" placeholder="请填入你请求的路由地址" v-model="interface_edit.infUrl" ></el-input>
            </el-row>
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
              <el-input size="small" style="width: 100%" placeholder="请输入url参数" v-model="interface_edit.urlParam">
                <template slot="prepend">url参数</template>
              </el-input>

            </el-row>
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
              <el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 20px"  @click="checkjson(2)">格式化检查json</el-button>
              <el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 20px"  @click="rowjson()">压缩json</el-button>
              <el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 20px"  @click="jsonView=!jsonView">{{showJson}}</el-button>

            </el-row>
            <el-row class="row" style="padding-left: 10px;padding-right: 10px;padding-top: 10px">
            <el-collapse-transition>
              <div v-show="jsonView">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 200}"  v-model="interface.caseBody"placeholder="请填入json"></el-input>
              </div>
            </el-collapse-transition>
            </el-row>


<!--            <expand ref="inject">
              <div slot="title">Inject</div>
              <runinject item="item"></runinject>
            </expand>-->
            <!--<el-tabs style="margin-top: 20px" v-model="tabIndex" id="mainRun">
                <template v-for="(item, index) in param">
                    <el-tab-pane :key="item.id"  :label="item.name" :name="index">
                        <span slot="label">
                            <el-tooltip class="item" effect="dark" placement="bottom" :content="item.remark" v-if="item.remark">
                                <span>{{item.name}}</span>
                            </el-tooltip>
                            <span v-else>{{item.name}}</span>
                        </span>
                        <runparam :index="index" :item="item" ref="runParam"></runparam>
                    </el-tab-pane>
                </template>
            </el-tabs>-->

            <el-row class="row" style="height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 10px;width: calc(100% - 20px)"></el-row>
            <el-row class="row">

              <template >
                  <el-row class="row" style="padding: 10px 10px 0px 10px;" key="real">

                    <span>
                        Result:&nbsp;&nbsp;<span :style="{color:responseCode.match(/^2/)?'green':'red'}">{{responseCode=='0'?'ERROR':responseCode}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #50a3ff">{{second?("耗时"+second+"秒"):""}}</span>
                    </span>

                  <el-row class="row"  key="example">
                    <el-tabs type="border-card" stretch id="result" style="background-color: white;padding: 0px;margin-top: 15px;border-radius: 5px;">
                      <el-tab-pane label="格式化响应" style="overflow-y:auto" v-if="isJson==true">
                        <el-row class="row" style="word-break: break-all"  v-if="resbody!=''&&isJson==true">
                          <json-viewer style="overflow-y:auto"
                            :value="resbody"
                            :expand-depth=4
                            ></json-viewer>
                        </el-row>

                      </el-tab-pane>

                      <el-tab-pane label="行响应">
                        <el-row class="row" style="word-break: break-all" v-if="resbody">
                          {{resbody}}
                        </el-row>
                      </el-tab-pane>

                      <el-tab-pane label="请求内容">
                        <table class="table-hover" style="width: 100%;table-layout: fixed " v-if="requrl" >
                          <tbody>
                            <tr style="vertical-align: middle;height: 30px">
                              <td style="width: 30%">
                                url:
                              </td>
                              <td style="width: 70%;word-wrap:break-word">
                                {{requrl}}
                              </td>
                            </tr>
                            <tr style="vertical-align: middle;height: 30px">
                              <td style="width: 30%">
                                method:
                              </td>
                              <td style="width: 70%;word-wrap:break-word">
                                {{reqmethod}}
                              </td>
                            </tr>
                            <tr style="vertical-align: middle;height: 30px">
                              <td style="width: 30%">
                                body:
                              </td>
                              <td style="width: 70%;word-wrap:break-word">
                                {{reqbody}}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </el-tab-pane>

                      <el-tab-pane label="请求头">
                        <table class="table-hover" style="width: 100%;table-layout: fixed">
                          <tbody>
                          <template v-for="(item,key) in reqHeader">
                            <tr style="vertical-align: middle;height: 30px">
                              <td style="width: 30%">
                                {{item.name}}
                              </td>
                              <td style="width: 70%;word-wrap:break-word">
                                {{item.value}}
                              </td>
                            </tr>
                          </template>
                          </tbody>
                        </table>
                      </el-tab-pane>
                      <el-tab-pane label="响应头">
                        <table class="table-hover" style="width: 100%;">
                          <tbody>
                          <template v-for="(item,key) in resHeader">
                            <tr style="vertical-align: middle;height: 30px">
                              <td style="width: 30%">
                                {{item.name}}
                              </td>
                              <td style="width: 70%;word-wrap:break-word">
                                {{item.value}}
                              </td>
                            </tr>
                          </template>
                          </tbody>
                        </table>
                      </el-tab-pane>
                      </el-tabs>
                    </el-row>

                </el-row>

              </template>

            </el-row>
        </el-row>
    </el-row>
</template>

<style>

</style>

<script>
   // var runParam=require("./component/runParam.vue");
   // var store=require("../../../../store")._modulesNamespaceMap["project/info/interface/run/"].context;
    var sessionChange=require("@/views/common/mixins/session");
   import expand from '@/views/component/expand.vue';
   import runInject from './runInject.vue'

   import { jsonTosting,isURL }from '@/utils/validate'

   export default {
      props:["interface_edit"],

      data:function () {

          return {
            runPending: false,
            runSave: false,
            runasPending: false,
            tabType: "query",
            jsonView: true,
            showDialog: false,
            jsonBody: "",
            /*interface: {
              name: "",
              baseurl: "",
              url: "",
              urlparam: "",
              method: "",
              body: {type: "", content: ""},
              Relation: [{name: "", expression: "", num: "", default_value: ""}],
              inject: [1, 2],

            },*/
            responseCode: "",
            second: "",
            selParam: "",
            resHeader: [],
            reqHeader: [],
            requrl: "",
            reqbody: "",
            reqmethod: "",
            resbody: "",
            isJson:false,//判断响应的内容是不是json
          }
        },
        mixins:[sessionChange],
        //store:store,
        components:{
          "runInject":runInject,
          "expand":expand

        },
        computed:{

          interface:function () {
            return this.$store.state.interf.caseInfo
          },
          showJson :function () {
            return  this.jsonView?"隐藏":"显示"
          },
          group:{
            get:function () {
             var val=this.interface.parentId;
              console.log("val:");
              console.log(val);

              var arr=this.arrGroup;
              var ret=[];
              (function _map(arr) {
                for(var i=0;i<arr.length;i++)
                {
                  var obj=arr[i];

                  ret.push(obj.value);
                  if(obj.value==val)
                  {
                    return true;
                  }
                  else if(obj.children)
                  {
                    //var v=arguments.callee(obj.children);
                    var v=_map(obj.children);
                    if(v)
                    {
                      return true;
                    }
                    else
                    {
                      ret.pop();
                    }
                  }
                  else
                  {console.log("else")
                    ret.pop();
                  }
                }
                return false;
              })(arr)

              return ret;
            },
            set:function (val) {
              this.interface.parentId=val[val.length-1];
            }
          },
          arrGroup:function () {

            var arr=this.$store.state.interf.interfaceCaseList;
            console.log("arrwwww:");
            console.log(this.$store.state.interf.interfaceCaseList);

            var arrGroup=[];
            (function _map(arr,arrGroup) {
              for(var i=0;i<arr.length;i++)
              {
                var obj=arr[i];
                if(obj.interfaceList)
                {
                  var obj1={
                    value:obj.menuId,
                    label:obj.name,
                  };
                  if(obj.interfaceList.length>0)
                  {
                    obj1.children=[];
                    //arguments.callee(obj.interfaceList,obj1.children);
                    _map(obj.interfaceList,obj1.children);

                    if(obj1.children.length==0)
                    {
                      delete obj1.children
                    }
                  }
                  arrGroup.push(obj1);
                }
              }
            })(arr,arrGroup);
            console.log("arrGroup:");

            console.log(arrGroup);
            return arrGroup;
          },

        },
        methods:{
         //初始化结果
          initresult (){
            this.responseCode="",
              this.second="",
              this.selParam="",
              this.resHeader= [],
              this.reqHeader= [],
              this.requrl="",
              this.reqbody="",
              this.reqmethod= "",
              this.resbody= "",
              this.isJson=false

          },
        //隐藏显示左边菜单
          maxorsmall: function () {
            this.$emit('wathtoggleMax');
          },
          checkjson (num) {

            if(!this.interface.caseBody || this.interface.caseBody==="")
            {
              this.$message.error("请输入JSON");
              return false
            }
            try
            {
              var jsonb=JSON.parse(this.interface.caseBody);
              var   jsons= jsonTosting(jsonb,num);
              // console.log(JSON.stringify(jsonb,null,0));
             // document.getElementById('out_pre').innerText=jsons;
              if(num!=0){
              this.interface.caseBody=jsons;
              }else{
                this.jsonBody=jsons;
              }
              return true;
              //将字符串转换成json对象
              //var t=JSON.stringify(obj, null, 2);
              //console.log(t);
            }
            catch (err)
            {

                console.log(err);
                this.$message.error("JSON不符合格式");


            }

          },
          rowjson () {

            if(!this.interface.caseBody || this.interface.caseBody==="")
            {
              this.$message.error("请输入JSON");
              return false
            }
            try
            {
              var jsonb=JSON.parse(this.interface.caseBody);
              var   jsons= jsonTosting(jsonb,0);
              this.interface.caseBody=jsons;
              return true;
            }
            catch (err)
            {

              console.log(err);
              this.$message.error("JSON不符合格式");


            }

          },
          showAutoComplete  () {
          },
          save(){
            if(!this.interface.caseName)
            {
              $.tip("请填入用例名称",0);
              return;
            }
            else if(!this.interface_edit.infUrl)
            {
              $.tip("请填入接口地址",0);
              return;
            }

            this.runSave= true;
            console.log("save");
            this.$http({
              url: this.$http.adornUrl(`/iface/case/${!this.interface.caseId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData(this.interface)
            }).then(({data}) => {
              this.$store.dispatch("interf/updateCaseList",data);
              this.runSave=false;

              if (data && data.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    //this.$emit('refreshDataList')
                  }
                })
        }else {
                this.$message.error(data.msg)
              }
            })
          },
          saveAs (){

          },
          runcase () {
            this.initresult();
            //判断json是否符合格式
           if(!this.checkjson(0))
           {
             return;
           }
           //去掉baseurl最后一位的"/"
           if(this.interface_edit.baseurl.endsWith("/")&&this.interface_edit.infUrl.startsWith("/"))
           {
           this.interface_edit.baseurl=this.interface_edit.baseurl.substring(0,this.interface_edit.baseurl.length-1);
            }
            //增加url第一位的"/"
            if(!this.interface_edit.infUrl.startsWith("/"))
            {
              this.interface_edit.infUrl="/"+this.interface_edit.infUrl;
            }

            if(!isURL(this.interface_edit.baseurl+this.interface_edit.infUrl))
            {    this.$message.error("url不符合格式");
                 return;
            }
            this.runPending=true;
            this.$http({
              url: this.$http.adornUrl(`/iface/caseexe/run`),
              method: 'post',
              data: this.$http.adornData({
                'method': this.interface_edit.infMethod ,
                'url': this.interface_edit.baseurl+this.interface_edit.infUrl,
                'head':this.interface_edit.head,
                'body':  this.jsonBody,
                'urlParam':this.interface_edit.urlParam,
                })
            }).then(({data}) => {
              this.runPending=false;
              if (data && data.code === 0) {
                this.responseCode=data.res_data.responseCode.toString();
                !data.res_data.responseHeaders?this.resHeader="":this.resHeader=data.res_data.responseHeaders;
                this.reqHeader=data.res_data.requestHeaders;
                this.requrl=data.res_data.url;
                this.reqbody=data.res_data.body;
                this.reqmethod=data.res_data.method;

                try
                {
                  this.resbody=JSON.parse(data.res_data.responseContent);
                  this.isJson=true;
                }
                catch (err)
                {
                  this.resbody=data.res_data.responseContent;

                  this.isJson=false;



                }

                console.log(data.res_data.requestHeaders);

                console.log(this.reqHeader);
                this.selParam=data.res_data;
                console.log(this.selParam);

                this.$message({
                  message: '发送请求完成',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    //this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        },
        created:function () {


          this.interface_edit.head.pop();
        /*  this.interface_edit.baseurl='http://10.10.20.212:8982/';
          this.interface_edit.urlParam='';
*/

          /*          console.log("result:");
                    var result = JSON.stringify(JSON.parse("{ \"name\": \"Brett\", \"address\":\"北京路23号\", \"email\": \"123456@qq.com\" }"), null, 2);
                    console.log(result);*/
          /*store.dispatch("initData",$.clone(this.interfaceEdit));
          store.commit("setIndex",this.index);
          if(session.get("exampleId"))
          {
              this.curParam.selExample.value=session.get("exampleId");
              store.dispatch("changeExample",session.get("exampleId"));
              session.remove("exampleId");
          }*/
        },
    }
</script>
