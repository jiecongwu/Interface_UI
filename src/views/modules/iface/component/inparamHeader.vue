<template>
    <el-row class="row">
        <table width="100%">
            <template v-for="(item,index) in arr">
                <tr style="text-align: center;vertical-align: middle">
                    <td style="width: 20%;height: 50px">
                        <el-autocomplete size="small" style="width: 90%" class="inline-input" placeholder="请填写header" v-model="item.name" :fetch-suggestions="querySearchKey" @input="index==arr.length-1?add():add1(arr,index)"></el-autocomplete>
                    </td>
                    <td style="width: 30%">
                        <el-autocomplete size="small" style="width: 90%;" class="inline-input" placeholder="请填写value" v-model="item.value" :fetch-suggestions="querySearchValue" @mouseenter.native="focus(item)"></el-autocomplete>
                    </td>
                    <td style="width: 10%">
                        <el-button size="mini" type="text" icon="el-icon-close" style="color: red;font-size: 15px" @click="remove(index)" v-if="index!=arr.length-1"></el-button>
                    </td>
                </tr>
            </template>
        </table>

    </el-row>
</template>
<script>
    var headerData=require("@/views/common/js/header")
    export default {
        props:["item"],
        data:function () {
            return {
                keys:Object.keys(headerData).map(function (obj) {
                    return {value:obj}
                }),
                itemSel:null
            }
        },
        computed:{
            arr:function () {
               return this.item.head
                }
        },
        methods:{
            querySearchKey:function(queryString, cb) {
                var results;
                if(queryString)
                {
                    results=this.keys.filter(function (obj) {
                        return obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    })
                }
                else
                {
                    results=this.keys;
                }
                cb(results);
            },
            querySearchValue:function(queryString, cb) {
                var results;
                if(headerData[this.itemSel.name])
                {
                    results=headerData[this.itemSel.name].map(function (obj) {
                        return {value:obj}
                    })
                }
                else
                {
                    cb([]);
                    return;
                }
                if(queryString)
                {
                    results=results.filter(function (obj) {
                        return obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    })
                }
                cb(results);
            },
            focus:function (item) {
                  this.itemSel=item;
            },
            add:function () {
                console.log("进入add");
                this.arr.push({name:'',value:'',remark:''});
            },
          add1:function (arr,index) {
            console.log("进入add1");
            if(index==arr.length-1){
              console.log("===")
            }else {
              console.log(index);
              console.log(arr.length-1);


            }
          },
            remove:function (index) {
                this.arr.splice(index,1)
            }
        },
        created:function () {

        }
    }
</script>
