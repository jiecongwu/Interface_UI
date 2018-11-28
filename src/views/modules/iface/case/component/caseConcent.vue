<template>
    <el-row class="row" id="run">


      <el-row class="row" style="height: 35px;line-height: 35px">
            <el-button type="primary" size="mini" style="float: right;margin-top: 4px;margin-right: 5px;margin-left: 0px" title="运行" id="run1" :loading="runPending" @click="runcase">
                运行
            </el-button>


            <el-button size="mini" type="text" icon="fa fa-arrows-alt" style="margin-left: 5px;font-size: 15px" title="放大/缩小"></el-button>
<!--
            <el-button size="mini" type="text" icon="fa fa-bolt" style="margin-left: 5px;font-size: 15px" title="加入用例" @click="joinTest"></el-button>
-->
        </el-row>
          <el-row class="row" style="margin-top: 5px;overflow-y: auto;height: calc(100vh - 150px);padding-bottom: 80px;border-radius: 5px;font-size: 14px;background-color: white">
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
              <el-input size="small" style="width: 100%" placeholder="请填入接口名称" v-model="interface.name">
                  <template slot="prepend">接口名称</template>
               </el-input>

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
              <el-col class="col" :span="8">
                <el-input size="small" style="width: 95%" placeholder="域名或ip地址加端口" v-model="interface.baseurl"></el-input>

                </el-col>
                <el-col class="col" :span="11">
                    <el-input size="small" style="width: 100%" placeholder="请填入你请求的路由地址" v-model="interface_edit.infUrl" ></el-input>
                </el-col>
            </el-row>
            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
              <el-input size="small" style="width: 100%" placeholder="请输入url参数" v-model="interface.urlparam">
                <template slot="prepend">url参数</template>
              </el-input>

            </el-row>
            <expand ref="body">
              <div slot="title">body：</div>

            <el-row class="row" style="padding: 0 0 0 20px;" >
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 200}"  v-model="interface.body.content"placeholder="请填入json"></el-input>
              <el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 20px"  @click="checkjson(2)">格式化检查json</el-button>

            </el-row>
            <el-row class="row" style="padding: 0 0 0 0px;" >
              <pre id="out_pre">eeeeee</pre>
            </el-row>
            </expand>
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

   import { jsonTosting } from '@/utils/validate'

   export default {
      props:["interface_edit"],

      data:function () {

          return {
                runPending:false,
                tabType:"query",
                showDialog:false,
                jsonBody:"",
                interface:{
                             name:"",
                             baseurl:"",
                             url:"",
                             urlparam:"",
                             method:"",
                             body:{type:"",content:""},
                             Relation:[{name:"",expression:"",num:"",default_value:""}],
                             inject:[1,2],

                }
            }
        },
        mixins:[sessionChange],
        //store:store,
        components:{
          "runInject":runInject,
          "expand":expand

        },
        computed:{

        },
        methods:{
          checkjson (num) {

            if(!this.interface.body.content || this.interface.body.content==="")
            {
              this.$message.error("请输入JSON");
              return
            }
            try
            {
              var jsonb=JSON.parse(this.interface.body.content);
              var   jsons= jsonTosting(jsonb,num);
              // console.log(JSON.stringify(jsonb,null,0));
              document.getElementById('out_pre').innerText=jsons;
              if(num!=0){
              this.interface.body.content=jsons;
              }else{
                this.jsonBody=jsons;
              }
              //将字符串转换成json对象
              //var t=JSON.stringify(obj, null, 2);
              //console.log(t);
            }
            catch (err)
            {


                this.$message.error("JSON不符合格式");


            }

          },
          showAutoComplete  () {
          },
          runcase () {
            this.checkjson(0);

            this.$http({
              url: this.$http.adornUrl(`/iface/caseexe/run`),
              method: 'post',
              data: this.$http.adornData({
                'method': this.interface_edit.infMethod ,
                'url': this.interface.baseurl+this.interface_edit.infUrl,
                'head':this.interface_edit.head,
                'body':  this.jsonBody,
                })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
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
