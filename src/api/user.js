import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function animalList(data) {
  return request({
    url: '/animal/list',
    method: 'get',
    params: data
  })
}
