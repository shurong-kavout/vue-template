const selector = {
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
}

export default selector
