<template>
  <div >
    <hello></hello>
  </div>
</template>

<script>

import Hello from '../components/Hello';

export default {
  name: 'Index',
  data() {
    return {
      msg: '',
    }
  },
  methods: {
    init() {
      console.log('项目初始化');
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

<style>

</style>
