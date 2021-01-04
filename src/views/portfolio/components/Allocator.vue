<template>
  <div>
    <h3>Allocator</h3>
    <el-form :model="allocator" label-position="top">
      <el-form-item label="allocator_name">
        <el-select v-model="name" placeholder="Select" size="medium">
          <el-option v-for="item in Object.keys(options)" :key="item" :value="item" />
        </el-select>
      </el-form-item>
      <keep-alive>
        <component :is="name|toPascalCase" :opt="options[name]" :val="allocator[name]" />
      </keep-alive>
      <!-- <pre>{{ selector[name] }}</pre> -->
    </el-form>
  </div>
</template>

<script>
import EqualWeight from './AllocatorEqualWeight'
import MarketCapWeight from './AllocatorMarketCapWeight'
import HrpWeight from './AllocatorHrpWeight'
import VaaWeight from './AllocatorVaaWeight'
import PaaWeight from './AllocatorPaaWeight'

export default {
  name: 'Allocator',
  components: {
    EqualWeight,
    MarketCapWeight,
    HrpWeight,
    VaaWeight,
    PaaWeight
  },
  inject: ['allocatorStore'],
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
    const { name, ...allocator } = this.params
    return {
      name,
      allocator
    }
  },
  // computed: {
  //   option() {
  //     return this.options[this.name]
  //   }
  // },
  watch: {
    name: {
      immediate: true,
      handler(val) { this.allocatorStore.name = val }
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
