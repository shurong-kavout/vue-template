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
    <el-form-item label="AA_B">
      <el-slider
        v-model="AA_B"
        :min="opt.AA_B.min_value"
        :max="opt.AA_B.max_value"
        :step="opt.AA_B.step"
      />
    </el-form-item>
    <el-form-item label="debug_level">
      <el-select v-model="debug_level" placeholder="Select" size="medium">
        <el-option v-for="item in opt.debug_level" :key="item" :value="item" />
      </el-select>
    </el-form-item>
    <!-- <pre>{{ AA_B }}</pre> -->
  </el-form>
</template>

<script>
export default {
  name: 'VaaWeight',
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
      handler(val) { this.allocatorStore.vaa_weight.cash_universe = val }
    },
    AA_T: {
      immediate: true,
      handler(val) { this.allocatorStore.vaa_weight.AA_T = val }
    },
    AA_B: {
      immediate: true,
      handler(val) { this.allocatorStore.vaa_weight.AA_B = val }
    },
    debug_level: {
      immediate: true,
      handler(val) { this.allocatorStore.vaa_weight.debug_level = val }
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
