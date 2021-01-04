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
        <el-divider />

        <selector :options="options.selector" :params="selector" />
        <el-divider />

        <allocator :options="options.allocator" :params="allocator" />
        <el-divider />

        <backtester :options="options.backtester" :params="backtester" />

        <el-button plain @click="debug">Debug</el-button>
        <!-- <el-button type="primary" @click="fetchData">Submit</el-button> -->
      </el-form>
    </left-panel>
    <!-- 数据主区 -->
    <div class="main-panel">
      <section class="section">
        <h3>日级收益数据</h3>
        <el-table :data="returns" height="400">
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="strategy" label="Strategy" />
          <el-table-column prop="BENCHMARK" label="BENCHMARK" />
          <div slot="empty"></div>
        </el-table>
      </section>

      <section class="section">
        <h3>日级累计收益图</h3>
        <div class="highcharts-container">
          <highcharts v-if="return_curve" :options="chartOptions" />
        </div>
      </section>

      <section class="section">
        <h3>年级回测数据</h3>
        <el-table :data="y_returns">
          <el-table-column v-for="item in y_returns_rows" :key="item" :prop="item" :label="item" />
          <div slot="empty"></div>
        </el-table>
      </section>

      <section class="section">
        <h3>月级回测数据</h3>
        <el-table :data="m_returns" :header-row-style="{'text-transform':'capitalize'}">
          <el-table-column
            v-for="item in m_returns_rows"
            :key="item"
            :prop="item"
            :label="item"
            :fixed="item=='year'"
          />
          <div slot="empty"></div>
        </el-table>
      </section>

      <section class="section">
        <h3>调仓数据</h3>
        <el-table :data="pd_weight" height="400" :show-header="false">
          <el-table-column
            v-for="item in pd_weight_rows"
            :key="item"
            :prop="item"
            :label="item"
            :fixed="item=='date'"
          >
            <template v-slot="slotProps">
              <strong>{{ slotProps.row[item].split(':')[0] }}</strong>
              <br />
              <em>{{ slotProps.row[item].split(':')[1] }}</em>
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
import { Chart } from 'highcharts-vue'
import LeftPanel from './components/LeftPanel'
import options from './constant/form-options'
import params from './constant/default-backtester'
import Selector from './components/Selector'
import Allocator from './components/Allocator'
import Backtester from './components/Backtester'

import { selectorStore, allocatorStore, backtesterStore } from './store/backtesting'
import { fetchBacktesting } from '@/api/backtesting'

export default {
  name: 'Backtesting',

  components: {
    LeftPanel,
    Selector,
    Allocator,
    Backtester,
    highcharts: Chart
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
      strategy_region, strategy_universe,
      selector, backtester, allocator
    } = params

    return {
      universe: [strategy_region, strategy_universe[strategy_region]],
      selector, backtester, allocator,
      apiParams: null,
      returns: [],
      y_returns: [],
      m_returns: [],
      pd_weight: [],
      return_curve: ''
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
    },

    m_returns_rows() {
      if (this.m_returns[0]) {
        return Object.keys(this.m_returns[0])
      }
      return []
    },

    y_returns_rows() {
      if (this.y_returns[0]) {
        return Object.keys(this.y_returns[0])
      }
      return []
    },

    pd_weight_rows() {
      if (this.pd_weight[0]) {
        return Object.keys(this.pd_weight[0])
      }
      return []
    },

    chartOptions() {
      if (!this.return_curve) {
        return {}
      }
      const options = this.return_curve
      const isString = typeof options === 'string'
      return isString ? JSON.parse(options) : options
    }

  },

  methods: {
    assembleParams() {
      const [strategy_region, strategy_universe] = this.universe
      const { name: selectorName, is_enhance, ...selectorMap } = selectorStore
      const { name: allocatorName, ...allocatorMap } = allocatorStore
      const { name: backtesterName, ...backtesterMap } = backtesterStore

      const selector = selectorMap[selectorName]
      const { factors, enhance_factors } = selector
      delete selector.factors
      delete selector.enhance_factors
      if (is_enhance) {
        Object.assign(selector, {
          name: 'multifactor_enhance',
          is_enhance,
          basic_selector_name: selectorName,
          factors_list: enhance_factors
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

      const backtester = backtesterMap[backtesterName]
      Object.assign(backtester, {
        name: backtesterName
      })

      return {
        strategy_region,
        strategy_universe,
        selector,
        allocator,
        backtester
      }
    },

    debug() {
      this.apiParams = this.assembleParams()
    },

    fetchData() {
      const apiParams = this.assembleParams()
      fetchBacktesting(apiParams).then(resp => {
        if (resp.code === 0) {
          const {
            returns,
            y_returns,
            m_returns,
            pd_weight,
            return_curve
          } = resp.data

          this.returns = returns
          this.y_returns = y_returns
          this.m_returns = m_returns
          this.pd_weight = pd_weight
          this.return_curve = return_curve
        }
      })
    },

    formatter_weight(row, column, cellValue) {
      if (column.property === 'date') {
        return cellValue
      }
      const [symbol, weight] = cellValue.split(':')
      return `${symbol} ${weight}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';

.highcharts-container {
  width: 100%;
  min-height: 400px;
  margin: auto;
}
</style>

