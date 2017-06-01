<template>
  <div class="layout heightWidth100" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex" class="heightWidth100">
      <Col :flex-shrink="1" :span="spanLeft" class="layout-menu-left">{{menuName}}
        <Menu ref="leftMenu" :active-name="menuName+''" theme="dark" accordion style="width:100%">
          <div class="layout-logo-left">
            <img src="../../assets/logo.png" />
          </div>
          <div v-for="({childList, nodeName, srcId, isWeb, pageName}, index) in menu" :key="index" >
            <!-- 渲染只有一级节点的菜单 -->
            <one-level v-if="!childList" @menuItemClick="menuItemClick" :bindData="{nodeName, index: index+1, url: srcId, isWeb, pageName}"></one-level>
            <!--  渲染有三级节点的菜单 -->
            <three-level v-if="childList && childList[0].childList" @menuItemClick="menuItemClick" :bindData="{nodeName:nodeName, index: index+1, childList, isWeb, pageName}"></three-level>
            <!-- 渲染有二级节点的菜单 -->
            <two-level v-else-if="childList" @menuItemClick="menuItemClick" :bindData="{nodeName, index: index+1, childList, isWeb, pageName}"></two-level>
          </div>
        </Menu>
      </Col>
      <Col :span="spanRight" :flex-shrink='0' class="page-right">
        <Row type="flex" align="middle" justify="space-between" class="layout-header">
          <Col>
            <!-- <Button type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </Button> -->
          </Col>
          <Col style="margin-right: 40px;">
            <label>{{userName}}</label>
          </Col>
        </Row>
        <div class="layout-content ">
          <router-view></router-view>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>

import OneLevel from './OneLevel';
import TwoLevel from './TwoLevel';
import ThreeLevel from './ThreeLevel';

export default {
  name: 'SideMenu',
  props: ["webMenu", 'apiUrl', 'currentMenu'],
  data(){
    return {
      spanLeft: 4,
      spanRight: 20,
      menu: [],
      userName: '请登录',
      abc: this.currentMenu
    }
  },
  methods: {
    init() {
      this.initData();
      this.bindEvent();
    },
    initData() {
      this.getList().then(({data}) => {
        console.log(data, 'xlxlxlxl');
        this.menu = this.webMenu.concat(data.authList);
        this.userName = data.userName;

        // for循环出的左侧菜单必须用此方式指定默认选中菜单
        this.$nextTick(() => {
          this.$refs.leftMenu.updateActiveName();
        });

        this.$Loading.finish();
      });
    },
    bindEvent() {

    },
    menuItemClick(url, isWeb, name) {
      if(isWeb){
        // 点击切换菜单后更改当前菜单name
        this.menu.forEach((item, index) => {
          if(name === item.pageName) {
            // 触发父组件setCurrentPage事件，更改当前选中菜单
            this.$emit('setCurrentPage', index + 1 + '')
          }
        });

        this.$router.push({path: url});
      }else {
        // TODO hack，切换菜单跳转老项目选中状态还未完整渲染完dom就已经跳转。这里用setTimeout做个延时。如果以后有更好办法再更换。
        setTimeout(() => {window.location.href = `${this.$kuyun.host}/index.jsp?action=${url}`}, 100);
      }

    },
    getList() {
      return new Promise((resolve, reject) => {
        console.log(this.apiUrl, '12312131');
        this.axios.get(this.apiUrl)
          .then(({data}) => {
            if(data.code === '0') {
              this.$Loading.finish();
              resolve(data);
            }else if(data.code === '403') {
              window.location.href = `${this.$kuyun.host}/clearLogin`;
            }else {
              this.$Loading.error();
            }
          })
          .catch( (error) => {
            this.$Loading.error();
            resolve();
          });
      });
    },
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 1;
        this.spanRight = 23;
      } else {
        this.spanLeft = 4;
        this.spanRight = 19;
      }
    },
  },
  mounted() {
    this.init();
  },
  components: {
    OneLevel,
    TwoLevel,
    ThreeLevel
  },
  computed: {
    menuName() {
      console.log(this.currentMenu, '333this.currentMenu');
      return this.currentMenu;
    }
  },
}
</script>

<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        /*overflow: hidden;*/
        overflow-x: scroll;
        min-width: 1440px;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    /*.page-right {
      overflow-x: scroll;
    }*/
    .layout-content{
        margin: 30px;
        /*overflow-x: scroll;*/

        /*background: #fff;*/
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        /*max-width: 270px;*/
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        /*width: 150px;*/

        height: 80px;
        /*background: #5b6270;*/
        border-radius: 3px;
        /*float:left;*/
        width: 100%;
        /*margin: 15px auto;*/
        margin-top: 15px;
        /*display: inline-block;*/
    }
    .layout-logo-left > img{
        /*width: 150px;*/
        margin-left: 70px;
        width: 80px;
        height: 61px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .sidebar-left{
      /*min-width: 55px;*/
    }
    .layout-content {
      /*height: 95%;*/
      overflow-y: scroll
    }

    /** 覆盖样式 */
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
      background: none!important;
      color: #39f;
    }
    .ivu-menu-item-selected::after {
      position: absolute;
      width: 6px;
      height: 100%;
      background: #39f;
      left: 0;
      top: 0;
      content: '';
    }

    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
      border-right: 0px;
    }

    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
      background: none;
    }

</style>
