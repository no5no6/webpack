<template>
  <div class="page-layout">
    ColumnList页面
  </div>
</template>

<script>

export default {
  name: 'ColumnList',
  data() {
    return {
    }
  },
  methods: {
    init() {
      this.initData();
      this.bindEvent();
    },
    initData() {
    },
    bindEvent() {
    }
  },
  mounted() {
    this.init();
  },
  components: {
  }

}
</script>

<style scoped>
  .page-layout {
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
