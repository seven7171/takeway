<template>
  <div class="main">
    <div class="main-bg">
      <!-- 搜索框 -->
      <div class="search">
        <input type="text" @click="focusInput" />
        <div class="search-text">搜索</div>
      </div>
      <!-- 主图标 -->
      <div class="sort">
        <div class="big-sort">
          <div v-for="(item,index) in big_sort" :key="index">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            {{ item.name }}
          </div>
        </div>

        <!-- 轮播图 -->
        <div class="other">
          <van-swipe class="my-swipe" indicator-color="gray" :loop="false">
            <van-swipe-item v-for="(item,i) in small_sort" :key="i" class="small-sort">
              <div v-for="(items,is) in item" :key="is" @click="first(is)">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${items.icon}`"></use>
                </svg>
                {{ items.name }}
              </div>
            </van-swipe-item>

          </van-swipe>
        </div>

      </div>

      <!-- 瀑布流 -->
      <pblPage />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import pblPage from '../../components/mainhome/components/PBLpage.vue'
import axios from 'axios'
export default {
  setup() {
    let router = useRouter()

    let data = reactive({
      big_sort: [
        {
          name: '外卖',
          icon: 'icon-waimai'
        },
        {
          name: '蔬菜水果',
          icon: 'icon-fruit'
        },
        {
          name: '超市便利',
          icon: 'icon-zhoubianchaoshibianlidian'
        },
        {
          name: '品质百货',
          icon: 'icon-baihuo'
        },
        {
          name: '买药',
          icon: 'icon-yiyao'
        }
      ],
      small_sort: []
    })
    const getHomeData = () => {
      axios.get('/home/getHomedata').then((res) => {
        // console.log(res)
        const { code, homedata } = res.data
        if (code === 200) {
          //处理数组，将它切割成每份十五个数据
          let arr = homedata.small_sort
          for (let i = 0; i < arr.length; i += 15) {
            data.small_sort.push(arr.slice(i, i + 15)) //循环几次推几次就有几个key
          }

          // data.centent_nav_list = homedata.centent_nav_list
        }
      })
    }
    const focusInput = () => {
      router.push('/blank')
    }
    const first = (i) => {
      // console.log(i)
      if (i == 0) {
        router.push('/home')
      }
    }

    return {
      ...toRefs(data),
      focusInput,
      getHomeData,
      first
    }
  },
  components: {
    pblPage
  },
  mounted() {
    this.getHomeData()
  }
}
</script>

<style lang="less" scoped>
.main {
  margin-top: -20px;
  font-size: 12px;
  .main-bg {
    background-image: linear-gradient(#fff, #f5f5f5);
    padding: 10px 10px 0px 10px;
    border-radius: 30px 30px 0 0;
    .search {
      position: relative;
      input {
        width: 100%;
        border: 1px solid #ffc400;
        border-radius: 20px;
        height: 30px;
      }
      .search-text {
        position: absolute;
        right: -6px;
        top: 1px;
        background-color: #ffc400;
        border-radius: 16px;
        width: 50px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        text-align: center;
      }
    }
    .sort {
      padding: 10px 0;
      .big-sort {
        display: flex;
        font-size: 13px;
        background-color: white;
        border-radius: 10px;
        div {
          flex: 1;
          display: flex;
          justify-content: center;
          flex-flow: column;
          align-items: center;
          .icon {
            width: 40px;
            height: 40px;
            margin-bottom: 5px;
          }
        }
      }
    }
    // .vant-tab {
    //   padding: 0 16px 10px;
    //   margin: 0px auto;
    //   --van-padding-base: 0;
    //   /deep/.van-tabs__wrap {
    //     border-radius: 10px;
    //     width: 310px;
    //   }
    //   /deep/.van-tabs__content {
    //     width: 310px;
    //   }
    // }
  }
  .other {
    background-color: white;
    height: 180px;
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
  }
  .my-swipe .van-swipe-item {
    height: 100%;
  }

  .small-sort {
    display: flex;
    flex-wrap: wrap;
    // margin-top: 20px;
    div {
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-items: center;
      width: 20%;
      height: 60px;
    }
    .icon {
      width: 30px;
      height: 30px;
      margin-bottom: 5px;
    }
  }
}
</style>