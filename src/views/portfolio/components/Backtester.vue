<template>
  <div>
    <h3>Backtester</h3>
    <el-form :model="backtester" label-position="top">
      <el-form-item label="backtester_name">
        <el-select v-model="name" placeholder="Select" size="medium">
          <el-option v-for="item in Object.keys(options)" :key="item" :value="item" />
        </el-select>
      </el-form-item>
      <keep-alive>
        <component :is="name|toPascalCase" :opt="options[name]" :val="backtester[name]" />
      </keep-alive>
      <!-- <pre>{{ selector[name] }}</pre> -->
    </el-form>
  </div>
</template>

<script>
import MonthlyRebalance from './BacktesterMonthlyRebalance'
import BiweeklyRebalance from './BacktesterBiweeklyRebalance'

export default {
  name: 'Backtester',
  components: {
    MonthlyRebalance,
    BiweeklyRebalance
  },
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
    return {
      name,
      backtester
    }
  },
  computed: {},
  watch: {
    name: {
      immediate: true,
      handler(val) { this.backtesterStore.name = val }
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
