/**
 * Created by wjc on 2018/10/14
 */
//var run=require("./run/store");
//var test=require("./test/store");
//var uuid=require("uuid");
//var http =require.resolve("@/utils/httpRequest.js")
import http from '@/utils/httpRequest'
export default {
  namespaced: true,
  modules:{

  },
  state:{
    autoSave:false,
    newInterfaceStr:"",
    interfaceList:[],
    interfaceCaseList:[],
    interfaceSearchList:[],
    interface:null,
    case:null,
    interfaceEdit:null,
    uuid:'22121333',
    caseInfo:{"afterCaseId":"",
               "beforeCaseId":"",
               "caseBody":"",
               "caseId":"",
               "caseName":"",
               "parentId":""},
    param:[
      {
        name:"",
        remark:"",
        id:"",
        query:[{
          name:"",
          must:0,
          remark:""
        }],
        header:[{
          name:"",
          value:"",
          remark:""
        }],
        body:[{
          name:"",
          type:0,
          must:0,
          remark:"",
        }],
        param:[

        ],
        bodyInfo:{
          type:0,
          rawType:0,
          rawTextRemark:"",
          rawFileRemark:"",
          rawText:"",
          rawJSON:[],
          rawJSONType:0
        },
        rawJSONObject:[{
          name:"",
          must:1,
          type:0,
          remark:"",
          show:1,
          mock:"",
          drag:1
        }],
        rawJSONArray:[{
          name:null,
          must:1,
          type:0,
          remark:"",
          show:1,
          mock:"",
          drag:1
        }],
        outInfo:{
          type:0,
          rawRemark:"",
          rawMock:"",
          jsonType:0
        },
        result:[],
        resultObject:[
          {
            name:"",
            must:0,
            type:0,
            remark:"",
            show:0,
            mock:"",
            drag:1
          }
        ],
        resultArray:[
          {
            name:null,
            must:0,
            type:0,
            remark:"",
            show:0,
            mock:"",
            drag:1
          }
        ],
        before:{
          mode:0,
          code:""
        },
        after:{
          mode:0,
          code:""
        }
      }
    ],
    index:0,
    preview:"",
    drawMix:[],
    objCopy:null,
    searchText:"",
    searchType:0,
    status:[],
    type:"",
    example:{}
  },
  getters:{
    template:function (state,getters,rootState) {
     // return rootState.project.info.template;
      return 1;

    },
    objCopyJSON:function (state,getters,rootState) {
      //return rootState.objCopyJSON;
      return 2;

    },
    bodyInfo:function (state,getters) {
      return state.param[state.index].bodyInfo;
    },
    outInfo:function (state,getters) {
      return state.param[state.index].outInfo;
    },
 /*   event:function (state,getters,rootState) {
      return rootState.event;
    },*/
    querySave:function (state,getters) {
      return state.param[state.index].query.filter(function (obj) {
        if(obj.name)
        {
          return true
        }
        else
        {
          return false
        }
      })
    },
    headerSave:function (state,getters) {
      return state.param[state.index].header.filter(function (obj) {
        if(obj.name)
        {
          return true
        }
        else
        {
          return false
        }
      });
    },
    bodySave:function (state,getters) {
      return state.param[state.index].body.filter(function (obj) {
        if(obj.name)
        {
          return true
        }
        else
        {
          return false
        }
      })
    },
    queryCount:function (state,getters) {
      return getters.querySave.length
    },
    headerCount:function (state,getters) {
      return getters.headerSave.length
    },
    bodyCount:function (state,getters) {
      return getters.bodySave.length
    },
    paramCount:function (state,getters) {
      return state.param[state.index].param.length;
    },
    curParam:function (state,getters) {
      return state.param[state.index];
    },
    rawMock:function (state,getters) {
      var bJSON=false,obj={};
      if(getters.curParam.bodyInfo.type==1 && getters.curParam.bodyInfo.rawType==2 && getters.curParam.bodyInfo.rawJSON)
      {
        obj=getters.curParam.bodyInfo.rawJSONType==0?{}:[];
        bJSON=true;
        var result=helper.default.resultSave(getters.curParam.bodyInfo.rawJSON);
        helper.default.convertToJSON(result,obj);
      }
      var info=helper.default.handleMockInfo(0,getters.curParam.param,getters.curParam.query,getters.curParam.header,bJSON?obj:getters.curParam.body,state);
      return helper.default.mock(getters.curParam.outInfo.rawMock,info);
    },
    rawJSON:function (state,getters) {
      var obj=getters.curParam.bodyInfo.rawJSONType==0?{}:[];
      var result=helper.default.resultSave(getters.curParam.bodyInfo.rawJSON);
      helper.default.convertToJSON(result,obj);
      return helper.default.format(JSON.stringify(obj),1,result,getters.curParam.status).draw;
    },
    status:function (state,getters,rootState) {
      //return rootState.project.info.status;
      return 1;

    },
    interfaceEditRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/interfaceEditRole"];
      return 1;

    },
    testEditRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/testEditRole"];
      return 1;

    },
    globalBaseUrlRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/globalBaseUrlRole"];
      return 1;

    },
    globalStatusRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/globalStatusRole"];
      return 1;

    },
    globalInjectRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/globalInjectRole"];
      return 1;

    },
    globalDocRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/globalDocRole"];
      return 1;

    },
    versionEditRole:function (state,getters,rootState,rootGetters) {
     // return rootGetters["project/info/versionEditRole"];
      return 1;

    },
    versionRollRole:function (state,getters,rootState,rootGetters) {
      //return rootGetters["project/info/versionRollRole"];
      return 1;

    }
  },
  mutations:{
    init:function (state) {
      state.autoSave=false;
      state.newInterfaceStr="";
      state.interfaceList=[];
      state.interfaceSearchList=[];
      state.interface=null;
      state.interfaceEdit=null;

      state.objCopy=null;
      state.searchText="";
      state.searchType=1;
      state.type="";
      state.example={};
    },
    setNewInterfaceStr:function (state,data) {
      state.newInterfaceStr=data;
    },
    setIndex:function (state,data) {
      state.index=data;
    },
    addParam:function (state,data) {
      var obj;
      if(data)
      {
        obj=$.clone(state.param[state.index]);
        obj.name=obj.name+"(副本)";
        obj.id=uuid();
      }
      else
      {
        obj={
          name:"参数",
          remark:"",
          id:uuid(),
          query:[{
            name:"",
            must:0,
            remark:""
          }],
          header:[{
            name:"",
            value:"",
            remark:""
          }],
          body:[{
            name:"",
            type:0,
            must:0,
            remark:"",
          }],
          param:[

          ],
          bodyInfo:{
            type:0,
            rawType:0,
            rawTextRemark:"",
            rawFileRemark:"",
            rawText:"",
            rawJSON:[],
            rawJSONType:0
          },
          rawJSONObject:[{
            name:"",
            must:1,
            type:0,
            remark:"",
            show:1,
            mock:"",
            drag:1
          }],
          rawJSONArray:[{
            name:null,
            must:1,
            type:0,
            remark:"",
            show:1,
            mock:"",
            drag:1
          }],
          outInfo:{
            type:0,
            rawRemark:"",
            rawMock:"",
            jsonType:0
          },
          result:[],
          resultObject:[
            {
              name:"",
              must:0,
              type:0,
              remark:"",
              show:0,
              mock:"",
              drag:1
            }
          ],
          resultArray:[
            {
              name:null,
              must:0,
              type:0,
              remark:"",
              show:0,
              mock:"",
              drag:1
            }
          ],
          before:{
            mode:0,
            code:""
          },
          after:{
            mode:0,
            code:""
          }
        };
        obj.bodyInfo.rawJSON=obj.rawJSONObject;
        obj.result=obj.resultObject;
      }
      obj.unSave=1;
      state.param.push(obj);
      state.index=state.param.length-1;
    },
    removeParam:function (state,data) {
      state.param.splice(data,1);
      state.index=0;
    },
    initInterfaceList:function (state,data) {
      function init(data,list) {
        console.log("data");
        console.log(data);

        var arr=[]
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
              data[i].show=1;
            }
            data[i].data=init(data[i].data,(list && list[i])?list[i].data:null)
          }
          else
          {
            data[i].select=0;
          }
          arr.push(data[i]);
        }
        console.log("arr");
        console.log(arr);
      var a = JSON.stringify(arr);
      console.log(a)

        return arr;
      }
      state.interfaceList=init(data,state.interfaceList);
      console.log("接口list");

      console.log(state.interfaceList);
    },
    //为接口填充menu跟show
    initInterfaceMenuList:function (state,data) {
      function init(data,list) {

        var arr=[]
        for(var i=0;i<data.length;i++)
        {
          data[i].menu=0;
          if(data[i].interfaceList)
          {

            data[i].show=0;

            data[i].interfaceList=init(data[i].interfaceList)
          }
          else
          {
            data[i].select=0;
          }
          arr.push(data[i]);
        }

        //var a = JSON.stringify(arr);

        return arr;
      }
      state.interfaceList=init(data,state);
      console.log("接口list");

      console.log(state.interfaceList);
    },

    //为实例菜单填充show
    initCaseMenuList:function (state,data) {

      function init(data,list) {

        var arr=[]
        console.log("initInterfaceMenuList:");

        console.log(data.interfaceList);
        for(var i=0;i<data.length;i++)
        {
          data[i].menu=0;
          if(data[i].interfaceList)
          {
            if(list && list[i] && list[i]._id==data[i]._id)
            {
              data[i].show=list[i].show;
            }
            else
            {
              data[i].show=0;
            }
            data[i].interfaceList=init(data[i].interfaceList,(list && list[i])?list[i].interfaceList:null)
          }

          else
          {
            data[i].select=0;
          }
          arr.push(data[i]);
        }

        //var a = JSON.stringify(arr);

        return arr;
      }
      state.interfaceCaseList=init(data,state.interfaceCaseList);

    },
    setSearchText:function (state,data) {
      state.searchText=data;
    },
    setSearchType:function (state,data) {
      state.searchType=data;
    },
    setStatus:function (state,data) {
      state.status=data;
    },
    setInterfaceSearchList:function (state,data) {
      state.interfaceSearchList=data;
    },
    setDrawMix:function (state,data) {
      state.drawMix=data;
    },
    //树节点点击时的节点变量
    setInterface:function (state,data) {
      state.interface=data;
    },
    //树节点点击时的节点变量
    setCase:function (state,data) {
      state.case=data;
    },
    setInterfaceEdit:function (state,data) {
      console.log("setInterfaceEdit:");
     // console.log(data.data);

      state.interfaceEdit=data;
      console.log(state.interfaceEdit);


    },
    setCaseInfo:function (state,data) {
      console.log("进入setCaseInfo:");
      // console.log(data.data);

      state.caseInfo=data;
      console.log(state.caseInfo);


    },
    setInterfaceList:function (state,data) {
      state.interfaceList=data;
    },
    setObjCopy:function (state,data) {
      state.objCopy=data;
    },
    initParam:function (state,data) {
      state.example={};
      state.param=[
        {
          name:"参数",
          remark:"",
          id:"",
          query:[{
            name:"",
            must:0,
            remark:""
          }],
          header:[{
            name:"",
            value:"",
            remark:""
          }],
          body:[{
            name:"",
            type:0,
            must:0,
            remark:"",
          }],
          param:[

          ],
          bodyInfo:{
            type:0,
            rawType:0,
            rawTextRemark:"",
            rawFileRemark:"",
            rawText:"",
            rawJSON:[],
            rawJSONType:0
          },
          rawJSONObject:[{
            name:"",
            must:1,
            type:0,
            remark:"",
            show:1,
            mock:"",
            drag:1
          }],
          rawJSONArray:[{
            name:null,
            must:1,
            type:0,
            remark:"",
            show:1,
            mock:"",
            drag:1
          }],
          outInfo:{
            type:0,
            rawRemark:"",
            rawMock:"",
            jsonType:0
          },
          result:[],
          resultObject:[
            {
              name:"",
              must:0,
              type:0,
              remark:"",
              show:0,
              mock:"",
              drag:1
            }
          ],
          resultArray:[
            {
              name:null,
              must:0,
              type:0,
              remark:"",
              show:0,
              mock:"",
              drag:1
            }
          ],
        }
      ];
      state.param[0].result=state.param[0].resultObject;
      state.param[0].bodyInfo.rawJSON=state.param[0].rawJSONObject;
      state.index=0;
    },
    initInterface:function (state,data) {
      console.log("initInterface:")
      console.log(state.interfaceEdit.head.length)
       state.interfaceEdit.head.push({
          name:"",
          value:"",
        });


    },
  /*  initInterface:function (state,data) {
      console.log("进入initInterface");
      console.log(state.interfaceEdit);
      console.log(state.param);

      for(var i=1;i<state.interfaceEdit.param.length;i++)
      {
        state.param.push($.clone(state.param[0]));
      }
      console.log(state.param);

      state.interfaceEdit.param.forEach(function (objInter,index) {
        state.param[index].name=objInter.name;
        state.param[index].id=objInter.id;
        state.param[index].remark=objInter.remark;
        if(objInter.queryParam && objInter.queryParam.length>0)
        {
          state.param[index].query=objInter.queryParam;
          state.param[index].query.forEach(function (item) {
            if(item.value && typeof(item.value)=="object" && (item.value instanceof Array))
            {
              item.value={
                type:0,
                status:"",
                data:item.value.map(function (obj) {
                  return {
                    value:obj,
                    remark:""
                  }
                })
              }
            }
          })
          state.param[index].query.push({
            name:"",
            must:0,
            remark:""
          });
        }
        else
        {
          objInter.queryParam=state.param[index].query;
        }
        if(objInter.bodyParam && objInter.bodyParam.length>0)
        {
          state.param[index].body=objInter.bodyParam;
          state.param[index].body.forEach(function (item) {
            if(item.value && typeof(item.value)=="object" && (item.value instanceof Array))
            {
              item.value={
                type:0,
                status:"",
                data:item.value.map(function (obj) {
                  return {
                    value:obj,
                    remark:""
                  }
                })
              }
            }
          })
          state.param[index].body.push({
            name:"",
            type:0,
            must:0,
            remark:"",
          });
        }
        else
        {
          objInter.bodyParam=state.param[index].body;
        }
        if(objInter.header && objInter.header.length>0)
        {
          state.param[index].header=objInter.header;
          state.param[index].header.push({
            name:"",
            value:"",
            remark:""
          });
        }
        else
        {
          objInter.header=state.param[index].header;
        }
        if(objInter.outParam && objInter.outParam.length>0)
        {
          //helper.default.initResultShow(objInter.outParam);
          state.param[index].result=objInter.outParam;
        }
        else
        {
          objInter.outParam=state.param[index].result;
        }
        if(objInter.restParam && objInter.restParam.length>0)
        {
          state.param[index].param=objInter.restParam;
          state.param[index].param.forEach(function (item) {
            if(item.value && typeof(item.value)=="object" && (item.value instanceof Array))
            {
              item.value={
                type:0,
                status:"",
                data:item.value.map(function (obj) {
                  return {
                    value:obj,
                    remark:""
                  }
                })
              }
            }
          })
        }
        else
        {
          objInter.restParam=state.param[index].param;
        }
        if(objInter.bodyInfo)
        {
          state.param[index].bodyInfo=objInter.bodyInfo;
          if(state.param[index].bodyInfo.rawText===undefined)
          {
            Vue.set(state.param[index].bodyInfo,"rawText","");
          }
          if(state.param[index].bodyInfo.rawTextRemark===undefined)
          {
            Vue.set(state.param[index].bodyInfo,"rawTextRemark","");
          }
          if(state.param[index].bodyInfo.rawFileRemark===undefined)
          {
            Vue.set(state.param[index].bodyInfo,"rawFileRemark","");
          }
          if(state.param[index].bodyInfo.rawJSONType===undefined)
          {
            Vue.set(state.param[index].bodyInfo,"rawJSONType",0);
          }
          if(state.param[index].bodyInfo.rawJSON==undefined)
          {
            Vue.set(state.param[index].bodyInfo,"rawJSON",state.param[index].rawJSONObject);
          }
          else
          {
           // helper.default.initResultShow(state.param[index].bodyInfo.rawJSON);
            if(state.param[index].bodyInfo.rawJSONType==0)
            {
              state.param[index].rawJSONObject=state.param[index].bodyInfo.rawJSON;
            }
            else
            {
              state.param[index].rawJSONArray=state.param[index].bodyInfo.rawJSON;
            }
          }
          var bFind=false;
          for(var i=0;i<state.param[index].header.length;i++)
          {
            var obj=state.param[index].header[i];
            if(obj.name.toLowerCase()=="content-type" && obj.value.toLowerCase().indexOf("application/json")>-1)
            {
              bFind=true;
              break;
            }
          }
          if(bFind && state.param[index].bodyInfo.rawText)
          {
            var obj;
            try
            {
              obj=JSON.parse(state.param[index].bodyInfo.rawText);
            }
            catch (e)
            {

            }
            if(obj)
            {
              var result=[];
              for(var key in obj)
              {
                helper.default.handleResultData(key,obj[key],result,null,1,null,1)
              }
              state.param[index].bodyInfo.rawJSON=result;
              state.param[index].bodyInfo.rawJSONType=(obj instanceof Array)?1:0;
              state.param[index].bodyInfo.rawText="";
              state.param[index].bodyInfo.rawType=2;
            }
          }
        }
        else
        {
          objInter.bodyInfo=state.param[index].bodyInfo;
        }
        if(objInter.outInfo)
        {
          state.param[index].outInfo=objInter.outInfo;
          if(state.param[index].outInfo.jsonType===undefined)
          {
            Vue.set(state.param[index].outInfo,"jsonType",0);
          }
          else if(state.param[index].outInfo.jsonType==0)
          {
            state.param[index].resultObject=state.param[index].result;
          }
          else
          {
            state.param[index].resultArray=state.param[index].result;
          }
        }
        else
        {
          objInter.outInfo=state.param[index].outInfo;
        }
        if(!objInter.before)
        {
          Vue.set(objInter,"before",{
            mode:0,
            code:""
          })
        }
        else
        {
          if(typeof(objInter.before)=="string")
          {
            objInter.before={
              mode:0,
              code:objInter.before
            }
          }
        }
        state.param[index].before=objInter.before;
        if(!objInter.after)
        {
          Vue.set(objInter,"after",{
            mode:0,
            code:""
          })
        }
        else
        {
          if(typeof(objInter.after)=="string")
          {
            objInter.after={
              mode:0,
              code:objInter.after
            }
          }
        }
        state.param[index].after=objInter.after;
      })
    },*/
    moveInterface:function (state,id) {
      if(state.interfaceEdit)
      {
        state.interfaceEdit.group._id=id;
      }
    },
    importResult:function (state,obj) {
      if(obj instanceof Array)
      {
        state.param[state.index].outInfo.jsonType=1;
      }
      else
      {
        state.param[state.index].outInfo.jsonType=0;
      }
      var result=[];
      if(state.param[state.index].outInfo.jsonType==1)
      {
        helper.default.handleResultData(0,obj[0],result,null,1,1,1)
        state.param[state.index].result=state.param[state.index].resultArray=result;
      }
      else
      {
        for(var key in obj)
        {
          helper.default.handleResultData(key,obj[key],result,null,1,1,1)
        }
        state.param[state.index].result=state.param[state.index].resultObject=result;
      }
    },
    importQuery:function (state,val) {
      var str=decodeURI($.trim(val));
      var arr=[];
      var param1=str.split("&");
      for(var i=0;i<param1.length;i++)
      {
        var param2=param1[i].split("=");
        if(param2.length>0)
        {
          arr.push({
            name:param2[0],
            must:1,
            remark:"",
            value:param2[1]?{
              type:0,
              status:"",
              data:[{
                value:decodeURIComponent(param2[1]),
                remark:""
              }]
            }:{
              type:0,
              status:"",
              data:[]
            },
          })
        }
      }
      arr.push({
        name:"",
        must:0,
        remark:""
      })
      state.param[state.index].query=arr;
      state.interfaceEdit.param[state.index].queryParam=arr;
    },
    importHeader:function (state,val) {
      var arr=$.trim(val).split("\n");
      var arrHeader=[];
      for(var i=0;i<arr.length;i++)
      {
        var line=$.trim(arr[i]);
        var index=line.indexOf(":");
        var key="",value="";
        if(index==-1)
        {
          key=line;
        }
        else
        {
          key=$.trim(line.substr(0,index));
          value=$.trim(line.substr(index+1));
        }
        if(key)
        {
          arrHeader.push({
            name:key,
            value:value,
            remark:"",
          })
        }
      }
      arrHeader.push({
        name:"",
        value:"",
        remark:""
      })
      state.param[state.index].header=arrHeader;
      state.interfaceEdit.param[state.index].header=arrHeader;
    },
    importBody:function (state,val) {
      var str=decodeURI($.trim(val));
      var arr=[];
      var param1=str.split("&");
      for(var i=0;i<param1.length;i++)
      {
        var param2=param1[i].split("=");
        if(param2.length>0)
        {
          arr.push({
            name:decodeURIComponent(param2[0]),
            type:param2[1]=="[FILE]"?1:0,
            must:1,
            remark:"",
            value:(param2[1]!="[FILE]")?(param2[1]?{
              type:0,
              status:"",
              data:[
                {
                  value:decodeURIComponent(param2[1]),
                  remark:""
                }
              ]
            }:{
              type:0,
              status:"",
              data:[]
            }):{
              type:0,
              status:"",
              data:[]
            },
          })
        }
      }
      arr.push({
        name:"",
        type:0,
        must:0,
        remark:"",
      })
      state.param[state.index].body=arr;
      state.interfaceEdit.param[state.index].bodyParam=arr;
    },
    changeMethod:function (state) {
      if(state.interfaceEdit.infMethod=="POST" || state.interfaceEdit.infMethod=="PUT" || state.interfaceEdit.infMethod=="PATCH")
      {
        state.param.forEach(function (obj,index) {
          if(obj.header.length==1 && !obj.header[0].name)
          {
            obj.header[0].name="Content-Type";
            obj.header[0].value="application/x-www-form-urlencoded"
          }
          else
          {
            var bFind=false;
            for(var i=0;i<obj.header.length;i++)
            {
              var obj=obj.header[i];
              if(obj.name=="Content-Type")
              {
                bFind=true;
                break;
              }
            }
            if(!bFind)
            {
              obj.header.push({
                name:"Content-Type",
                value:"application/x-www-form-urlencoded",
                remark:""
              })
            }
          }
          if(!obj.bodyInfo)
          {
            obj.bodyInfo={
              type:0,
              rawType:0,
              rawTextRemark:"",
              rawFileRemark:"",
              rawText:"",
              rawJSON:[],
              rawJSONType:0
            }
          }
        })
      }
      else
      {
        state.param.forEach(function (obj,index) {
          for(var i=0;i<obj.header.length;i++)
          {
            var obj1=obj.header[i];
            if(obj1.name=="Content-Type")
            {
              if(obj.header.length>1)
              {
                obj.header.splice(i,1);
              }
              else
              {
                obj.header[0].name="";
                obj.header[0].value="";
                obj.header[0].remark="";
              }
              break;
            }
          }
        })
      }
    },
    changeUrl:function (state,val) {
      /*if(val)
      {
        var arrParam=[];
        var arr=val.match(/\{([^\s|\}|\{]+?)\}(?!\})/g);
        if(arr)
        {
          for(var i=0;i<arr.length;i++)
          {
            var str=arr[i].substr(1,arr[i].length-2);
            var bFind=false;
            for(var j=0;j<state.param[state.index].param.length;j++)
            {
              if(str==state.param[state.index].param[j].name)
              {
                bFind=true;
                arrParam.push(state.param[state.index].param[j]);
                break;
              }
            }
            if(!bFind)
            {
              arrParam.push({
                name:str,
                remark:"",
                value:{
                  type:0,
                  status:"",
                  data:[]
                }
              })
            }
          }
        }
        state.param.forEach(function (obj,index) {
          obj.param=arrParam;
          state.interfaceEdit.param[index].restParam=obj.param;
        })
      }*/
    },
    searchInterface:function (state) {
      if(!state.searchText)
      {
        return;
      }
      state.interfaceSearchList=(function (list) {
        var searchList=[];
        for(var i=0;i<list.length;i++)
        {
          var obj=list[i];
          if(obj.data)
          {
            var objCopy={};
            for(var key in obj)
            {
              objCopy[key]=obj[key];
            }
            objCopy.data=arguments.callee(objCopy.data)
            if(objCopy.data.length>0)
            {
              searchList.push(objCopy);
            }
          }
          else
          {
            var str;
            if(state.searchType==0)
            {
              str=obj.name?obj.name:"";
            }
            else
            {
              str=obj.url?obj.url:"";
            }
            if(str.toLowerCase().indexOf(state.searchText.toLowerCase())>-1)
            {
              searchList.push(obj);
            }
          }
        }
        return searchList;
      })(state.interfaceList)
    },
    toggleResultType:function (state) {
      if(state.param[state.index].outInfo.jsonType==1)
      {
        state.param[state.index].result=state.param[state.index].resultArray
      }
      else
      {
        state.param[state.index].result=state.param[state.index].resultObject
      }
    }
  },
  actions:{

    add:function (context,data) {
      if(context.state.interface && (data.id || (data.item && !data.item._id)))
      { console.log("进入if");
        context.state.interface.select=0;
        context.commit("setInterface",null);
      }
      console.log("没有进入if");
      context.commit("initParam");
      if(data.item)
      {
        context.commit("setInterfaceEdit",data.item);
      }
      else
      {
        context.commit("setInterfaceEdit",{
          "infId": "",
          "infName": "",
          "projectId": data.id,
           "infUrl": "",
           "isEncode":"",
           "encodeId":"",
          "remark": "",
          "infMethod": "POST",
          "finish":0,
          "head":[
          ]

        });
      }
      context.commit("initInterface");
      context.dispatch("changeType","edit");
     // context.getters.event.$emit("initInterface");
    },

    addCase:function (context,data) {

        context.commit("setCaseInfo",{"afterCaseId":"",
        "beforeCaseId":"",
        "caseBody":"",
        "caseId":"",
        "caseName":"",
        "parentId":data.id},);
      },

    getAllInterface:function (context,data) {
      console.log("getAllInterface");

      console.log(data.data.data);
      context.commit("initInterfaceList",data.data.data);
      console.log("设置接口初始化完成");
      console.log(helper);

      /*      context.commit("project/info/setBaseUrls",data.baseUrl,{
              root:true
            });*/
    },
    //根据project_ID查询下属目录接口
    getInterfaceMenu:function (context,project_id) {
      http({
        //url: http.adornUrl('/iface/interfaceinfo/list1'),
        url: http.adornUrl('/iface/interface/menu/'+project_id),
        method: 'get'
      }).then(({data}) => {
        context.commit("initInterfaceMenuList",data.interfaceProjectMemu);
      })

      //根据project_ID查询下属目录接口

     // context.commit("initInterfaceList",data.data.data);
      //console.log("设置接口初始化完成");
      //console.log(helper);

      /*      context.commit("project/info/setBaseUrls",data.baseUrl,{
              root:true
            });*/
    },
    getCaseMenu:function (context,interface_id) {
      console.log("getCaseMenu:"+ interface_id);
      http({
        //url: http.adornUrl('/iface/interfaceinfo/list1'),
        url: http.adornUrl('/iface/casememu/menu/'+interface_id),
        method: 'get'
      }).then(({data}) => {
        console.log("data.interfaceProjectMemu.interfaceList");


        context.commit("initCaseMenuList",data.interfaceProjectMemu);
      })
    },
      refreshData:function (context,data) {
      context.commit("initInterfaceList",data);
      if(context.state.interface)
      {
        context.state.interface.select=0;
      }
      context.commit("setInterface",null);
      context.commit("setInterfaceEdit",null);
      context.commit("searchInterface");
    },
    refresh:function (context) {
      return http({
        //url: http.adornUrl('/iface/interfaceinfo/list1'),
        url: http.adornUrl('/iface/interfaceprojectmemu/interface'),
        method: 'post',
        data: {
          id:1,
          sort:0
        }
      })
        },
    renameGroup:function (context,data) {
      return net.post("/group/create",data,{
        "content-type":"application/x-www-form-urlencoded"
      }).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    removeGroup:function (context,data) {
      return net.delete("/group/item",data).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    clear:function (context) {
      return net.delete("/project/clear",{
        id:session.get("projectId"),
      }).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    removeInterface:function (context,data) {
      return net.delete("/interface/item",{
        id:data
      }).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    destroyInterface:function (context,data) {
      return net.delete("/interface/destroyitem",{
        id:data
      }).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    info:function (context,obj) {
      //var itemData;
      console.log("进入info")
      return http({
        url: http.adornUrl(`/iface/interfaceinfo/info/`+obj.projectId),
        method: 'get',
      }).then(({data}) => {
        if(data.code==0)
        {

          context.dispatch("showInfo",{
            data:data,
            data1:obj
          });
          return data;

          // if(data.data.change) {
            /* return net.get("/project/interface",{
               id:session.get("projectId"),
               sort:session.get("sort")?session.get("sort"):0
             }).then(function (data) {
               if(data.code==200)
               {
                 context.dispatch("refreshData",data.data.data);
                 context.commit("project/info/setBaseUrls",data.data.baseUrl,{
                   root:true
                 });
                 context.dispatch("showInfo",{
                   data:itemData._id,
                   data1:itemData
                 });
               }
               return data;
             })
           }
           else
           {
             context.dispatch("showInfo",{
               data:data.data,
               data1:obj.item1
             });
           }
         }*/
            /*else
            {
              obj.item.splice(obj.index,1);
              context.dispatch("showInfo",{
                data:null,
                data1:null
              });
            }*/
         // }
          }
      } )//)
    },
    caseInfo:function (context,obj) {
      //var itemData;
      console.log("进入info")
      return http({
        url: http.adornUrl(`/iface/case/info/`+obj.menuId),
        method: 'get',
      }).then(({data}) => {

        if(data.code===0)
        {debugger
         // context.commit("setCaseInfo",data.interfaceCase);
          context.dispatch("showCaseInfo",{
            data:data.interfaceCase,
            data1:obj
          })
          return data;
          }

         else {
          $.tip(data.msg,0)
        }
      } )//)
    },


/*    showInfo:function (context,data) {
/!*      if(context.state.interface && !session.get("snapshotId"))
      {
        context.state.interface.select=0;
      }*!/
      console.log("进入showInfo")
      if(data.data==null)
      {
        context.commit("setInterface",null);
      }
      else if(typeof(data.data)=="string")
      {
        for(var i=0;i<context.state.interfaceList.length;i++)
        {
          var obj=context.state.interfaceList[i];
          var bBreak=false;
          for(var j=0;j<obj.data.length;j++)
          {
            var obj1=obj.data[j];
            if(obj1._id==data.data)
            {
              obj.show=1;
              context.commit("setInterface",obj1);
              obj1.select=1;
              context.commit("setInterfaceEdit",data.data1);
              bBreak=true;
              break;
            }
          }
          if(bBreak)
          {
            break;
          }
        }
      }
      else
      {
        if(!session.get("snapshotId"))
        {
         // context.commit("setInterface",data.data);
          //context.state.interf.interface.select=1;
        }
        console.log("进入setInterfaceEdit")
        console.log(data.data);
        context.commit("setInterfaceEdit",data.data.data);
      }
     // context.commit("initParam");
      if(context.state.interfaceEdit)
      {         console.log("initInterface")

        context.commit("initInterface");
      }
      else
      {        console.log("进入setInterfaceEditnull")

        //context.commit("setInterfaceEdit",null);
      }
      if(context.getters.interfaceEditRole)
      {
        context.dispatch("changeType","edit");
      }
      else
      {
        context.dispatch("changeType","preview");
      }
//      context.getters.event.$emit("initInterface");
    },*/

    showInfo:function (context,data) {
     console.log(typeof(data.data));
      if(context.state.interface )
      {
        context.state.interface.select=0;
      }
      if(data.data==null)
      {
        context.commit("setInterface",null);
      }
      else if(typeof(data.data)=="string")
      {
        for(var i=0;i<context.state.interfaceList.length;i++)
        {
          var obj=context.state.interfaceList[i];
          var bBreak=false;
          for(var j=0;j<obj.data.length;j++)
          {
            var obj1=obj.data[j];
            if(obj1._id==data.data)
            {
              obj.show=1;
              context.commit("setInterface",obj1);
              obj1.select=1;
              context.commit("setInterfaceEdit",data.data1);
              bBreak=true;
              break;
            }
          }
          if(bBreak)
          {
            break;
          }
        }
      }
      else
      {
        if(!session.get("snapshotId"))
        {
          context.commit("setInterface",data.data1);
          context.state.interface.select=1;
        }
        context.commit("setInterfaceEdit",data.data.data);
      }
      context.commit("initParam");
      if(context.state.interface)
      {
        context.commit("initInterface");
      }
      else
      {
        context.commit("setInterfaceEdit",null);
      }
      if(context.getters.interfaceEditRole)
      {
        context.dispatch("changeType","edit");
      }
      else
      {
        context.dispatch("changeType","preview");
      }
/*
      context.getters.event.$emit("initInterface");
*/
    },
    //选择树
    showCaseInfo:function (context,data) {
      debugger;
      console.log("进入showCaseInfo")
      if(context.state.case )
      {
        context.state.case.select=0;
      }
      if(data.data==null)
      {
        context.commit("setCase",null);
      }

      else
      {

          context.commit("setCase",data.data1);
          context.state.case.select=1;
          context.commit("setCaseInfo",data.data);

      }



      /*
            context.getters.event.$emit("initInterface");
      */
    },
    move:function (context,obj) {
      var pro;
      if(obj.obj.folder)
      {
        pro=net.put("/group/move",{
          group:obj.obj.id,
          to:obj.top?"":(obj.group?obj.group._id:""),
          index:obj.index
        })
      }
      else
      {
        pro=net.put("/interface/move",{
          id:obj.obj.id,
          group:obj.group._id,
          index:obj.index
        })
      }
      return pro.then(function (data) {
        if(data.code==200)
        {
          context.commit("initInterfaceList",data.data);
          (function (list,objGroup) {
            for(var i=0;i<list.length;i++)
            {
              var o=list[i];
              if(o.data)
              {
                if(o._id==obj.obj.id)
                {
                  if(objGroup)
                  {
                    objGroup.show=1;
                  }
                  return true;
                }
                else
                {
                  var ret=arguments.callee(o.data,o);
                  if(ret)
                  {
                    return true;
                  }
                }
              }
              else
              {
                if(o._id==obj.obj.id)
                {
                  objGroup.show=1;
                  if(obj.obj.select)
                  {
                    o.select=1;
                    context.commit("setInterface",o);
                    context.commit("moveInterface",obj.group._id);
                  }
                  return true;
                }
              }
            }
            return false;
          })(context.state.interfaceList);
        }
        return data;
      })
    },
    addGroup:function (context,query) {
      console.log("进来了");
      http({
        url: http.adornUrl('/iface/interfaceprojectmemu/save'),
        method: 'post',
        data: query.query
      })
      /*return net.post("/group/create",query.query,{
        "content-type":"application/x-www-form-urlencoded"
      }).then(function (data) {
        if(data.code==200)
        {
          if(query.group)
          {
            query.group.show=1;
          }
          context.commit("initInterfaceList",data.data);
        }
        return data;
      })*/
    },
    addCaseGroup:function (context,query) {
      console.log("query:");

      console.log(query);
      http({
        url: http.adornUrl('/iface/casememu/save'),
        method: 'post',
        data: query.query
      }).then(({data}) => {


        if(data && data.code===0)
        {  $.notify("新建成功",1)
          if(query.group)
          {
            query.group.show=1;
          }
          context.dispatch("getCaseMenu",query.interfaceID);
        }

      })
      /*return net.post("/group/create",query.query,{
        "content-type":"application/x-www-form-urlencoded"
      }).then(function (data) {
        if(data.code==200)
        {
          if(query.group)
          {
            query.group.show=1;
          }
          context.commit("initInterfaceList",data.data);
        }
        return data;
      })*/
    },

    save:function (context) {
      /*var obj={
        infName:context.state.interfaceEdit.Iname,
        infUrl:context.state.interfaceEdit.url,
        projectId:context.state.interfaceEdit.group._id,
        remark:context.state.interfaceEdit.remark,
        encodeId:1,
        head:[{name:"Accept-Charset",value:"332"},{name:"Accept-Encoding",value:"22"}],
        //project:session.get("projectId"),
        infMethod:context.state.interfaceEdit.method,
       // finish:context.state.interfaceEdit.finish,
        //param:[]
      }
      if(context.state.interfaceEdit._id)
      {
        obj.id=context.state.interfaceEdit._id
      }*/
      /*var originIndex=context.state.index;
      for(var index=0;index<context.state.param.length;index++)
      {
        context.state.index=index;
        var obj1={
          before:context.state.param[index].before,
          after:context.state.param[index].after,
          name:context.state.param[index].name,
          id:context.state.param[index].id,
          remark:context.state.param[index].remark,
        }
        obj1.header=context.getters.headerSave;
        obj1.queryParam=context.getters.querySave;
        if(context.state.interfaceEdit.method=="POST" || context.state.interfaceEdit.method=="PUT" || context.state.interfaceEdit.method=="PATCH")
        {
          if(context.getters.bodyInfo.type==0)
          {
            obj1.bodyParam=context.getters.bodySave;
          }
          else
          {
            obj1.bodyParam=[];
          }
          var bodyInfo=$.clone(context.getters.bodyInfo);
          if(bodyInfo.type==1)
          {
            if(bodyInfo.rawType==0)
            {
              bodyInfo.rawFileRemark="";
              delete bodyInfo.rawJSON;
              delete bodyInfo.rawJSONType;
            }
            else if(bodyInfo.rawType==1)
            {
              bodyInfo.rawText="";
              bodyInfo.rawTextRemark="";
              delete bodyInfo.rawJSON;
              delete bodyInfo.rawJSONType;
            }
            else
            {
              bodyInfo.rawFileRemark="";
              bodyInfo.rawText="";
              bodyInfo.rawTextRemark="";
            }
          }
          else
          {
            bodyInfo.rawType=0;
            bodyInfo.rawFileRemark="";
            bodyInfo.rawText="";
            bodyInfo.rawTextRemark="";
            delete bodyInfo.rawJSON;
            delete bodyInfo.rawJSONType;
          }
          obj1.bodyInfo=bodyInfo
        }
        if(context.getters.outInfo.type==0)
        {
          obj1.outParam=helper.default.resultSave(context.state.param[context.state.index].result);
          var outInfo=$.clone(context.getters.outInfo);
          outInfo.rawRemark="";
          outInfo.rawMock="";
          obj1.outInfo=outInfo
        }
        else
        {
          obj1.outParam=[];
          obj1.outInfo=context.getters.outInfo
        }
        obj1.restParam=context.state.param[context.state.index].param;
        obj.param.push(obj1);
      }
      obj.param=JSON.stringify(obj.param);
      context.state.index=originIndex;*/

        http({
          url: http.adornUrl(`/iface/interfaceinfo/save`),
          method: 'post',
          data: context.state.interfaceEdit
        }).then(({data}) => {
          debugger;

          console.log(data);
          if (data && data.code === 0) {
            //判断是否新增，新增则刷新树
            if(!context.state.interfaceEdit.infId){
            context.state.interfaceEdit.infId=data.data.infId;
            (function _map1(list) {
              for(var i=0;i<list.length;i++)
              {
                var obj=list[i];
                if(obj.interfaceList)
                {
                  if(obj.projectId==context.state.interfaceEdit.projectId)
                  {
                    var o={
                      projectId:data.data.infId,
                      parentId:data.data.projectId,
                      type:2,
                      name:data.data.infName,
                      method:data.data.infMethod,
                      select:1,
                      menu:0
                    }
                    obj.show=1;
                    obj.interfaceList.push(o);
                    context.state.interface=o;
                    return true;
                  }
                  else
                  {
                    var ret=_map1(obj.interfaceList);
                    if(ret)
                    {
                      obj.show=1;
                      return true;
                    }
                  }
                }
              }
              return false;
            })(context.state.interfaceList);
            }
            $.message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                //this.visible = false
              //  this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      /*      var header={
              "content-type":"application/x-www-form-urlencoded"
            };*/
      /*return net.post("/interface/create",obj,header).then(function (data) {
        if(data.code==200)
        {
          if(typeof(data.data)=="string")
          {
            if(!session.get("snapshotId"))
            {
              context.state.interface.name=context.state.interfaceEdit.name;
              context.state.interface.method=context.state.interfaceEdit.method;
              context.state.interface.finish=context.state.interfaceEdit.finish;
            }
            Vue.set(context.state.interfaceEdit,"editor",{name:session.get("name")});
            Vue.set(context.state.interfaceEdit,"updatedAt",$.getNowFormatDate("yyyy-MM-dd hh:mm:ss"))
          }
          else
          {
            if(data.data instanceof Array)
            {
              Vue.set(context.state.interfaceEdit,"editor",{name:session.get("name")});
              Vue.set(context.state.interfaceEdit,"updatedAt",$.getNowFormatDate("yyyy-MM-dd hh:mm:ss"))
              context.commit("initInterfaceList",data.data);
              (function _map1(data) {
                for(var i=0;i<data.length;i++)
                {
                  var obj=data[i];
                  if(obj.data)
                  {
                    var ret=arguments.callee(obj.data);
                    if(ret)
                    {
                      obj.show=1;
                      return true;
                    }
                  }
                  else
                  {
                    if(obj._id==context.state.interfaceEdit._id)
                    {
                      context.state.interface=obj;
                      obj.select=1;
                      return true;
                    }
                  }
                }
                return false;
              })(context.state.interfaceList);
            }
            else
            {
              context.state.interfaceEdit._id=data.data._id;
              context.state.interfaceEdit.id=data.data.id;
              Vue.set(context.state.interfaceEdit,"owner",{name:session.get("name")});
              Vue.set(context.state.interfaceEdit,"editor",{name:session.get("name")});
              Vue.set(context.state.interfaceEdit,"createdAt",data.data.createdAt);
              Vue.set(context.state.interfaceEdit,"updatedAt",data.data.updatedAt);
              (function _map1(list) {
                for(var i=0;i<list.length;i++)
                {
                  var obj=list[i];
                  if(obj.data)
                  {
                    if(obj._id==context.state.interfaceEdit.group._id)
                    {
                      var o={
                        _id:data.data._id,
                        name:data.data.name,
                        method:data.data.method,
                        finish:data.data.finish,
                        select:1,
                        menu:0
                      }
                      obj.show=1;
                      obj.data.push(o);
                      context.state.interface=o;
                      return true;
                    }
                    else
                    {
                      var ret=arguments.callee(obj.data);
                      if(ret)
                      {
                        obj.show=1;
                        return true;
                      }
                    }
                  }
                }
                return false;
              })(context.state.interfaceList);
            }
          }
          context.state.param.forEach(function (obj) {
            delete obj.unSave;
          })
          context.commit("searchInterface");
        }
        return data;
      })*/
    },
    copy:function (context,data) {
      return net.get("/interface/item",{
        id:data.item1._id,
        group:data.item._id
      }).then(function (data) {
        if(data.code==200)
        {
          var method=data.data.method;
          var url=$.trim(data.data.url);
          var name=$.trim(data.data.name)+"(副本)";
          var param=data.data.param;
          var obj={
            method:method,
            url:url,
            group:{
              _id:data.data.group._id
            },
            name:name,
            remark:data.data.remark,
            owner:"",
            editor:"",
            createdAt:"",
            updatedAt:"",
            finish:0,
            param:param
          }
          context.state.objCopy=obj;
        }
        return data;
      })

    },
    newInterface:function (context) {
      if(context.state.newInterfaceStr)
      {
        var objInterface=JSON.parse(context.state.newInterfaceStr);
        context.dispatch("add",{
          id:null,
          item:objInterface
        });
        context.state.newInterfaceStr="";
      }
    },
    mergeGroup:function (context,id) {
      return net.put("/group/merge",{
        group:id
      }).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    mergeInterface:function (context,id) {
      return net.put("/interface/merge",{
        id:id
      }).then(function (data) {
        if(data.code==200)
        {
          context.dispatch("refreshData",data.data);
        }
        return data;
      })
    },
    changeType:function (context,data) {
      console.log("进入changetype:"+data);
      context.state.type=data;
      if(data=="preview")
      {
        var obj=context.state.param[context.state.index].outInfo.jsonType==1?[]:{};
        var result=helper.default.resultSave(context.state.param[context.state.index].result);
        var bJSON=false,objJSON={};
        if(context.state.param[context.state.index].bodyInfo.type==1 && context.state.param[context.state.index].bodyInfo.rawType==2 && context.state.param[context.state.index].bodyInfo.rawJSON)
        {
          objJSON=context.state.param[context.state.index].bodyInfo.rawJSONType==0?{}:[];
          bJSON=true;
          var result1=helper.default.resultSave(context.state.param[context.state.index].bodyInfo.rawJSON);
          helper.default.convertToJSON(result1,objJSON);
        }
        var info=helper.default.handleMockInfo(0,context.state.param[context.state.index].param,context.state.param[context.state.index].query,context.state.param[context.state.index].header,bJSON?objJSON:context.state.param[context.state.index].body,context.state);
        helper.default.convertToJSON(result,obj,info);
        context.state.drawMix=helper.default.format(JSON.stringify(obj),1,result,context.state.status).draw;
      }
    },
    saveTemplate:function (context,data) {
      var obj={
        name:data.name,
        url:context.state.interfaceEdit.url,
        remark:context.state.interfaceEdit.remark,
        project:session.get("projectId"),
        method:context.state.interfaceEdit.method,
        param:[]
      }
      if(data.id)
      {
        obj.id=data.id;
      }
      var originIndex=context.state.index;
      for(var index=0;index<context.state.param.length;index++)
      {
        context.state.index=index;
        var obj1={
          before:context.state.param[index].before,
          after:context.state.param[index].after,
          name:context.state.param[index].name,
          id:context.state.param[index].id,
          remark:context.state.param[index].remark,
        }
        obj1.header=context.getters.headerSave;
        obj1.queryParam=context.getters.querySave;
        if(context.state.interfaceEdit.method=="POST" || context.state.interfaceEdit.method=="PUT" || context.state.interfaceEdit.method=="PATCH")
        {
          if(context.getters.bodyInfo.type==0)
          {
            obj1.bodyParam=context.getters.bodySave;
          }
          else
          {
            obj1.bodyParam=[];
          }
          var bodyInfo=$.clone(context.getters.bodyInfo);
          if(bodyInfo.type==1)
          {
            if(bodyInfo.rawType==0)
            {
              bodyInfo.rawFileRemark="";
              delete bodyInfo.rawJSON;
              delete bodyInfo.rawJSONType;
            }
            else if(bodyInfo.rawType==1)
            {
              bodyInfo.rawText="";
              bodyInfo.rawTextRemark="";
              delete bodyInfo.rawJSON;
              delete bodyInfo.rawJSONType;
            }
            else
            {
              bodyInfo.rawFileRemark="";
              bodyInfo.rawText="";
              bodyInfo.rawTextRemark="";
            }
          }
          else
          {
            bodyInfo.rawType=0;
            bodyInfo.rawFileRemark="";
            bodyInfo.rawText="";
            bodyInfo.rawTextRemark="";
            delete bodyInfo.rawJSON;
            delete bodyInfo.rawJSONType;
          }
          obj1.bodyInfo=bodyInfo
        }
        if(context.getters.outInfo.type==0)
        {
          obj1.outParam=helper.default.resultSave(context.state.param[context.state.index].result);
          var outInfo=$.clone(context.getters.outInfo);
          outInfo.rawRemark="";
          outInfo.rawMock="";
          obj1.outInfo=outInfo
        }
        else
        {
          obj1.outParam=[];
          obj1.outInfo=context.getters.outInfo
        }
        obj1.restParam=context.state.param[context.state.index].param;
        obj.param.push(obj1);
      }
      obj.param=JSON.stringify(obj.param);
      context.state.index=originIndex;
      return net.post("/template/item",obj).then(function (data) {
        return data;
      })
    },
  }
}
