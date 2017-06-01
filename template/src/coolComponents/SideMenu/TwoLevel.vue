<template>
  <Submenu :name="bindData.index+''" width="100%">
    <template slot="title">
      <Icon type="ios-paper"></Icon>
      <span class="layout-text">{{bindData.nodeName}}</span>
    </template>
    <Menu-item v-for="(item, index) in bindData.childList" :key="item" :name="bindData.index  + '-' + index" class="layout-text" @click.native="menuClick(item.srcId, item.isWeb, item.pageName)">{{item.nodeName}}</Menu-item>
  </Submenu>
</template>

<script>
export default {
  name: 'TwoLevel',
  props: ["bindData"],
  data () {
    return {
    }
  },
  methods: {
    menuClick(url, isWeb, name) {
      this.$emit('menuItemClick', url, isWeb, name);
    }
  }
}
</script>

<style scoped>

</style>
