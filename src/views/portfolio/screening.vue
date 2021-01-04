<template>
  <div class="app-container">
    <left-panel>
      <el-form label-position="top">
        <el-form-item label="Region & Universe">
          <el-cascader
            v-model="universe"
            :options="universe_options"
            :props="{ expandTrigger: 'hover' }"
            size="medium"
          />
        </el-form-item>

        <el-form-item label="date">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="Pick a day"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-divider />

        <selector :options="options.selector" :params="selector">
          <template #backtester>
            <selector-backtester :options="options.backtester" :params="backtester" />
          </template>
        </selector>
        <el-divider />

        <allocator :options="options.allocator" :params="allocator" />

        <el-button plain @click="debug">Debug</el-button>
        <!-- <el-button type="primary" @click="fetchData">Submit</el-button> -->
      </el-form>
    </left-panel>
    <!-- 数据主区 -->
    <div class="main-panel">
      <section class="section">
        <el-table :data="data" :header-row-style="{'text-transform':'capitalize'}">
          <el-table-column prop="Symbol" label="Symbol" width="100" fixed />
          <el-table-column prop="stock name" label="stock name" width="110" fixed />
          <el-table-column prop="close price" label="close price" width="100" />
          <el-table-column prop="latest weekly return" label="latest weekly return" width="180" />
          <el-table-column prop="latest monthly return" label="latest monthly return" width="180" />
          <el-table-column prop="sector" label="sector" width="100" />
          <el-table-column prop="market cap" label="market cap" width="120" />
          <el-table-column prop="link" label="link">
            <template v-slot="slotProps">
              <el-link
                :href="slotProps.row.link"
                target="_blank"
                type="primary"
              >{{ slotProps.row.link }}</el-link>
            </template>
          </el-table-column>
          <div slot="empty"></div>
        </el-table>
      </section>

      <section class="section">
        <pre>{{ apiParams }}</pre>
      </section>
    </div>
  </div>
</template>

<script>
import LeftPanel from './components/LeftPanel'
import options from './constant/form-options'
import params from './constant/default-screener'
import Selector from './components/Selector'
import Allocator from './components/Allocator'
import SelectorBacktester from './components/SelectorBacktester'

import { deepClone } from '@/utils'
import { selectorStore, allocatorStore, backtesterStore } from './store/screening'
import { fetchScreening } from '@/api/screening'

export default {
  name: 'Screening',

  components: {
    LeftPanel,
    Selector,
    Allocator,
    SelectorBacktester
  },

  provide() {
    return {
      selectorStore, allocatorStore, backtesterStore
    }
  },

  props: {
    options: {
      type: Object,
      default() {
        return options
      }
    }
  },

  data() {
    const {
      strategy_region, strategy_universe, date,
      selector, backtester, allocator
    } = params
    return {
      universe: [strategy_region, strategy_universe[strategy_region]], date,
      selector, backtester, allocator,
      apiParams: null,
      data: []
    }
  },

  computed: {
    universe_options() {
      return options.strategy_region.map(region => {
        const universeMap = options.strategy_universe[region]
        const universe = Object.entries(universeMap).map(([value, label]) => ({ value, label }))
        return {
          value: region,
          label: region,
          children: universe
        }
      })
    }
  },

  methods: {
    assembleParams() {
      const [strategy_region, strategy_universe] = this.universe
      const date = this.date
      const { name: selectorName, is_enhance, ...selectorMap } = deepClone(selectorStore)
      const { name: allocatorName, ...allocatorMap } = allocatorStore

      const selector = selectorMap[selectorName]
      const { factors, enhance_factors } = selector
      delete selector.factors
      delete selector.enhance_factors
      if (is_enhance) {
        const { name: basic_backtester_name, ...backtesterMap } = backtesterStore
        const backtester = backtesterMap[basic_backtester_name]
        Object.assign(selector, {
          name: 'multifactor_enhance',
          is_enhance,
          basic_selector_name: selectorName,
          factors_list: enhance_factors,
          basic_backtester_name,
          ...backtester
        })
      } else {
        Object.assign(selector, {
          name: selectorName,
          is_enhance,
          factors
        })
      }

      const allocator = allocatorMap[allocatorName]
      Object.assign(allocator, {
        name: allocatorName
      })

      return {
        strategy_region,
        strategy_universe,
        date,
        selector,
        allocator
      }
    },

    debug() {
      this.apiParams = this.assembleParams()
    },

    async fetchData() {
      const apiParams = this.assembleParams()
      const resp = await fetchScreening(apiParams)
      if (resp) {
        if (resp.code === 0) {
          this.data = resp.data
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

