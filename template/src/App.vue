<template>
  <div id="app" class="heightWidth100">
    <CoolSideMenu :webMenu="webMenu" :currentMenu="currentMenu" @setCurrentPage="setCurrentPage" @setWebMenu="setWebMenu"></CoolSideMenu>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      host:'',
      apiUrl: '',
      currentMenu: '',
      nodeName: '',
      webMenu: [
        {
          id: 10001,
          nodeName: "WEB模块化卡片",
          srcId: '/globalcards?web=true'
        },
        {
          id: 10002,
          nodeName: "WEB针对栏目",
          srcId: '/columnlist?web=true'
        }
      ]
    }
  },
  methods: {
    init() {

      // 全局提示设置
      this.$Message.config({
          // top: 50,
          duration: 4
      });

      let param = this.GetUrlParam();
      console.log(param, 'url-param');
      // 设置host
      this.$kuyun.host = param.domain ? `http://${param.domain}` : `http://${sessionStorage.getItem("domain")}`;

      //设置  获取的广告计划id
      this.$kuyun.campaignId = param.campaignId;

      //设置没有ad级的路径 传给后台  组件接收host
      this.host = param.domain ? `http://${param.domain}` : `http://${sessionStorage.getItem("domain")}`;

      // 设置左侧菜单 (需要传递给组件 <CoolSideMenu :apiUrl="apiUrl" ></CoolSideMenu>)
      this.apiUrl = `${this.$kuyun.host}/getMenuInfo`;

      // 把 sessionId 存在sessionStorage中
      if(param.accessTocken){
        sessionStorage.setItem("accessTocken", param.accessTocken);
      }

      // 动态设置host
      if(param.domain){
        sessionStorage.setItem("domain", param.domain);
      }

      this.nodeName = param.nodeName;
      this.bindEvent();
    },
    setWebMenu(webMenu) {
      this.setMenu(this.webMenu, this.nodeName);
    },
    setCurrentPage(name) {
      this.currentMenu = name;
    },
    bindEvent() {
    },
    setMenu(webMenu, name, query) {
      // 设置选中菜单及选中菜单需展示的右侧内容
      webMenu.forEach(({nodeName, srcId}, index) => {
        console.log(nodeName, '    ',name);
        if(nodeName === name) {
          this.currentMenu = index;
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
          //thisParam[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          thisParam[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
      }
      // 返回改参数列表对象
      return thisParam;
    }
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

  body {
    overflow: hidden;
  }

  .every-page {
    margin:20px;
  }


  /*去掉左侧菜单ul的背景色*/
  .ivu-menu-dark{
    background: none !important;
  }

</style>
