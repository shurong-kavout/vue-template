<template>
  <el-form label-position="top">
    <el-form-item label="date_range">
      <el-date-picker
        v-model="date_range"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item label="transaction_cost">
      <el-slider
        v-model="transaction_cost"
        :min="opt.transaction_cost.min_value"
        :max="opt.transaction_cost.max_value"
        :step="opt.transaction_cost.step"
      />
    </el-form-item>
    <el-form-item label="debug_level">
      <el-select v-model="debug_level" placeholder="Select" size="medium">
        <el-option v-for="item in opt.debug_level" :key="item" :value="item" />
      </el-select>
    </el-form-item>
    <!-- <pre>{{ date_range }}</pre>
    <pre>{{ rebalance_offset }}</pre>-->
  </el-form>
</template>

<script>
export default {
  name: 'BiweeklyRebalance',
  inject: ['backtesterStore'],
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
    const { start_date, end_date } = this.val
    return {
      ...this.val,
      date_range: [start_date, end_date]
    }
  },
  computed: {
    sliders() {
      return ['transaction_cost', 'leverage']
    }
  },
  watch: {
    date_range: {
      immediate: true,
      handler([start_date = '', end_date = '']) {
        this.backtesterStore.biweekly_rebalance.start_date = start_date
        this.backtesterStore.biweekly_rebalance.end_date = end_date
      }
    },
    transaction_cost: {
      immediate: true,
      handler(val) { this.backtesterStore.biweekly_rebalance.transaction_cost = val }
    },
    leverage: {
      immediate: true,
      handler(val) { this.backtesterStore.biweekly_rebalance.leverage = val }
    },

    debug_level: {
      immediate: true,
      handler(val) { this.backtesterStore.biweekly_rebalance.debug_level = val }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-select {
  display: flex;
}

.el-date-editor--daterange.el-input__inner {
  width: 300px;
}
</style>
