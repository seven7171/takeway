//封装请求接口
import request from '@/utils/request'
// 登录页面
export function LoginPostOne(data) {
  return request({
    method: 'post',
    url: 'toUser/loginWithPw',
    params: data
  })
}
// 注册页面
export function RegisterPostOne(datas) {
  return request({
    method: 'post',
    url: 'toUser/improve',
    data: datas,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 手机号登录页面
export function LOPostOne(datas) {
  return request({
    method: 'post',
    url: 'toUser/code',
    params: datas
  })
}

export function LOPostTwo(datas) {
  return request({
    method: 'post',
    url: 'toUser/loginWithPc',
    params: datas
  })
}

export function LOPostThree(datas) {
  return request({
    method: 'post',
    url: 'toUser/code',
    params: datas
  })
}

// 主页面
// HomeMain
export function HomeGetOne() {
  return request({
    method: 'get',
    url: 'toFunctionClassification'
  })
}

export function HomeGetTwo(datas) {
  return request({
    method: 'post',
    url: 'toDish/search',
    data: datas,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 活动主页面
export function ActiveGetOne() {
  return request({
    method: 'get',
    url: 'shopDiscount/get'
  })
}

// 搜索框页面
export function BlankGetOne() {
  return request({
    method: 'get',
    url: 'redis/search'
  })
}

export function BlankGetTwo(datas) {
  return request({
    method: 'get',
    url: 'toShop/suggestion',
    params: datas
  })
}

export function BlankPostThree(datas) {
  return request({
    method: 'post',
    url: 'toShop/search',
    data: datas,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// shopfood
export function SFPostOne(datas) {
  return request({
    method: 'post',
    url: 'toDish/get',
    params: datas
  })
}

export function SFPostTwo(datas) {
  return request({
    method: 'post',
    url: 'toDishtype/get',
    params: datas
  })
}

export function SFPostThree(datas) {
  return request({
    method: 'post',
    url: 'tbVoucherOrder/seckill/1',
    params: datas
  })
}

// shopfood_evaluation
export function SFEPostOne(datas) {
  return request({
    method: 'post',
    url: 'toFoodComments/comment',
    params: datas
  })
}

export function SFEPostTwo(datas) {
  return request({
    method: 'post',
    url: 'toFoodComments/good',
    params: datas
  })
}

//shopfood_business
export function SFBGetOne(datas) {
  return request({
    method: 'get',
    url: 'shopInfo/get',
    params: datas
  })
}

// 红包
// firstred
export function RedFGetOne() {
  return request({
    method: 'get',
    url: 'toVoucher/allVoucher'
  })
}
