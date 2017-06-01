<template>
  <div >
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
      },
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

</style>
