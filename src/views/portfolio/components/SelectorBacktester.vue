<template>
  <div>
    <el-form :model="monthly_rebalance" label-position="top">
      <el-form-item label="backtester_name">
        <el-select v-model="name" placeholder="Select" size="medium">
          <el-option v-for="item in Object.keys(options)" :key="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item v-show="name === 'monthly_rebalance'" label="rebalance_offset">
        <el-slider
          v-model="monthly_rebalance.rebalance_offset"
          :min="opt.rebalance_offset.min_value"
          :max="opt.rebalance_offset.max_value"
          :step="opt.rebalance_offset.step"
        />
      </el-form-item>
      <el-form-item v-show="name === 'biweekly_rebalance'" label="rebalance_offset">
        <el-slider
          v-model="biweekly_rebalance.rebalance_offset"
          :min="opt.rebalance_offset.min_value"
          :max="opt.rebalance_offset.max_value"
          :step="opt.rebalance_offset.step"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SelectorBacktester',
  inject: ['backtesterStore'],
  props: {
    options: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    const { name, ...backtester } = this.params
    const { monthly_rebalance, biweekly_rebalance } = backtester
    return {
      name,
      monthly_rebalance,
      biweekly_rebalance
    }
  },
  computed: {
    opt() {
      return this.options[this.name]
    }
  },
  watch: {
    'name': {
      immediate: true,
      handler(val) { this.backtesterStore.name = val }
    },
    'monthly_rebalance': {
      immediate: true,
      handler(val) { this.backtesterStore.monthly_rebalance = val }
    },
    'biweekly_rebalance': {
      immediate: true,
      handler(val) { this.backtesterStore.biweekly_rebalance = val }
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
