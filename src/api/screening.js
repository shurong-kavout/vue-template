import request from '@/utils/request'

export function fetchScreening(params) {
  return request({
    url: '/screening',
    method: 'get',
    params
  })
}
