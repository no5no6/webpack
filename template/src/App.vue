<template>
  <div id="app" >
    <SideMenu :webMenu="webMenu" :apiUrl="apiUrl" :currentMenu="currentMenu" @setCurrentPage="setCurrentPage"></SideMenu>
  </div>
</template>

<script>

import bus from '@/utils/bus';

export default {
  name: 'app',
  data(){
    return {
      apiUrl: '',
      currentMenu: '',
      webMenu: [
        {
          id: 10001,
          pageName: 'GlobalCards',
          nodeName: "WEB模块化卡片",
          isWeb: true,
          srcId: '/globalcards'
          // childList: [
          //   {
          //     id: 10002,
          //     srcId: "webGolbal",
          //     nodeName: "模块化卡片",
          //     isWeb: true,
          //   }
          // ]
        },
        {
          id: 10002,
          pageName: 'ColumnList',
          nodeName: "WEB针对栏目",
          isWeb: true,
          srcId: '/columnlist'
        }
      ]
    }
  },
  methods: {
    init() {
      let param = this.GetUrlParam();
      console.log(param, 'url-param');
      // 设置host
      this.$kuyun.host = param.domain ? `http://${param.domain}` : `http://${sessionStorage.getItem("domain")}`;

      // 左侧菜单数据api地址
      this.apiUrl = `${this.$kuyun.host}/getAuthList`;

      // 把 sessionId 存在sessionStorage中
      if(param.accessTocken){
        sessionStorage.setItem("accessTocken", param.accessTocken);
      }

      // 动态设置host
      if(param.domain){
        sessionStorage.setItem("domain", param.domain);
      }

      // 设置菜单选中项
      this.setMenu(param.page);

      // 页面初始化数据
      this.initData();

      // 绑定事件
      this.bindEvent();
    },
    setCurrentPage(name) {
      this.currentMenu = name;
    },
    initData() {
    },
    bindEvent() {
      // 通过bus开放全局可更改菜单选中项事件
      bus.$on('setCurrentMenu', (name, query) =>{
        this.setMenu(name, query);
      });
    },
    setMenu(name, query) {
      // 设置选中菜单及选中菜单需展示的右侧内容
      this.webMenu.forEach(({pageName, srcId}, index) => {
        if(pageName === name) {
          this.currentMenu = index+1;
          if(query){
            this.$router.push({path: srcId, query});
          }else {
            this.$router.push({path: srcId});
          }
        }
      });
    },
    GetUrlParam() {
      let url = location.search;
      let thisParam = new Object();
      // 判断是否存在请求的参数
      if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        // 截取所有请求的参数，以数组方式保存
        let strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
          // 获取该参数名称，值。其中值以unescape()方法解码，有些参数会加密
          thisParam[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
      }
      // 返回改参数列表对象
      return thisParam;
    },
  },
  created() {
    this.init();
  }
}
</script>

<style>

.heightWidth100 {
  height: 100%;
  width: 100%
}
.ky-button{
  width: 80px;
  height: 35px;
}

.ky-input-error input{
  border: solid red 1px !important;
}
.ky-select-error{
  border: solid red 1px;
}


/**
  以下为卡片后台项目级覆盖iview样式, 请写清用意
*/

/* increaseForm.vue用于input框中，判断输入id是否合法 */
.ivu-icon-close-round:before {
  color: red;
}
.ivu-icon-checkmark-round:before {
  color: green;
}

</style>
