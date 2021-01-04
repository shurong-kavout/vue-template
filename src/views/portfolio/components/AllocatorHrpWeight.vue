<template>
  <el-form label-position="top">
    <el-form-item label="window_lookback">
      <el-slider
        v-model="window_lookback"
        :min="opt.window_lookback.min_value"
        :max="opt.window_lookback.max_value"
        :step="opt.window_lookback.step"
      />
    </el-form-item>
    <el-form-item label="debug_level">
      <el-select v-model="debug_level" placeholder="Select" size="medium">
        <el-option v-for="item in opt.debug_level" :key="item" :value="item" />
      </el-select>
    </el-form-item>
    <!-- <pre>{{ window_lookback }}</pre> -->
  </el-form>
</template>

<script>
export default {
  name: 'HrpWeight',
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
    window_lookback: {
      immediate: true,
      handler(val) { this.allocatorStore.hrp_weight.window_lookback = val }
    },
    debug_level: {
      immediate: true,
      handler(val) { this.allocatorStore.hrp_weight.debug_level = val }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-select {
  display: flex;
}
</style>
