import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Y001001',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/menu/S003003',
    method: 'post'
    // params: {
    //   token
    // }
  })
}

export function logout() {
  return request({
    url: '/Y001002',
    method: 'post'
  })
}

// 获取用户信息
export function getLoginUserInfo() {
  return request({
    url: '/getLoginUserInfo',
    method: 'post'
  })
}
