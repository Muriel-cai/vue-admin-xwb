import request from '@/utils/request'

// 预警监控

// 预警数据统计
export function getstatistical() {
  return request({
    url: '/warning/countWarning',
    method: 'post'
  })
}

// 根据保单id查询单位信息
export function checkInfo(data) {
  return request({
    url: '/policy/seekUnit',
    method: 'post',
    data
  })
}

// 隐患管理
export function alarmGl(data) {
  return request({
    url: '/alarm/listByPolicyId',
    method: 'post',
    data
  })
}

// 设备列表 (根据保单id查询设备列表)
export function getEquipmentList(data) {
  return request({
    url: '/device/listByPolicyId',
    method: 'post',
    data
  })
}
// 保单列表
export function getPolicyt(data) {
  return request({
    url: '/policy/list',
    method: 'post',
    data
  })
}
