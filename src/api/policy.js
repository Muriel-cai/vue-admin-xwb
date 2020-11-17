import request from '@/utils/request'

// 保单管理接口
// 查询保单列表接口
export function getPolicyList(data) {
  return request({
    url: '/policy/list',
    method: 'post',
    data
  })
}

// 保单绑定场所
export function bindPolicy(data) {
  return request({
    url: '/policy/bindingPlace',
    method: 'post',
    data
  })
}

// 保单解绑场所
export function unBindPolicy(data) {
  return request({
    url: '/policy/unbindingPlace',
    method: 'post',
    data
  })
}

// 保单详情
export function getPolicyDetail(data) {
  return request({
    url: '/policy/detail',
    method: 'post',
    data
  })
}

// 保单信息录入
export function submitConfirmPolicyInfo(data) {
  return request({
    url: '/policy/submitConfirmPolicyInfo',
    method: 'post',
    data
  })
}
// 确认支付
export function submitConfirmPayInfo(data) {
  return request({
    url: '/policy/submitConfirmPayInfo',
    method: 'post',
    data
  })
}

// 核保
export function underwriting(data) {
  return request({
    url: '/policy/underwriting',
    method: 'post',
    data
  })
}

// 绑定的查勘记录
export function bindPatrol(data) {
  return request({
    url: '/policy/bindPatrol',
    method: 'post',
    data
  })
}

// 获取可以关联的查勘记录
export function getCanAssignPatrolList(data) {
  return request({
    url: '/policy/getCanAssignPatrolList',
    method: 'post',
    data
  })
}
// 获取企业信用风险信息
export function getCompanyRiskList(data) {
  return request({
    url: '/policy/getCompanyRiskList',
    method: 'post',
    data
  })
}

// 保单场所评分记录
export function placeScoreRecord(data) {
  return request({
    url: '/policy/placeScoreRecord',
    method: 'post',
    data
  })
}

// 获取保单对应场所设备
export function getDeviceList(data) {
  return request({
    url: '/policy/getDeviceList',
    method: 'post',
    data
  })
}

