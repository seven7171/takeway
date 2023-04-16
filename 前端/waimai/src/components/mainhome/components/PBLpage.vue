<template>

  <!-- 栅格布局 -->

  <div class='my-container'>
    <div class='item-div'>
      <div class="try"></div>
      <div class='divItem' v-for="(item,index) in  piclist" :key="index" @click="storePage()">
        <!-- 图片+配送时间 -->
        <div class="box">
          <img :src="item.image">
          <!-- 时间定位 -->
          <div class="time">
            <span class="send">配送</span>
            <span class="adverse">{{item.arrivedTime}}分钟送达</span>
          </div>

        </div>
        <!-- bottom -->
        <div class="bottom">
          <div class="caption">{{ item.name }}</div>
          <div class="smallwords">{{item.score}}%好评|{{ item.scoreEs }}+人已抢</div>
          <div class="money">
            <span class="price">￥{{ item.price }}</span>
            <span class="coupon">秒杀2.8折</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { HomeGetTwo } from '@/api/api.js'
import axios from 'axios'
export default {
  data() {
    return {
      piclist: [],
      count: 1
    }
  },
  methods: {
    //判断滚动方向
    handleScroll(e) {
      // 可根据后端传过来的数据改变
      if (this.count == 40) {
        return
      }
      let direction = e.deltaY > 0 ? 'down' : 'up'
      if (this.currentId <= 1) {
        direction == 'down' ? this.currentId++ : (this.currentId = 1)
        this.flag = false
      } else if (this.currentId >= this.piclist.length) {
        direction == 'down' ? (this.currentId = this.piclist.length) : this.currentId--
        this.flag = false
      } else {
        direction == 'down' ? this.currentId++ : this.currentId--
        this.flag = false
      }
      //业务操作
      // console.log(1111)
      this.count++
      // console.log(this.count)
      let two = {
        page: this.count,
        size: 6
      }

      HomeGetTwo(two).then((res) => {
        // console.log(res.hotels[0])
        res.hotels[0].forEach((element) => {
          this.piclist.push(element)
        })
      })
    },
    //函数防抖
    debounce(func, wait) {
      let timeout
      return function () {
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait)
      }
    },
    storePage() {
      this.$router.push('/store')
    }
  },
  created() {},

  mounted() {
    //监听鼠标滚动事件
    window.addEventListener('mousewheel', this.debounce(this.handleScroll, 300), true) || window.addEventListener('DOMMouseScroll', this.debounce(this.handleScroll, 300), false)
    // let two = {
    //   page: this.count,
    //   size: 6
    // }

    // HomeGetTwo(two).then((res) => {

    //   this.piclist = res.hotels[0]
    // })
    // 后端连接不上时暂用
    axios.get('/main/getFalsedata').then((res) => {
      console.log(res)
      this.piclist = res.data.hotels[0]
    })
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.try {
  width: 100%;
  height: 45vw;
  background-color: pink;
  border-radius: 3vw;
  margin-bottom: 1vw;
}
.item-div {
  column-count: 2;
  column-gap: 2vw;
}
.divItem {
  width: 100%;
  margin-bottom: 1vw;
  break-inside: avoid;
  background-color: white;
  border-radius: 2vw;
  overflow: hidden;

  .box {
    position: relative;
    height: 60%;
    background-color: skyblue;
    img {
      height: 42vw;
      width: 100%;
    }
    .time {
      position: absolute;
      bottom: 0;
      padding: 1vw 1.5vw 0.5vw 0vw;
      background-color: #353434a6;
      border-radius: 0 3vw 0 0;
      .send {
        background-color: rgb(254, 220, 42);
        border-radius: 0 4.3vw 0vw 0vw;
        padding: 1.8vw;
        font-size: 3.5vw;
        color: rgb(137 75 2);
        font-weight: 600;
      }
      .adverse {
        color: white;
        font-size: 3.5vw;
        padding-left: 1vw;
      }
    }
  }
  .bottom {
    padding: 2vw;
    .caption {
      font-size: 4vw;

      display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden; /*超出的文本隐藏*/
      text-overflow: ellipsis; /* 溢出用省略号*/
      -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
    }
    .smallwords {
      font-size: 3.3vw;
      color: gray;
    }
    .money {
      margin: 2vw 1vw 0vw 0vw;
      .price {
        color: #de640e;
        font-size: 5vw;
        margin-right: 3vw;
      }
      .coupon {
        font-size: 1vw;
        border: 1px orange solid;
        color: orange;
        padding: 1px;
      }
    }
  }
}
</style>