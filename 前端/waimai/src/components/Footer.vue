<template>
  <van-tabbar v-model="active" route active-color="#ffc400">
    <van-tabbar-item replace to="/mainhome" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/order" icon="apps-o">订单</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const active = ref(0)
    return { active }
  }
}
</script>

<style>
</style>