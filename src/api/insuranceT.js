import request from '@/utils/request'

// 查询共保业务列表接口
export function getInsuranceT(data) {
  return request({
    url: '/business/list',
    method: 'post',
    data
  })
}
// 添加共保业务列表接口
export function addInsuranceT(data) {
  return request({
    url: '/business/add',
    method: 'post',
    data
  })
}
// 删除共保业务列表接口
export function delInsuranceT(data) {
  return request({
    url: '/business/del',
    method: 'post',
    data
  })
}
// 修改共保业务列表接口
export function changInsuranceT(data) {
  return request({
    url: '/business/modify',
    method: 'post',
    data
  })
}
// 选择共保方案
export function choiceInsuranceT(data) {
  return request({
    url: '/industry/selectCommon',
    method: 'post',
    data
  })
}

// 建筑类型

// 查询
export function getBuild(data) {
  return request({
    url: '/feeRate/list',
    method: 'post',
    data
  })
}
// 增加
export function addBuild(data) {
  return request({
    url: '/feeRate/add',
    method: 'post',
    data
  })
}

// 修改
export function changBuild(data) {
  return request({
    url: '/feeRate/modify',
    method: 'post',
    data
  })
}

// 删除
export function delBuild(data) {
  return request({
    url: '/feeRate/del',
    method: 'post',
    data
  })
}

// 企业类型
// 查询
export function getenterpriseType(data) {
  return request({
    url: '/enterpriseType/list',
    method: 'post',
    data
  })
}
// 增加
export function addenterpriseType(data) {
  return request({
    url: '/enterpriseType/add',
    method: 'post',
    data
  })
}

// 修改
export function changenterpriseType(data) {
  return request({
    url: '/enterpriseType/modify',
    method: 'post',
    data
  })
}

// 删除
export function delenterpriseType(data) {
  return request({
    url: '/enterpriseType/del',
    method: 'post',
    data
  })
}

// 行业类型
export function getindustry(data) {
  return request({
    url: '/industry/list',
    method: 'post',
    data
  })
}

// 查询所有行业
export function getAllindustry() {
  return request({
    url: '/industry/queryAll',
    method: 'post'
  })
}
// 增加
export function addindustry(data) {
  return request({
    url: '/industry/add',
    method: 'post',
    data
  })
}

// 修改
export function changindustry(data) {
  return request({
    url: '/industry/modify',
    method: 'post',
    data
  })
}

// 删除
export function delindustry(data) {
  return request({
    url: '/industry/del',
    method: 'post',
    data
  })
}

// 标的项目
export function getmainItem(data) {
  return request({
    url: '/mainItem/list',
    method: 'post',
    data
  })
}
// 增加
export function addmainItem(data) {
  return request({
    url: '/mainItem/add',
    method: 'post',
    data
  })
}

// 修改
export function changmainItem(data) {
  return request({
    url: '/mainItem/modify',
    method: 'post',
    data
  })
}

// 删除
export function delmainItem(data) {
  return request({
    url: '/mainItem/del',
    method: 'post',
    data
  })
}

// 保险公司管理
// 查询
export function getInsuranceCompany(data) {
  return request({
    url: '/insuranceCompany/queryCompanyList',
    method: 'post',
    data
  })
}
// 根据id查询保险公司信息
export function getCompanyById(data) {
  return request({
    url: '/insuranceCompany/companyById',
    method: 'post',
    data
  })
}
// 增加
export function addInsuranceCompany(data) {
  return request({
    url: '/insuranceCompany/add',
    method: 'post',
    data
  })
}

// 修改
export function changInsuranceCompany(data) {
  return request({
    url: '/insuranceCompany/modify',
    method: 'post',
    data
  })
}

// 删除
export function delInsuranceCompany(data) {
  return request({
    url: '/insuranceCompany/delete',
    method: 'post',
    data
  })
}
