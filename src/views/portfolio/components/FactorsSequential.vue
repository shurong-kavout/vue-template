<template>
  <div>
    <template>
      <h5>Factors</h5>
      <el-select
        v-model="factorsSelected"
        placeholder="Select"
        size="medium"
        :multiple-limit="5"
        multiple
        filterable
        clearable
      >
        <el-option v-for="item in factorsOptions" :key="item" :value="item" />
      </el-select>
      <el-form ref="form" label-position="top" :model="picknums">
        <el-form-item v-for="[k, v] in Object.entries(picknums)" :key="k" :label="k">
          <el-input-number
            :key="k + v"
            v-model="picknums[k]"
            :min="pickNumOptions.min_value"
            :max="pickNumOptions.max_value"
            :step="pickNumOptions.step"
            size="medium"
          />
        </el-form-item>
      </el-form>
    </template>
    <!-- <pre>picknums: {{ picknums }}</pre> -->
    <!-- <pre>factors: {{ factors }}</pre> -->
  </div>
</template>

<script>
export default {
  name: 'FactorsSequential',
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
    }
  },
  data() {
    return {
      factorsSelected: this.dataFactors.map(item => item[0]),
      picknums: this.dataFactors.reduce((o, [k, v]) => {
        o[k] = v
        return o
      }, {})
    }
  },
  computed: {
    factors() {
      return Object.entries(this.picknums)
    }
  },
  watch: {
    factorsSelected: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        const autoVal = i => {
          const factorCount = Object.keys(this.picknums).length
          if (factorCount > 0) {
            return Math.min(...Object.values(this.picknums))
          }
          return 60
        }

        this.picknums = this.factorsSelected.reduce((o, k, i) => {
          o[k] = this.picknums[k] ? this.picknums[k] : Math.max(autoVal() - 10, 5)
          return o
        }, {})
      }
    },
    picknums: {
      deep: true,
      immediate: true,
      handler: function (val) { this.selectorStore.multifactor_sequential.factors = Object.entries(val) }
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

.el-input-number.el-input-number--medium {
  width: 300px;
}
</style>
