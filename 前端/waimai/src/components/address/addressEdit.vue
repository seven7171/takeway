<template>
  <div>
    <Header :title="typeaddress" />
    <van-address-edit :address-info="addressinfo" :area-list="areaList" show-delete show-set-default show-search-result :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Header from '../Header.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { Toast } from 'vant'
export default {
  components: {
    Header
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const data = reactive({
      areaList: {
        province_list: {
          110000: '广东省',
          120000: '浙江省'
        },
        city_list: {
          110100: '广州市',
          110200: '深圳市',
          120100: '杭州市',
          120200: '宁波市'
        },
        county_list: {
          110101: '天河区',
          110102: '海珠区',
          120102: '上城区',
          130102: '下城区'
        }
      },
      addressinfo: {}
    })
    const onSave = (content) => {
      //新增和编辑
      if (route.query.type === 'add') {
        store.commit('addaddress', content)
      } else {
        store.commit('editaddaddress', content)
      }
      Toast('保存成功')
      setTimeout(() => {
        router.back()
      }, 1000)
    }
    const onDelete = (content) => {
      store.commit('deleteaddress', content)
      Toast('删除成功')
    }
    const onChangeDetail = () => {}
    const init = () => {
      store.state.userAddress.forEach((item) => {
        if (item.id === Number(route.query.id)) {
          data.addressinfo = item
        }
      })
    }
    const typeaddress = computed(() => {
      return route.query.type == 'add' ? '地址新增' : '地址编辑'
    })
    onMounted(() => {
      init()
    })
    return {
      ...toRefs(data),
      onSave,
      onDelete,
      onChangeDetail,
      typeaddress
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
</style>