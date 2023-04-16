<template>
  <div class="home">
    <div class="content">
      <!-- 头部 -->
      <div class="header">

        <Header title="美食" />
      </div>
      <!-- 主要内容 -->
      <Main />
      <!-- 底部 -->
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import Main from '@/components/home/Main.vue'
import Header from '../../components/Header.vue'
// import Footer from '../../components/Footer.vue'
// import { useStore } from 'vuex'
export default {
  setup() {
    // let store = useStore()
    const data = reactive({
      lat: '',
      lng: ''
    })
    // const getLongitudeLatitude = () => {
    //   return new Promise(() => {
    //     // console.log(resolve, reject)

    //     //如果该对象存在，那么地理位置服务可用。
    //     if ('geolocation' in navigator) {
    //       /* 地理位置服务可用 */
    //       let options = {
    //         enableHighAccuracy: true, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
    //         timeout: 5000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
    //         maximumAge: 0 //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
    //       }
    //       const success = (position) => {
    //         //position.coords (只读) 返回一个定义了当前位置的Coordinates对象。
    //         //position.timestamp (只读) 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
    //         data.lat = position.coords.latitude //当前位置的纬度
    //         data.lng = position.coords.longitude //当前位置精度
    //         // console.log(data.lat + 'and' + data.lng)
    //         // 获取速度较慢来不及发请求存进仓库

    //         store.commit('LATLNG', data.lat + ',' + data.lng)
    //       }
    //       const error = (err) => {
    //         var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时']
    //         console.log(errorType[err.code - 1])
    //       }

    //       navigator.geolocation.getCurrentPosition(success, error, options)
    //     } else {
    //       /* 地理位置服务不可用 */
    //       console.log('无法获取您的位置，请检查定位是否开启或刷新重试')
    //     }
    //     // 需要返回的数据
    //   })
    // }
    const onClickLeft = () => history.back()
    const onClickRight = () => Toast('按钮')
    return {
      ...toRefs(data),
      onClickLeft,
      onClickRight
      // getLongitudeLatitude
    }
  },
  mounted() {
    // this.getLongitudeLatitude()
  },
  components: {
    Main,
    Header
    // Footer
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
    .header {
      --van-nav-bar-height: 60px;
      --van-nav-bar-icon-color: black;
      --van-nav-bar-text-color: black;
      --van-nav-bar-background-color: none;
      --van-nav-bar-arrow-size: 20px;
      background-image: linear-gradient(#ffc400, #fff);
      /deep/.van-nav-bar__text {
        font-size: 18px;
        font-weight: 600;
      }
      .van-icon-search:before {
        font-size: 20px;
      }
    }
  }
}
.main {
  margin-bottom: 12%;
  margin-top: -2px;
}
</style>