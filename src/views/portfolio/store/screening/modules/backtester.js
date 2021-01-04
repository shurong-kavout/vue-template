const backtester = {
  'name': 'monthly_rebalance',
  'monthly_rebalance': {
    'rebalance_offset': 1 // 调仓日期: 默认为每月1号
  },
  'biweekly_rebalance': { // 半月调仓，固定为1号和15号
    'rebalance_offset': 1
  }
}

export default backtester
