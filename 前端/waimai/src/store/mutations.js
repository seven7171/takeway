import { ADDCART, LATLNG } from './mutation-type'
export default {
  [ADDCART](state, value) {
    state.cartList = value
  },
  [LATLNG](state, value) {
    state.latlng = value
  },
  addNum(state, value) {
    state.number = value
  },
  changeDelete(state) {
    state.isDelete = !state.isDelete
  },
  delete(state, value) {
    state.cartList = value
  },
  edit(state) {
    state.edit = !state.edit
  },
  pay(state, value) {
    state.orderList = value
  },
  orderListEd(state) {
    state.orderListEd = state.orderListEd.concat(state.orderList)
  },
  addaddress(state, value) {
    state.userAddress.map((item) => {
      if (value.isDefault) {
        item.isDefault = false
      }
    })
    state.userAddress.push(value)
  },
  editaddress(state, value) {
    state.userAddress = state.userAddress.map((item) => {
      if (value.isDefault) {
        item.isDefault = false
      }
      if (item.id === value.id) {
        return value
      } else {
        return item
      }
    })
  },
  deleteaddress(state, value) {
    state.userAddress ==
      state.userAddress.filter((item) => {
        return !(item.id === value.id)
      })
    if (value.isDefault) {
      state.userAddress[0].isDefault = true
    }
  }
}
