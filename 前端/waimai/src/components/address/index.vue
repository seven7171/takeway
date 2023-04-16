<template>
  <div>
    <Header title="地址管理" />
    <van-address-list :list="list" v-model="chosenAddressId" default-tag-text="默认" @add="onAdd" @edit="onEdit" />

  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Header from '../Header.vue'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
  components: {
    Header
  },
  setup() {
    let router = useRouter()
    let store = useStore()
    const data = reactive({
      list: []
    })
    const onAdd = () => {
      router.push({
        path: '/addressedit',
        query: {
          type: 'add'
        }
      })
    }
    const onEdit = (item) => {
      router.push({
        path: '/addressedit',
        query: {
          id: item.id,
          type: 'edit'
        }
      })
    }
    const init = () => {
      data.list = store.state.userAddress.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
          isDefault: item.isDefault
        }
      })
    }
    onMounted(() => {
      init()
    })
    return {
      ...toRefs(data),
      onAdd,
      onEdit
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
/deep/ .van-radio__icon {
  display: none;
}
</style>