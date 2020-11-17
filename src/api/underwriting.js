import request from '@/utils/request'
// 核保管理

// 查看记录详情
export function getCateList(data) {
  return request({
    url: '/patrolRecord/cateList',
    method: 'post',
    data
  })
}

// 分类菜单栏
export function loadMinCateGroup(data) {
  return request({
    url: '/patrolRecord/loadMinCateGroup',
    method: 'post',
    data
  })
}
// 分数修正
export function adjustGrade(data) {
  return request({
    url: '/patrolRecord/adjustGrade',
    method: 'post',
    data
  })
}
// 根据id查询
export function atrolRecordById(data) {
  return request({
    url: '/patrolRecord/getById',
    method: 'post',
    data
  })
}

// 查询记录列表
export function patrolRecordList(data) {
  return request({
    url: '/patrolRecord/list',
    method: 'post',
    data
  })
}

// 小分类配置
export function minCateList(data) {
  return request({
    url: '/minCate/list',
    method: 'post',
    data
  })
}
// 查询小分类列表

// 添加
export function minCateAdd(data) {
  return request({
    url: '/minCate/add',
    method: 'post',
    data
  })
}
// 删除
export function minCateDel(data) {
  return request({
    url: '/minCate/del',
    method: 'post',
    data
  })
}
// 根据小分类id查询
export function getByMinCateId(data) {
  return request({
    url: '/minCate/getByMinCateId',
    method: 'post',
    data
  })
}

// 修改
export function minCateModify(data) {
  return request({
    url: '/minCate/modify',
    method: 'post',
    data
  })
}

// 大分类配置

// 查询大类列表
export function maxCateList(data) {
  return request({
    url: '/maxCate/list',
    method: 'post',
    data
  })
}
// 添加大分类
export function maxCateAdd(data) {
  return request({
    url: '/maxCate/add',
    method: 'post',
    data
  })
}
// 添加大类ID 查询
export function maxCateByCateId(data) {
  return request({
    url: '/maxCate/getByCateId',
    method: 'post',
    data
  })
}

// 修改

export function maxCateModify(data) {
  return request({
    url: '/maxCate/modify',
    method: 'post',
    data
  })
}

// 删除
export function maxCateDel(data) {
  return request({
    url: '/maxCate/del',
    method: 'post',
    data
  })
}
// 根据行业id查询大类列表
export function getMaxCateByIndustryId(data) {
  return request({
    url: '/maxCate/getByIndustryId',
    method: 'post',
    data
  })
}
// 复制
export function maxCateCopy(data) {
  return request({
    url: '/maxCate/copy',
    method: 'post',
    data
  })
}

// 提交查勘风险信息
export function submitRiskInfo(data) {
  return request({
    url: '/patrolRecord/submitRiskInfo',
    method: 'post',
    data
  })
}
// 获取巡查单风险报告
export function getRiskReportData(data) {
  return request({
    url: '/patrolRecord/getRiskReportData',
    method: 'post',
    data
  })
}

