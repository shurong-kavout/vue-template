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
      <el-form ref="form" label-position="top">
        <el-form-item>{{ factorsSelected.length ? factorsSelected : '[ ]' }}</el-form-item>
        <el-form-item>
          <el-button v-show="enhance_factors.length" plain @click="onClear">Clear</el-button>
          <el-button v-show="factorsSelected.length" plain @click="onReset">Reset</el-button>
          <el-button v-show="factorsSelected.length" plain type="primary" @click="onPush">Push</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template>
      <h5>Enhance Factors</h5>
      <el-checkbox-group v-model="enhance_factors">
        <el-checkbox v-for="item in enhance_factors" :key="String(item)" :label="item" />
      </el-checkbox-group>
      <div v-show="!enhance_factors.length" style="height: 20px;">[ ]</div>
    </template>

    <template>
      <h5>pick_num</h5>
      <el-slider
        v-model="pick_num"
        :min="pickNumOptions.min_value"
        :max="pickNumOptions.max_value"
        :step="pickNumOptions.step"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'FactorsCompositeEnhance',
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
    dataEnhanceFactors: {
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
      factorsSelected: [],
      enhance_factors: this.dataEnhanceFactors,
      pick_num: this.dataPickNum
    }
  },
  watch: {
    enhance_factors: {
      deep: true,
      immediate: true,
      handler: function (val) { this.selectorStore.multifactor_composite.enhance_factors = val }
    },
    pick_num: {
      immediate: true,
      handler: function (val) { this.selectorStore.multifactor_composite.pick_num = val }
    }
  },
  mounted() {},
  methods: {
    onPush() {
      const newItem = this.factorsSelected
      const isExist = !!this.enhance_factors.find(item => {
        return String(item) === String(newItem)
      })
      if (isExist) {
        return
      }
      this.enhance_factors.splice(0, 0, newItem)
    },
    onReset() {
      this.factorsSelected = []
    },
    onClear() {
      this.enhance_factors = []
    }
  }
}
</script>

<style lang="scss">
// 特别注意：.el-checkbox__label 放在 scoped 中无法生效
.el-checkbox__label {
  display: inline;
}
</style>

<style lang="scss" scoped>
.el-select {
  display: flex;
}

.el-input-number.el-input-number--medium {
  width: 300px;
}

.el-checkbox-group {
  overflow: scroll;

  .el-checkbox,
  .el-checkbox__input {
    white-space: normal;
  }
}
</style>
