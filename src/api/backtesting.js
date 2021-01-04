import request from '@/utils/request'

export function fetchBacktesting(params) {
  return request({
    url: '/backtesting',
    method: 'get',
    params
  })
}
