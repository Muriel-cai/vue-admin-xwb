import request from '@/utils/request'

// 产品管理接口

// 查询产品管理列表接口
export function getGoodList(data) {
  return request({
    url: '/good/queryGoodList',
    method: 'post',
    data
  })
}
// 新增产品管理列表接口
export function addGoodList(data) {
  return request({
    url: '/good/add',
    method: 'post',
    data
  })
}
// 删除产品管理列表接口
export function delGoodList(data) {
  return request({
    url: '/good/delete',
    method: 'post',
    data
  })
}
// 修改产品管理列表接口
export function modifyGoodList(data) {
  return request({
    url: '/good/modify',
    method: 'post',
    data
  })
}
// 根据id查询产品接口
export function getGoodListBId(data) {
  return request({
    url: '/good/goodById',
    method: 'post',
    data
  })
}

// 产品计划列表

// 查询产品计划列表
export function getgoodPlan(data) {
  return request({
    url: '/goodPlan/queryPlanList',
    method: 'post',
    data
  })
}
// 新增产品计划列表
export function addgoodPlan(data) {
  return request({
    url: '/goodPlan/add',
    method: 'post',
    data
  })
}
// 删除产品计划列表
export function delgoodPlan(data) {
  return request({
    url: '/goodPlan/delete',
    method: 'post',
    data
  })
}
// 修改产品计划列表
export function modifygoodPlan(data) {
  return request({
    url: '/goodPlan/modify',
    method: 'post',
    data
  })
}
// 根据id查询产品计划列表
export function getgoodPlanBId(data) {
  return request({
    url: '/goodPlan/goodPlanById',
    method: 'post',
    data
  })
}
