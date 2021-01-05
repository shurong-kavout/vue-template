import FACTOR_LIST from './factor-list'
const options = {
  // 'strategy_name': 'Alpha Strategy',
  'strategy_region': [
    'US',
    'USA',
    'CN'
  ],
  'strategy_universe': {
    'US': {
      'SPX': 'SP500',
      'TOP1000': 'TOP1000'
    },
    'USA': {
      'SPX': 'SP500',
      'TOP1000': 'TOP1000'
    },
    'CN': {
      '000300': 'CSI300',
      '000906': 'CSI800'
    }
  },
  'date': '2017-01-01',
  'selector': {
    'multifactor_sequential': {
      'pick_num': {
        'min_value': 1,
        'max_value': 100,
        'step': 1
      },
      'lookback': {
        'min_value': 6,
        'max_value': 36,
        'step': 12
      },
      'chosen_metric': [
        'cagr',
        'sharpe',
        'sortino',
        'cagr_dd'
      ],
      'factors': FACTOR_LIST,
      'debug_level': [0, 1, 2]
    },
    'multifactor_composite': {
      'pick_num': {
        'min_value': 1,
        'max_value': 100,
        'step': 1
      },
      'lookback': {
        'min_value': 6,
        'max_value': 36,
        'step': 12
      },
      'chosen_metric': [
        'cagr',
        'sharpe',
        'sortino',
        'cagr_dd'
      ],
      'factors': FACTOR_LIST,
      'debug_level': [0, 1, 2]
    }
  },
  'allocator': {
    'equal_weight': {
      'debug_level': [0, 1, 2]
    },
    'market_cap_weight': {
      'debug_level': [0, 1, 2]
    },
    'hrp_weight': {
      'window_lookback': {
        'min_value': 1,
        'max_value': 24,
        'step': 1
      },
      'debug_level': [0, 1, 2]
    },
    'vaa_weight': {
      'cash_universe': [
        'IEF',
        'SHY',
        'LQD'
      ],
      'AA_T': {
        'min_value': 1,
        'max_value': 100,
        'step': 1
      },
      'AA_B': {
        'min_value': 1,
        'max_value': 100,
        'step': 1
      },
      'debug_level': [0, 1, 2]
    },
    'paa_weight': {
      'cash_universe': [
        'IEF',
        'SHY'
      ],
      'AA_T': {
        'min_value': 1,
        'max_value': 100,
        'step': 1
      },
      'AA_a': {
        'min_value': 0,
        'max_value': 2,
        'step': 1
      },
      'window_lookback': {
        'min_value': 1,
        'max_value': 24,
        'step': 1
      },
      'use_breath_mom': [
        'False',
        'True'
      ],
      'debug_level': [0, 1, 2]
    }
  },
  'backtester': {
    'monthly_rebalance': {
      'start_date': '2017-01-01',
      'end_date': '2020-07-31',
      'rebalance_offset': {
        'min_value': 1,
        'max_value': 28,
        'step': 1
      },
      'transaction_cost': {
        'min_value': 0.0,
        'max_value': 1.0,
        'step': 0.1
      },
      // 'keep_positions_detail': [
      //   false,
      //   true
      // ],
      'leverage': {
        'min_value': 1.0,
        'max_value': 10.0,
        'step': 1.0
      },
      'debug_level': [0, 1, 2]
    },
    'biweekly_rebalance': {
      'start_date': '2017-01-01',
      'end_date': '2020-07-31',
      'rebalance_offset': {
        'min_value': 1,
        'max_value': 28,
        'step': 1
      },
      'transaction_cost': {
        'min_value': 0.0,
        'max_value': 1.0,
        'step': 0.1
      },
      // 'keep_positions_detail': [
      //   false,
      //   true
      // ],
      'leverage': {
        'min_value': 1.0,
        'max_value': 10.0,
        'step': 1.0
      },
      'debug_level': [0, 1, 2]
    }
  }
}

export default options
