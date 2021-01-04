const params = {
  'app': 'screening',
  // 'strategy_name': 'Alpha Strategy',
  'strategy_region': 'US',
  'strategy_universe': {
    'US': 'SPX',
    'USA': 'SPX',
    'CN': '000300'
  },
  'date': '2017-01-01',
  'selector': {
    'name': 'multifactor_sequential',
    'is_enhance': false,
    // 顺序因子选股
    'multifactor_sequential': {
      'lookback': 12,
      'chosen_metric': 'cagr_dd',
      'factors': [
        ['kscore', 20],
        ['vc_1', 10],
        ['quality_score', 5]
      ],
      'enhance_factors': [
        // 🙅
        [['kscore', 20], ['vc_1', 10]],
        [['quality_score', 5]]
      ]
    },
    // 混合因子选股
    'multifactor_composite': {
      'pick_num': 5,
      'lookback': 12,
      'chosen_metric': 'cagr_dd',
      'factors': [
        'kscore',
        'vc_1',
        'quality_score'
      ],
      'enhance_factors': [
        // 🙅
        ['kscore', 'vc_1'],
        ['quality_score']
      ]
    }
  },
  'allocator': {
    'name': 'equal_weight',
    'equal_weight': {
      'debug_level': 0
    },
    'market_cap_weight': {
      'debug_level': 0
    },
    'hrp_weight': {
      'window_lookback': 6, // 表示多少个月
      'debug_level': 0
    },
    'vaa_weight': {
      'cash_universe': ['IEF', 'SHY', 'LQD'],
      'AA_T': 1, // 在 Selector 的 pick_num 基础上选择
      'AA_B': 1, // 建议在 Selector 的 pick_num 的 1/3
      'debug_level': 0
    },
    'paa_weight': {
      'cash_universe': ['IEF', 'SHY'],
      'AA_T': 1, // 在 Selector 的 pick_num 基础上选择
      'AA_a': 2,
      'window_lookback': 12, // 表示多少个月
      'use_breath_mom': 'False', // false:采用 sma; true:采用 breath_mom
      'debug_level': 0
    }
  },
  'backtester': {
    'name': 'monthly_rebalance',
    'monthly_rebalance': {
      'rebalance_offset': 1 // 调仓日期: 默认为每月1号
    },
    'biweekly_rebalance': { // 半月调仓，固定为1号和15号
      'rebalance_offset': 1
    }
  }
}

export default params
