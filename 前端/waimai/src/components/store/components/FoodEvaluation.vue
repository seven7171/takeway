<template>
  <div class="all_page">
    <!-- 总评价 -->
    <div class="evaluation">

      <van-grid :border="false" style="height:18vw" class="evaluate">
        <van-grid-item style=" flex-basis: 16%" border=false>
          <div class="scores">4.9</div>
        </van-grid-item>
        <van-grid-item style=" flex-basis: 36% ">
          <div class="shop">商家评分</div>
          <van-rate v-model="value" color="#ffd21e" />
        </van-grid-item>
        <van-grid-item style=" flex-basis: 12%">
          <div class="taste">口味</div>
          <div class="both">4.8</div>
        </van-grid-item>
        <van-grid-item style=" flex-basis: 12%">
          <div class="taste">包装</div>
          <div class="both">4.8</div>
        </van-grid-item>
        <van-grid-item style=" flex-basis: 24%; border-left: 1px solid #c3bfbf;">
          <div class="content_">配送满意度</div>
          <div class="count">98%</div>
        </van-grid-item>
      </van-grid>

      <div class="content">
        <div>全部1258</div>
        <div>最新154</div>
        <div>好评574</div>
        <div>差评258</div>
        <div>有图/视频120</div>
        <div>商家回复21</div>
      </div>

    </div>
    <!-- 个人评价 -->
    <div class="bottom-ass" v-for="item in this.peopleList[0]" :key="item.id">
      <van-skeleton title avatar :row="3" :loading="loading">
        <div class="assess">
          <div class="left">
            <img />
          </div>
          <div class="right">
            <!-- 用户名日期身份 -->
            <div class="first">
              <div class="username">{{item.userDTO.username}}</div>
              <div class="more">...</div>
              <span class="sf">美团会员</span>
              <div class="datatime">{{item.createTime}}</div>
            </div>
            <div class="second">
              <van-rate v-model="value" color="#ffd21e" class="van-star" :size="10" />
              <div class="alleva">非常满意</div>
            </div>
            <div class="start">{{item.content }}</div>
            <!-- <div class="start"></div>
            <div class="start"></div> -->
            <div class="likesth">
              {{item.liked}}
              <van-icon :name="item.isGood ? 'good-job' : 'good-job-o'" size="20" @click="like(item)" />

            </div>
          </div>
        </div>
      </van-skeleton>

    </div>
  </div>
</template>

<script>
import { SFEPostOne, SFEPostTwo } from '@/api/api.js'
// const token = localStorage.getItem('token')
// import { formatDate } from '@/utils/filters.js'
export default {
  data() {
    return {
      value: 3,
      loading: true,
      peopleList: []
    }
  },
  created() {
    // 请求该用户的评论
    let one = {
      id: 0
    }
    SFEPostOne(one).then((res) => {
      if (res.success == true) {
        this.peopleList.push(res.data)
      }
    })
  },
  // filters: {
  //   formatDate(time) {
  //     var data = new Date(time)
  //     return formatDate(data, 'yyyy-MM-dd')
  //   }
  // },
  mounted() {
    this.loading = false
    // 该用户之前是否有点赞
  },
  methods: {
    like(Event) {
      // console.log(Event)
      if (Event.isGood === true) {
        Event.liked = Event.liked - 1
      } else {
        let two = {
          id: 1
        }
        SFEPostTwo(two).then((res) => {
          // console.log(res.data)
          if (res.data.success == true) {
            Event.liked = Event.liked + 1
          }
        })
      }
      Event.isGood = !Event.isGood
    }
  }
}
</script>
<style lang="less" scoped>
.all_page {
  background-color: #adaaaa1c;
}
.evaluation {
  height: 45vw;
  // background-color: pink;
  margin-bottom: 3vw;
  background-color: white;
  .evaluate {
    .scores {
      font-size: 8vw;
      color: #f9a100;
    }
    .shop {
      font-size: 4vw;
      color: gray;
    }
    .taste {
      font-size: 3.6vw;
      color: gray;
    }
    .both {
      font-size: 5vw;
      color: black;
    }
    .content_ {
      font-size: 3.5vw;
      color: gray;
    }
    .count {
      font-size: 5vw;
      color: black;
      margin-left: 4.5vw;
    }
  }
  .content {
    margin-top: 2vw;
    display: flex;
    flex-wrap: wrap;
    margin-left: 10vw;
    font-size: 15px;

    div {
      border-radius: 1vw;
      background-color: #f3c879;
      margin-right: 3vw;
      padding: 1.4vw;
      margin-top: 2vw;
    }
  }
}
.bottom-ass {
  .assess {
    margin: 0 auto;
    width: 95%;
    height: 40vw;
    // background-color: pink;
    border-radius: 2vw;
    background-color: white;
    .left {
      float: left;
      width: 20%;
      height: 100%;

      img {
        border-radius: 50%;
        width: 10vw;
        height: 10vw;
        background-color: pink;
        margin: 0.6vw 3vw;
      }
    }
    .right {
      width: 80%;
      height: 100%;
      float: left;
      .username {
        font-weight: 600;
        font-size: 4.5vw;
        margin-right: 2vw;
        float: left;
        margin-bottom: -1vw;
      }
      .more {
        float: right;
        font-size: 7vw;
        color: gray;
        margin: -3vw 2vw;
      }
      .sf {
        float: left;
        background-color: #f9d8a6;
        border-radius: 1vw;
      }
      .datatime {
        clear: both;
        font-size: 3.6vw;
        color: gray;
        margin-top: 5vw;
      }
    }
    .second {
      margin-bottom: 7vw;

      .van-star {
        float: left;
        margin-top: 1vw;
      }
      .alleva {
        float: left;
        font-size: 3.2vw;
        margin-left: 3vw;
        color: gray;
      }
    }
    .start {
      clear: both;
      width: 95%;
      height: 10%;
      // background-color: pink;
      margin-top: 3vw;
    }
    .likesth {
      float: right;
      margin: 1vw 3vw;
    }
  }
}
</style>