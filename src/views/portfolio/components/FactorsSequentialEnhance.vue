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
          <el-input-number :key="k + v" v-model="picknums[k]" size="medium" />
        </el-form-item>
        <el-form-item>
          <div v-show="!factorsSelected.length" style="height: 20px; margin-bottom: 30px">[ ]</div>
          <el-button v-show="enhance_factors.length" plain @click="onClear">Clear</el-button>
          <el-button v-show="factorsSelected.length" plain @click="onReset">Reset</el-button>
          <el-button v-show="factorsSelected.length" plain type="primary" @click="onPush">Push</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template>
      <h5>Enhance Factors</h5>
      <el-checkbox-group v-model="enhance_factors">
        <el-checkbox
          v-for="item in enhance_factors"
          :key="String(item)"
          :title="item"
          :label="item"
          :max="5"
        />
      </el-checkbox-group>
      <div v-show="!enhance_factors.length" style="height: 20px">[ ]</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FactorsSequentialEnhance',
  inject: ['selectorStore'],
  props: {
    factorsOptions: {
      type: Array,
      default() {
        return []
      }
    },
    dataEnhanceFactors: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      factorsSelected: [],
      enhance_factors: this.dataEnhanceFactors,
      picknums: {}
    }
  },
  watch: {
    factorsSelected: {
      // deep: true,
      // immediate: true,
      handler: function (newVal, oldVal) {
        this.picknums = this.factorsSelected.reduce((o, k, i) => {
          o[k] = Math.max(50 - i * 10, 5)
          return o
        }, {})
      }
    },
    enhance_factors: {
      // deep: true,
      immediate: true,
      handler(val) { this.selectorStore.multifactor_sequential.enhance_factors = val }
    }
  },
  mounted() {},
  methods: {
    onPush() {
      const newItem = Object.entries(this.picknums)
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
