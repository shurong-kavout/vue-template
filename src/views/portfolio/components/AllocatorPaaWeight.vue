<template>
  <el-form label-position="top">
    <el-form-item label="cash_universe（尚未支持选取）">
      <el-select
        v-model="cash_universe"
        placeholder="Select"
        size="medium"
        :multiple-limit="3"
        multiple
        disabled
      >
        <el-option v-for="item in opt.cash_universe" :key="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="AA_T">
      <el-slider
        v-model="AA_T"
        :min="opt.AA_T.min_value"
        :max="opt.AA_T.max_value"
        :step="opt.AA_T.step"
      />
    </el-form-item>
    <el-form-item label="AA_a">
      <el-slider
        v-model="AA_a"
        :min="opt.AA_a.min_value"
        :max="opt.AA_a.max_value"
        :step="opt.AA_a.step"
      />
    </el-form-item>
    <el-form-item label="window_lookback">
      <el-slider
        v-model="window_lookback"
        :min="opt.min_value"
        :max="opt.max_value"
        :step="opt.step"
      />
    </el-form-item>
    <el-form-item label="use_breath_mom">
      <el-radio v-model="use_breath_mom" label="False">False（采用 sma 来作为 mom）</el-radio>
      <el-radio v-model="use_breath_mom" label="True">True（采用 breath_mom）</el-radio>
    </el-form-item>
    <el-form-item label="debug_level">
      <el-select v-model="debug_level" placeholder="Select" size="medium">
        <el-option v-for="item in opt.debug_level" :key="item" :value="item" />
      </el-select>
    </el-form-item>
    <!-- <pre>{{ use_breath_mom }}</pre> -->
  </el-form>
</template>

<script>
export default {
  name: 'PaaWeight',
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
    cash_universe: {
      immediate: true,
      handler(val) { this.allocatorStore.paa_weight.cash_universe = val }
    },
    AA_T: {
      immediate: true,
      handler(val) { this.allocatorStore.paa_weight.AA_T = val }
    },
    AA_a: {
      immediate: true,
      handler(val) { this.allocatorStore.paa_weight.AA_a = val }
    },
    window_lookback: {
      immediate: true,
      handler(val) { this.allocatorStore.paa_weight.window_lookback = val }
    },
    use_breath_mom: {
      immediate: true,
      handler(val) { this.allocatorStore.paa_weight.use_breath_mom = val }
    },
    debug_level: {
      immediate: true,
      handler(val) { this.allocatorStore.paa_weight.debug_level = val }
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
