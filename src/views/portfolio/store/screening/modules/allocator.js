const allocator = {
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
    'use_breath_mom': 'False', // False:采用 sma; True:采用 breath_mom
    'debug_level': 0
  }
}

export default allocator
