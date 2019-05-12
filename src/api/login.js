import request from '@/utils/request'

export function register(phone, password) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}
export function login(phone, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function isExistByUserPhone(phone) {
  return request({
    url: `/user/isExistByUserPhone/${phone}`,
    method: 'get'
  })
}
export function restPassword(phone,password) {
  return request({
    url: `/user/restPassword`,
    method: 'post',
    data:{
      phone,
      password
    }
  })
}
