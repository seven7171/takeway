<template>
  <div class="cartDetail">
    <div class="content">
      <van-checkbox-group v-model="checked" @change="groupChange ">
        <div v-for="(item,index) in store.state.cartList" :key="index">
          <ListItem :item="item" :handleChange="handleChange" :showCheckBox="true" />
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="allPrice" button-text="结算" @submit="onSubmit" class="submit-all" button-color="#ffc400" v-if="store.state.isDelete">
      <van-checkbox v-model="subchecked" checked-color="#ffc400" @click="choseAll">全选</van-checkbox>
    </van-submit-bar>

    <div class="buy" v-else>
      <!-- <div class="left"> -->

      <van-checkbox v-model="subchecked" checked-color="#ffc400" @click="choseAll" class="left">全选</van-checkbox>
      <div class="delete" @click="handleDelete">
        删除
      </div>
      <!-- </div> -->

    </div>

  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import ListItem from '../ListItem.vue'
import { computed, onMounted } from '@vue/runtime-core'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  props: ['changeShow'],
  components: {
    ListItem
  },
  setup(props) {
    let router = useRouter()
    const store = useStore()
    const data = reactive({
      checked: [],
      subchecked: true
    })
    const handleChange = (value, detail) => {
      store.state.cartList.map((item) => {
        if (item.id === detail.name) {
          item.num = value
        }
      })
    }

    const init = () => {
      // console.log(store.state.cartList)
      data.checked = store.state.cartList.map((item) => item.id)
    }

    onMounted(() => {
      init()
    })

    const onSubmit = () => {
      if (data.checked.length) {
        store.commit('pay', updateData())
        router.push({
          path: '/createorder',
          query: {
            list: data.checked
          }
        })
      } else {
        Toast.fail('请选择！')
      }
    }
    const choseAll = () => {
      if (data.checked.length !== store.state.cartList.length) {
        init()
      } else {
        data.checked = []
      }
    }
    const groupChange = (result) => {
      // console.log(result)
      if (result.length === store.state.cartList.length) {
        data.subchecked = true
      } else {
        data.subchecked = false
      }
    }
    const allPrice = computed(() => {
      let countList = updateData()
      let sum = 0
      countList.forEach((item) => {
        sum += item.num * item.price
      })

      return sum * 100
    })

    const updateData = (type) => {
      return store.state.cartList.filter((item) => {
        return type === 'delete' ? !data.checked.includes(item.id) : data.checked.includes(item.id)
      })
    }

    const handleDelete = () => {
      //判断checked是否有值
      if (data.checked.length) {
        store.commit('delete', updateData('delete'))
        data.checked = []
        //购物车没有数据时
        if (!store.state.cartList.length) {
          props.changeShow()
        } else {
          Toast.fail('请选择要删除的商品')
        }
      }
    }

    return {
      store,
      ...toRefs(data),
      handleChange,
      onSubmit,
      choseAll,
      groupChange,
      allPrice,
      handleDelete
    }
  }
}
</script>

<style lang="less" scoped>
.cartDetail {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 48px;
  }

  .buy {
    position: fixed;
    bottom: 48px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;

      flex: 1;
    }
    .delete {
      color: #fff;
      background-color: rgb(238, 55, 55);
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>