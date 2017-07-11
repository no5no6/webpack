<template>
  <div class="page-layout">
    GlobalCards页面
    <hello></hello>
  </div>
</template>

<script>
import Hello from '@/components/Hello';

export default {
  name: 'GlobalCards',
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
    Hello
  }
}
</script>

<style scoped>
  .page-layout {
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
