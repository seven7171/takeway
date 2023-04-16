<template>
  <div class="main">
    <div class="main-bg">
      <!-- 搜索框 -->
      <div class="search">
        <input type="text" @click="focusInput" />
        <div class="search-text">搜索</div>
      </div>
      <!-- 图标 -->
      <div class="sort">
        <div class="big-sort">
          <div v-for="(item,index) in big_sort" :key="index">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            {{ item.name }}
          </div>
        </div>
        <div class="small-sort">
          <div v-for="(item,index) in small_sort" :key="index">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- tab标签页 -->
      <van-tabs class="vant-tab" color="#ffc400">
        <van-tab v-for="(item,index) in  centent_nav_list" :key="index" :title="item.tab">
          <nav-list :navList="item.data" />
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import NavList from './NavList.vue'
// import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
  setup() {
    let router = useRouter()
    let data = reactive({
      big_sort: [
        {
          name: '美食',
          icon: 'icon-meishi'
        },
        {
          name: '甜点饮品',
          icon: 'icon-tiandian'
        },
        {
          name: '超市便利',
          icon: 'icon-chaoshigouwu'
        },
        {
          name: '生鲜果蔬',
          icon: 'icon-icon-test'
        },
        {
          name: '买药',
          icon: 'icon--'
        }
      ],
      small_sort: [
        {
          name: '午餐',
          icon: 'icon-shiwuqimin4'
        },
        {
          name: '买酒',
          icon: 'icon-shiwuqimin1'
        },
        {
          name: '新鲜水果',
          icon: 'icon-shiwuqimin'
        },
        {
          name: '汉堡披萨',
          icon: 'icon-shiwuqimin2'
        },
        {
          name: '休闲饮品',
          icon: 'icon-shiwuqimin3'
        },
        {
          name: '夜宵',
          icon: 'icon-Pizza'
        },
        {
          name: '吐司',
          icon: 'icon-jitui'
        },
        {
          name: '跑腿',
          icon: 'icon-jituifan'
        },
        {
          name: '美人佳丽',
          icon: 'icon-shiwuqimin5'
        },
        {
          name: '全部分类',
          icon: 'icon-shiwuqimin6'
        }
      ],
      centent_nav_list: [
        {
          tab: '天天神券',
          data: [
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            },
            {
              pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cfcy168.com%2FUploadFiles%2F2020%2F2%2F15904074889874037.jpg&refer=http%3A%2F%2Fwww.cfcy168.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645421933&t=66b58fbba9dce6f6b397e38820de24dc',
              title: '隆江猪脚饭',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            },
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            },
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            }
          ]
        },
        {
          tab: '减配送费',
          data: [
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            }
          ]
        },
        {
          tab: '点评高分',
          data: [
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            },
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            }
          ]
        },
        {
          tab: '会员满减',
          data: [
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            },
            {
              pic: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
              title: '酸菜鱼',
              sales: '2888',
              price: '20',
              label: ['门店上新', '很下饭']
            }
          ]
        }
      ]
    })
    // const getHomeData = () => {
    //   axios.get('/home/getHomedata').then((res) => {
    //     console.log(res)
    //     const { code, homedata } = res.data
    //     if (code === 200) {
    //       data.big_sort = homedata.big_sort
    //       data.small_sort = homedata.small_sort
    //       data.centent_nav_list = homedata.centent_nav_list
    //     }
    //   })
    // }
    const focusInput = () => {
      router.push('/blank')
    }
    onMounted(() => {
      // getHomeData()
    })
    return {
      ...toRefs(data),
      focusInput
    }
  },
  components: {
    NavList
  }
}
</script>

<style lang="less" scoped>
.main {
  margin-top: -20px;
  font-size: 12px;
  .main-bg {
    background-image: linear-gradient(#fff, #f5f5f5);
    padding: 10px 20px 0px 20px;
    // border-radius: 30px 30px 0 0;
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
      padding: 20px 0;
      .big-sort {
        display: flex;
        font-size: 15px;
        div {
          flex: 1;
          display: flex;
          justify-content: center;
          flex-flow: column;
          align-items: center;
          .icon {
            width: 50px;
            height: 50px;
            margin-bottom: 5px;
          }
        }
      }
      .small-sort {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        div {
          display: flex;
          justify-content: center;
          flex-flow: column;
          align-items: center;
          width: 20%;
          height: 60px;
        }
      }
    }
    .vant-tab {
      padding: 0 16px 10px;
      margin: 0px auto;
      --van-padding-base: 0;
      /deep/.van-tabs__wrap {
        border-radius: 10px;
        width: 310px;
      }
      /deep/.van-tabs__content {
        width: 310px;
      }
    }
  }
}
</style>