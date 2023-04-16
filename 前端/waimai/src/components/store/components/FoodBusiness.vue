<template>
  <div>
    <van-divider style="margin:10px 0" />
    <div class="all_content" v-for="item in todolist" :key="item.id">
      <div class="first">
        <!-- 地址 -->
        <div class="local">
          <div class="one">
            <van-icon name="location-o" />
          </div>
          <div class="two">{{item.shop_add}}</div>
          <div class="three">
            <van-icon name="phone" />
          </div>

        </div>
        <!-- 食品安全档案 -->
        <div class="safty">
          <div class="one">
            <van-icon name="shield-o" />
          </div>
          <div class="two">

            <van-cell is-link @click="showPopup">查看食品安全档案</van-cell>
            <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">{{item.foodSave}}</van-popup>
          </div>

        </div>
      </div>
      <!-- 配送服务 -->
      <div class="serve">
        <div class="one">
          <van-icon name="orders-o" />
        </div>
        <div class="two">
          配送服务：<span>由{{item.serverWhere}}提供配送服务</span>
        </div>

      </div>
      <!-- 配送时间 -->
      <div class="serve">
        <div class="one">
          <van-icon name="clock-o" />
        </div>
        <div class="two">
          配送时间：<span>{{item.openTime}}</span>
        </div>

      </div>
      <!-- 商家公告 -->
      <div class="ad">
        <div class="one">
          <van-icon name="volume-o" />
        </div>
        <div class="second">
          <div class="left">商家公告：</div>
          <div class="right">{{item.shopSay}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { SFBGetOne } from '@/api/api.js'
export default {
  data() {
    return {
      show: false,
      todolist: []
    }
  },
  methods: {
    showPopup() {
      this.show = true
    }
  },
  created() {
    let one = {
      shopId: 1
    }
    SFBGetOne(one).then((res) => {
      this.todolist.push(res.data)
    })
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.all_content {
  font-size: 4vw;
  .local {
    margin-top: 2vw;
    height: 13vw;
  }
  .one {
    float: left;
    width: 12%;
    text-align: center;
    font-size: 5vw;
    line-height: 8.5vw;
  }
  .two {
    float: left;
    width: 70%;
    margin: 1vw;
  }
  .three {
    float: right;
    border-left: 1px gray solid;
    text-align: center;
    margin-right: 5vw;
    margin-top: 2vw;
    padding-left: 4vw;
    padding-top: 1vw;
    line-height: 0vw;
    font-size: 6vw;
    height: 7vw;
  }
  .safty {
    // height: 13vw;
    font-size: 5vw;
    font-weight: 600;
    clear: both;
    /deep/.two {
      float: left;
      width: 81.5%;
      margin: 1vw;
      .van-cell--clickable {
        padding: 0;
      }
    }
  }
  .serve {
    height: 13vw;
    clear: both;
    font-weight: 600;

    span {
      font-weight: 500;
    }
  }
  .ad {
    clear: both;
    height: 13vw;
    .second {
      margin-top: 1vw;
      padding: 1vw;
      .left {
        float: left;

        font-weight: 600;
        margin-left: 1vw;
      }
      .right {
        float: left;
        width: 61%;
        overflow-wrap: break-word;
      }
    }
  }
}
</style>