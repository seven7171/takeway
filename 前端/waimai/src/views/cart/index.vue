<template>
  <div class="cart">
    <Header title="购物车" :edit="true" />
    <DetailCart v-if="isShow" :changeShow="changeShow" />
    <Empty v-else />
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Empty from '../../components/cart/Empty.vue'
import Footer from '../../components/Footer.vue'
import DetailCart from '@/components/cart/DetailCart.vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
export default {
  components: {
    Header,
    Empty,
    Footer,
    DetailCart
  },
  setup() {
    const isShow = ref(true)
    const store = useStore()

    const init = () => {
      if (store.state.number === 0) {
        isShow.value = false
      }
    }

    const changeShow = () => {
      isShow.value = false
    }

    onMounted(() => {
      init()
    })
    return {
      isShow,
      changeShow
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  display: flex;
  flex-flow: column;
  height: 100%;
  // .content{

  // }
}
.empty-content[data-v-eb5346e4] {
  margin-bottom: 17%;
}
</style>