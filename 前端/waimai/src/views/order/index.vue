<template>
  <div class="order">
    <Header title="订单" />
    <div class="content">
      <van-tabs color="#ffc400">
        <van-tab v-for="(items,index) in navData" :key="index" :title="items">
          <div v-if="items==='全部'&& store.state.orderListEd.length">
            <div v-for="(item,index) in store.state.orderListEd" :key="index">
              <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>
          </div>
          <div v-else>
            <Empty />
          </div>
        </van-tab>
      </van-tabs>

    </div>
    <Footer />
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Footer from '../../components/Footer.vue'
import Header from '../../components/Header.vue'
import Empty from '../../components/cart/Empty.vue'
import { useStore } from 'vuex'
export default {
  components: {
    Footer,
    Header,
    Empty
  },
  setup() {
    let store = useStore()
    const data = reactive({
      navData: ['全部', '交易完成', '待付款', '待发货', '已发货']
    })
    return {
      ...toRefs(data),
      store
    }
  }
}
</script>