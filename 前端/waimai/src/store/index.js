import { createStore } from 'vuex'
import mutations from './mutations'
export default createStore({
  state: {
    latlng: '', //经纬度数据
    cartList: [], //购物车数据
    number: 0, //购物车总物件数
    isDelete: true, //点击编辑的时候底部组件展示
    edit: true, //默认展示编辑状态
    orderList: [], //确定的订单数据
    userAddress: [
      {
        id: 1,
        name: 'jason',
        tel: '15874859686',
        province: '广东省',
        city: '深圳市',
        county: '南山区',
        addressDetail: '深圳湾',
        isDefault: true,
        areaCode: '110101'
      },
      {
        id: 2,
        name: 'allen',
        tel: '15874859685',
        province: '湖北省',
        city: '武汉市',
        county: '武昌区',
        addressDetail: '黄鹤楼',
        isDefault: false,
        areaCode: '110101'
      }
    ], //地址数据
    orderListEd: []
  },
  mutations,
  actions: {}
})
