<template>
  <Menu-item :name="bindData.index+''" @click.native="menuClick(bindData.url, bindData.isWeb, bindData.pageName)">
    <Icon type="heart" style="margin-right: 5px;"></Icon>
    <label class="layout-text">{{bindData.nodeName}}</label>
  </Menu-item>
</template>

<script>
export default {
  name: 'OneLevel',
  props: ["bindData", "menuItemClick"],
  data () {
    return {
    }
  },
  methods: {
    init(){
    },
    menuClick(url, isWeb, name) {
      this.$emit('menuItemClick', url, isWeb, name);
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>
