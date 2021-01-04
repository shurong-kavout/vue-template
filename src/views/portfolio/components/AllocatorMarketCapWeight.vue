<template>
  <el-form-item label="debug_level">
    <el-select v-model="debug_level" placeholder="Select" size="medium">
      <el-option v-for="item in opt.debug_level" :key="item" :value="item" />
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'AllocatorMarket',
  inject: ['allocatorStore'],
  props: {
    opt: {
      type: Object,
      required: true
    },
    val: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      ...this.val
    }
  },
  watch: {
    debug_level: {
      immediate: true,
      handler(val) { this.allocatorStore.market_cap_weight.debug_level = val }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  display: flex;
}
</style>
