<template>
  <div>
    <Poptip trigger="hover" placement="right" >
      <div v-for="(item, index) in bindData.content" :key="item">
        <label v-if="index < bindData.limitShowRow">{{getContent(item)}}</label>
      </div>
      <div slot="content">
        <div v-for="item in bindData.content" :key="item">{{getContent(item)}}</div>
      </div>
    </Poptip>
  </div>
</template>

<script>
export default {
  name: 'LimitRowTableCol',
  props: ["bindData"],
  data () {
    return {
    }
  },
  methods: {
    getContent(obj) {
      return this.bindData.contentKey.reduce((memo, key, index) => {
        memo += obj[key];
        if(index !== this.bindData.contentKey.length - 1){
          memo += '-';
        }
        return memo;
      }, '');
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
