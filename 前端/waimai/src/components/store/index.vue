<template>
  <div class="storeDetails">
    <Header title="店铺" />
    <div class="content">
      <div class="img"></div>
      <div class="foodSort">
        <div class="name">{{ title }} <img :src="img" alt="" class="store-img" /></div>
        <van-tabs color="#ffc400">
          <van-tab v-for="(item,index) in storeData" :key="index" :title="item.name">
            <FoodData :index="index" :foodData="item.data" />
          </van-tab>
          <van-tab title="评价">
            <FoodEvaluation />
          </van-tab>
          <van-tab title="商家">
            <FoodBusiness />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.number" @click="goCart" />
      <van-action-bar-button type="warning" text="加入购物车" @click="handleAddCart" />
      <van-action-bar-button type="danger" text="立即购买" @click="goBuy" />
    </van-action-bar>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Header from '../Header.vue'
import FoodData from './components/FoodData.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import FoodEvaluation from './components/FoodEvaluation.vue'
import FoodBusiness from './components/FoodBusiness.vue'
export default {
  components: {
    Header,
    FoodData,
    FoodEvaluation,
    FoodBusiness
  },
  setup() {
    let store = useStore()
    let router = useRouter()
    //对于渲染数据这块
    // 可发送请求http://localhost:7777/toDishtype/get?id=1   和   http://localhost:7777/toDish/get?typeId=1&shopId=1去获取
    // 将获取到的数据进行格式处理并添加add:true属性
    // 最后将它赋值给storeData[0].data.items里面的children
    let data = reactive({
      title: '又酸又菜又多鱼',
      img: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
      storeData: [
        {
          name: '点菜',
          data: {
            content: '点菜',
            items: [
              {
                text: '热销套餐', //data.typename
                children: [
                  //将data赋值给children，改变用到的一些名称
                  {
                    pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc',
                    title: '隆江猪脚饭',
                    num: 0,
                    price: 25.0,
                    id: 0,
                    add: true
                  },
                  {
                    pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc',
                    title: '隆江猪脚饭',
                    num: 0,
                    price: 25.0,
                    id: 1,
                    add: true
                  }
                ]
              },
              {
                text: '超级折扣',
                children: [
                  {
                    pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
                    title: '无骨酸菜鱼+肥牛双拼',
                    num: 0,
                    price: 25.0,
                    id: 5,
                    add: true
                  },
                  {
                    pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
                    title: '香辣水煮鱼+肥牛双拼',
                    num: 0,
                    price: 25.0,
                    id: 6,
                    add: true
                  }
                ]
              }
            ]
          }
        }
      ]
    })

    const handleAddCart = (type) => {
      let sum = 0
      const newList = [] || store.state.cartList
      data.storeData.forEach((item) => {
        item.data.items?.forEach((item) => {
          item.children.forEach((item) => {
            if (item.num > 0) {
              newList.push(item)
            }
          })
        })
      })
      if (newList.length === 0) {
        Toast('请选择商品')
      } else {
        store.commit('ADDCART', newList)
        type === 'buy' ? goCart() : ''
      }

      store.state.cartList.forEach((item) => {
        sum = sum + item.num
      })
      store.commit('addNum', sum)
    }

    const goCart = () => {
      router.push('/cart')
    }

    const goBuy = () => {
      handleAddCart('buy')
    }

    return {
      ...toRefs(data),
      handleAddCart,
      store,
      goCart,
      goBuy
    }
  }
}
</script>

<style lang="less" scoped>
.storeDetails {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .img {
      background: url('../../assets/images/d5.webp') no-repeat center/cover;
      width: 100%;
      height: 150px;
    }
    .foodSort {
      height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;

      .sort {
        margin-top: 10px;
      }
      .name {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        .store-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          margin-top: -30px;
        }
      }
    }
  }
}
</style>