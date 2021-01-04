const backtester = {
  'name': 'monthly_rebalance',
  'monthly_rebalance': {
    'start_date': '2017-01-01',
    'end_date': '2020-07-31',
    'rebalance_offset': 1, // 调仓日期: 默认为每月1号
    'transaction_cost': 0.0, // 交易费用
    // 'keep_positions_detail': false,
    'leverage': 1.0,
    'debug_level': 0
  },
  'biweekly_rebalance': { // 半月调仓，固定为1号和15号
    'start_date': '2017-01-01',
    'end_date': '2020-07-31',
    'transaction_cost': 0.0, // 交易费用
    // 'keep_positions_detail': false,
    'leverage': 1.0,
    'debug_level': 0
  }
}

export default backtester
