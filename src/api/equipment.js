import request from '@/utils/request'
// 设备接口

// 查询设备列表接口
export function getEquipment(data) {
  return request({
    url: '/device/list',
    method: 'post',
    data
  })
}

// 查询设备场所列表
export function getPlaceList(data) {
  return request({
    url: '/place/list',
    method: 'post',
    data
  })
}

// 查看警情接口
export function getAlarmList(data) {
  return request({
    url: '/alarm/list',
    method: 'post',
    data
  })
}

// 查看通道接口
export function getChannelList(data) {
  return request({
    url: '/channel/list',
    method: 'post',
    data
  })
}

// 查看视频
export function getFlashVideo(data) {
  return request({
    url: '/channel/flashVideo',
    method: 'post',
    data
  })
}
// 查看模拟量
export function getAnalogList(data) {
  return request({
    url: '/analog/list',
    method: 'post',
    data
  })
}
