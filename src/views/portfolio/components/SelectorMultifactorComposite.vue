<template>
  <el-form label-position="top">
    <el-form-item label="lookback（月数）">
      <el-slider
        v-model="lookback"
        :min="opt.lookback.min_value"
        :max="opt.lookback.max_value"
        :step="opt.lookback.step"
        show-stops
      />
    </el-form-item>
    <el-form-item label="chosen_metric">
      <el-select v-model="chosen_metric" placeholder="Select" size="medium">
        <el-option v-for="item in opt.chosen_metric" :key="item" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'MultifactorComposite',
  inject: ['selectorStore'],
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
    lookback: {
      immediate: true,
      handler(val) { this.selectorStore.multifactor_composite.lookback = val }
    },
    chosen_metric: {
      immediate: true,
      handler(val) { this.selectorStore.multifactor_composite.chosen_metric = val }
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
