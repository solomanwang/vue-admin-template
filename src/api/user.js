import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

//  查询所有用户信息，可根据 条件筛选查询
export function userList(params){
  return request({
    url: '/user/getAll',
    method: 'post',
    params
  })
}

