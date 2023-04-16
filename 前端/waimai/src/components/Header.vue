<template>
  <div class="header">
    <van-icon name="arrow-left" class="icon" @click="goBack" />
    <div>{{ title }}</div>
    <div class="edit" v-if="edit" @click="handleEdit">
      {{ store.state.edit?"编辑":"完成" }}</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { useStore } from 'vuex'
export default {
  props: ['title', 'edit'],
  setup() {
    let router = useRouter()
    let store = useStore()
    const goBack = () => {
      router.back()
    }

    const handleEdit = () => {
      if (store.state.cartList.length) {
        store.commit('edit')
        store.commit('changeDelete')
      } else {
        Toast.fail('请添加商品！')
      }
    }

    return {
      goBack,
      handleEdit,
      store
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  .edit {
    font-size: 16px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }
  .icon {
    position: absolute;
    left: 10px;
  }
}
</style>