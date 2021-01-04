export { default as selectorStore } from './modules/selector'
export { default as allocatorStore } from './modules/allocator'
export { default as backtesterStore } from './modules/backtester'

export default {
  'app': 'backtesting',
  // 'strategy_name': 'Alpha Strategy',
  'strategy_region': 'US',
  'strategy_universe': {
    'US': 'SPX',
    'USA': 'SPX',
    'CN': '000300'
  }
}
