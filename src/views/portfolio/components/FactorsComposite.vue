<template>
  <div>
    <h5>Factors</h5>
    <el-select
      v-model="factors"
      placeholder="Select"
      size="medium"
      :multiple-limit="5"
      multiple
      filterable
      clearable
    >
      <el-option v-for="item in factorsOptions" :key="item" :value="item" />
    </el-select>
    <template>
      <h5>pick_num</h5>
      <el-slider
        v-model="pick_num"
        :min="pickNumOptions.min_value"
        :max="pickNumOptions.max_value"
        :step="pickNumOptions.step"
      />
    </template>
    <!-- <pre>{{ factors }}</pre>
    <pre>{{ pick_num }}</pre>-->
  </div>
</template>

<script>
export default {
  name: 'FactorsComposite',
  inject: ['selectorStore'],
  props: {
    factorsOptions: {
      type: Array,
      default() {
        return []
      }
    },
    pickNumOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    dataFactors: {
      type: Array,
      default() {
        return []
      }
    },
    dataPickNum: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      factors: this.dataFactors,
      pick_num: this.dataPickNum
    }
  },
  watch: {
    factors: {
      deep: true,
      immediate: true,
      handler: function (val) { this.selectorStore.multifactor_composite.factors = val }
    },
    pick_num: {
      immediate: true,
      handler: function (val) { this.selectorStore.multifactor_composite.pick_num = val }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-select {
  display: flex;
}

.el-checkbox-group {
  overflow: scroll;
}
</style>
