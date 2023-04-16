<template>
  <div id="app">

    <div id="RegisterPage">

      <!-- 标题 -->
      <h1>获取验证码</h1>
      <div class="w">
        <!-- 输入框 -->
        <div class="box-one-part">
          <div class="phonenumber" ref="one">
            <div class="phone">手机号码:</div>
            <input type="text" placeholder="请输入手机号" class="first" v-model="val">
            <div class="box" v-show="statu==true">您输入的手机号码格式错误</div>
          </div>
          <div class="verification" ref="two">
            <div class="ver">验证码:</div>
            <input type="text" placeholder="请输入验证码" class="second" v-model="getYzm" />
            <div class="count" v-show="!show"> ({{count}}s)后重新发送验证码</div>
            <a href="#" class="renew" v-show="show" @click="renew">点击重新发送验证码</a>
          </div>
        </div>

        <!-- 登录按钮 -->
        <button class="btn-regin" @click="next1" v-show="show"><a href="#">下一步</a></button>
        <button class="btn-regin" @click="next2" v-show="!show"><a href="#">提交验证码</a></button>

        <!-- 小按钮 -->
        <div class="smallbtn">
          <a class="a1" @click="goback">返 回</a>
        </div>

        <!-- 测试 -->

        <!-- 水平线下内容 -->
        <div class="hr"></div>

      </div>

    </div>
  </div>

</template>

<script>
import { LOPostOne, LOPostTwo, LOPostThree } from '@/api/api.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      show: true,
      //val是双向数据绑定绑定输入框的值
      val: '', //电话号码
      statu: false,
      count: '',

      timer: null,
      getYzm: '',
      account: ''
    }
  },
  methods: {
    next1() {
      // 手机号位数初步判断
      // 定义校验规则

      if (this.val.length !== 11) {
        //后面再想用正则
        //修改状态值方便上面的视图层判断展示
        this.statu = true //动态的修改提示信息
        // document.getElementsByClassName('box').innerHTML = '您输入的手机号码格式错误'
      } else {
        this.statu = false
        // document.getElementsByClassName('box').innerHTML = '您输入的手机号码格式正确'
        this.$refs.one.style.display = 'none'
        this.$refs.two.style.display = 'block'
        this.show = false
        // 发送验证码，倒计时开始
        const TIME_COUNT = 6

        if (!this.timer) {
          this.count = TIME_COUNT

          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              clearInterval(this.timer)

              this.timer = null
              // this.$refs.one.style.display = 'block'
              // this.$refs.two.style.display = 'none'
              this.val = ''
              this.show = true
            }
          }, 1000)
        }

        let one = {
          phone: this.val
        }
        LOPostOne(one).then((res) => {
          Toast(res.data) //后端传过来的验证码
        })
      }
    },
    next2() {
      // 判断是否为空
      if (this.getYzm !== '') {
        // // 将手机号和验证码都传给后端
        let two = {
          phone: this.val,
          code: this.getYzm
        }
        LOPostTwo(two).then((res) => {
          // 新用户,跳转到注册页面
          if (res.data.status === 250) {
            // console.log(res.data.data.accountNumber)
            this.account = res.data.accountNumber
            // bus.$emit('share2', this.val)
            this.$router.push({
              path: '/register',
              query: {
                datas: this.account,
                phonum: this.val,
                suc: res.success
              }
            })
          }
          // 老用户，跳转到主页面
          else if (res.data.success === true) {
            this.$router.push('/home')
          } else {
            Toast('验证码错误，请重新输入')
          }
        })
      } else {
        Toast('验证码不能为空！')
      }
    },
    goback() {
      this.$router.push('/')
    },
    renew() {
      this.show = false
      let three = {
        phone: this.val
      }
      LOPostThree(three).then((res) => {
        // console.log(res.data[0].yzm)
        Toast(res.data) //后端传过来的验证码
      })
      // 发送验证码，倒计时开始
      const TIME_COUNT = 6

      if (!this.timer) {
        this.count = TIME_COUNT

        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            clearInterval(this.timer)

            this.timer = null
            this.val = ''
            this.show = true
          }
        }, 1000)
      }
    }
  }
}
</script>


// 移动端
<style lang="less" scoped>
#RegisterPage {
  h1 {
    margin-top: 15vw;
    text-align: center;
    font-size: 8vw;
  }
  .w {
    position: relative;
    margin-top: 10px;
    .phonenumber {
      position: absolute;
      top: 10vw;
      // left: 22%;
      left: 16vw;
      .phone {
        font-size: 3vw;
        color: gray;
        margin-bottom: 7px;
      }
      .first {
        width: 70vw;
        height: 7.5vw;
        border-radius: 4.333vw;
        border: 1px #6e6e6e solid;
        // color: rgb(241, 242, 245);
        font-size: 2.5vw;
      }
    }
    .verification {
      display: none;
      position: absolute;
      top: 20px;
      left: 21vw;
      .ver {
        font-size: 16px;
        color: gray;
        margin-bottom: 7px;
      }
      .second {
        width: 215px;
        height: 35px;
        border-radius: 10px;
        border: 1px rgb(165, 166, 158) solid;
      }
    }
  }
}
.btn-regin {
  position: absolute;
  top: 40vw;
  left: 17%;
  text-align: center;
  height: 10vw;
  width: 70vw;
  line-height: 10vw;
  border-radius: 5vw;
  border-style: none;
  background-color: #fbc118;
  a {
    color: white;
    font-size: 3vw;
    text-decoration: none;
  }
}
.smallbtn {
  position: absolute;
  top: 60vw;
  left: 47%;
  text-decoration: none;
  a {
    // margin-right: 35px;
    font-size: 3vw;
  }
  .a1 {
    color: gray;
  }
  // .a2 {
  //   color: rgb(251, 193, 24);
  // }
}
.hr {
  position: absolute;
  top: 120vw;
  left: 16%;
  width: 70%;
  border-bottom: 1px gray solid;
}
.box {
  color: red;
  font-size: 4vw;
  text-align: center;
  margin-top: 2vw;
}
.count {
  font-size: 12px;
  color: gray;
  margin-top: 8px;
}
.renew {
  color: rgb(251, 141, 24);
  position: absolute;
  top: 70px;
  left: 0px;
  font-size: 13px;
  text-decoration: none;
}
</style>