<template>
  <Submenu :name="bindData.index+''">
    <template slot="title">
      <Icon type="stats-bars"></Icon>
      <span class="layout-text">{{bindData.nodeName}}</span>
    </template>
    <Menu-group v-for="(item, idx) in bindData.childList" :key="item" :title="item.nodeName" class="layout-text">
      <Menu-item v-for="(child, index) in item.childList" :key="item" :name="bindData.index + '-' + idx + '-' + index" class="layout-text" @click.native="menuClick(child.srcId, child.isWeb, child.pageName)">{{child.nodeName}}</Menu-item>
    </Menu-group>
  </Submenu>
</template>

<script>
export default {
  name: 'ThreeLevel',
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
