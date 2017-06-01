<template>
  <div>
    <Dropdown @on-click="dropdownChange($event, bindData.row.id, bindData.index)" trigger="click" style="margin-left: 20px" placement="bottom-end">
      <a href="javascript:void(0)">
        <Icon type="more"></Icon>
      </a>
      <Dropdown-menu slot="list" >
        <Dropdown-item v-for="item in bindData.menu" :key="item" :name="item">{{item}}</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'DropdownMore',
  props: ["bindData"],
  data () {
    return {
    }
  },
  methods: {
    dropdownChange(type, id, index) {
      this.$emit('dropdownChange', type, id, index);
    }
  }
}
</script>

<style scoped>

</style>
