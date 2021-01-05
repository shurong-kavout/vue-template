<template>
  <div>
    <h3>Selector</h3>
    <el-form :model="selector" label-position="top">
      <el-form-item label="selector_name">
        <el-select v-model="name" placeholder="Select" size="medium">
          <el-option v-for="item in Object.keys(options)" :key="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="is_enhance">multifactor_enhance</el-checkbox>
      </el-form-item>

      <slot v-if="is_enhance" name="backtester"></slot>

      <keep-alive>
        <component :is="name|toPascalCase" :opt="options[name]" :val="selector[name]" />
      </keep-alive>

      <template v-if="name === 'multifactor_sequential'">
        <factors-sequential-enhance
          v-if="is_enhance"
          :factors-options="options.multifactor_sequential.factors"
          :pick-num-options="options.multifactor_sequential.pick_num"
          :data-enhance-factors="selector.multifactor_sequential.enhance_factors"
        />
        <factors-sequential
          v-else
          :factors-options="options.multifactor_sequential.factors"
          :pick-num-options="options.multifactor_sequential.pick_num"
          :data-factors="selector.multifactor_sequential.factors"
        />
      </template>

      <template v-if="name === 'multifactor_composite'">
        <factors-composite-enhance
          v-if="is_enhance"
          :factors-options="options.multifactor_composite.factors"
          :pick-num-options="options.multifactor_composite.pick_num"
          :data-enhance-factors="selector.multifactor_composite.enhance_factors"
          :data-pick-num="selector.multifactor_composite.pick_num"
        />
        <factors-composite
          v-else
          :factors-options="options.multifactor_composite.factors"
          :pick-num-options="options.multifactor_composite.pick_num"
          :data-factors="selector.multifactor_composite.factors"
          :data-pick-num="selector.multifactor_composite.pick_num"
        />
      </template>
      <!-- <pre>{{ selector[name] }}</pre> -->
    </el-form>
  </div>
</template>

<script>
import MultifactorSequential from './SelectorMultifactorSequential'
import MultifactorComposite from './SelectorMultifactorComposite'

import FactorsSequential from './FactorsSequential'
import FactorsSequentialEnhance from './FactorsSequentialEnhance'
import FactorsComposite from './FactorsComposite'
import FactorsCompositeEnhance from './FactorsCompositeEnhance'

export default {
  name: 'Selector',
  components: {
    MultifactorSequential,
    MultifactorComposite,
    FactorsSequential,
    FactorsSequentialEnhance,
    FactorsComposite,
    FactorsCompositeEnhance
  },
  inject: ['selectorStore'],
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
    const { name, is_enhance, ...selector } = this.params
    return {
      name,
      is_enhance,
      selector
    }
  },
  watch: {
    name: {
      immediate: true,
      handler(val) { this.selectorStore.name = val }
    },
    is_enhance: {
      immediate: true,
      handler(val) { this.selectorStore.is_enhance = val }
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
