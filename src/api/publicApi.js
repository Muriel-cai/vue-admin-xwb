import request from '@/utils/request'

// 上传图片
export function uploadImg(data) {
  return request({
    url: '/upload/img',
    method: 'post',
    data
  })
}
