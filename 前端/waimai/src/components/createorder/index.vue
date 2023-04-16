<template>
  <div class="create-order">
    <Header title="订单" />
    <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
    <div class="content">
      <div v-for="(item,index) in store.state.orderList" :key="index">
        <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>￥{{ totalPrice }}</span>
      </div>
      <van-button type="primary" class="pay-btn" block color="#ffc400" @click="handlecreateOrder">生成订单</van-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Header from '../Header.vue'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { Dialog } from 'vant'
import { useRoute } from 'vue-router'
import router from '../../router'
import 'vant/es/dialog/style'

export default {
  components: {
    Header
  },
  setup() {
    let route = useRoute()
    let store = useStore()
    const data = reactive({
      tel: '18859709671',
      name: 'seven',
      totalPrice: 0
    })
    const initPrice = () => {
      let price = 0
      if (store.state.orderList.length) {
        store.state.orderList.forEach((item) => {
          price += item.num * item.price
        })
      }
      data.totalPrice = price
    }
    //初始化用户地址
    const initUser = () => {
      store.state.userAddress.forEach((item) => {
        if (item.isDefault) {
          data.name = item.name
          data.tel = item.tel
        }
      })
    }
    const handlecreateOrder = () => {
      Dialog.alert({
        title: '提示',
        message: '生成订单成功'
      }).then(() => {
        let newList = store.state.cartList.filter((item) => {
          return !route.query.list.includes(item.id + '')
        })
        store.commit('delete', newList)
        store.commit('orderListEd')
        router.push('/order')
      })
    }
    onMounted(() => {
      initPrice()
      initUser()
    })
    const onEdit = () => {
      router.push('/address')
    }
    return {
      ...toRefs(data),
      onEdit,
      store,
      initPrice,
      initUser,
      handlecreateOrder
    }
  }
}
</script>

<style lang="less" scoped>
.create-order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>