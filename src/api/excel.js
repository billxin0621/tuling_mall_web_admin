import request from '@/utils/request'
export function executeExcel(data) {
  return request({
    url:'/brand/executeExcel',
    method:'post',
    data:data
  })
}
export function fetchList(params) {
  return request({
    url:'/branchData/list',
    method:'get',
    params:params
  })
}
