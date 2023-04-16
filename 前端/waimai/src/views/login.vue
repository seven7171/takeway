<template>
  <div id="app">

    <!-- 标题 -->
    <h1>Sign In</h1>
    <div class="w">
      <!-- 输入框 -->
      <form class="box-one-part">
        <div class="UserName ">
          <div class="users">账 号:</div>
          <input type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;请输入账号" class="first" v-model="username" autocomplete />
        </div>
        <div class="PassWord">
          <div class="psw">密 码:</div>
          <input type="password" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;请输入密码" class="second" v-model="password" autocomplete />
        </div>
      </form>

      <!-- 按钮 -->
      <button class="btn-regin" @click="proofread"><a href="#">登&nbsp;&nbsp;录</a></button>
      <!-- 注释 -->
      <button class="phonelogin" @click="phonelogin"><a href="#">手机号码登录</a></button>

      <!-- 水平线下内容 -->
      <div class="hr">
        <div class="smallwords">sign in takeaway app</div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<script>
import { LoginPostOne } from '@/api/api.js'

import { Toast } from 'vant'

import { useRouter } from 'vue-router'

export default {
  setup() {
    let router = useRouter()
    const phonelogin = () => {
      // console.log(1)
      router.push('/phonelogin')
    }
    return {
      phonelogin
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    proofread() {
      // console.log('有反应')
      if (this.username != '' && this.password != '') {
        let a = {
          accountNumber: this.username,
          password: this.password
        }

        LoginPostOne(a).then((res) => {
          if (res.errorMsg === null) {
            // 登录成功
            // 1. 存储 token
            localStorage.setItem('token', res.data.token)
            this.$router.push('/mainhome')
          } else {
            // 登录失败
            localStorage.removeItem('token')
            // alert(res.errorMsg)
            Toast(res.errorMsg)
          }
        })
      } else {
        Toast('账号或密码不能为空！')
        // showToast('账号或密码不能为空！')
      }
    }
  }
  // components: {
  //   Header
  // }
}
</script>

<style lang="less" scoped>
h1 {
  margin-top: 15vw;
  text-align: center;
  font-size: 8vw;
}
.w {
  position: absolute;
  top: 40%;
  left: 50%;
  // background-color: pink;
  transform: translate(-50%, -50%);
  .box-one-part {
    // position: relative;

    .UserName {
      margin-bottom: 3vw;
      .users {
        color: rgb(117, 117, 117);
        margin-bottom: 5px;
        font-size: 3vw;
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

    .PassWord {
      margin-bottom: 8vw;
      .psw {
        color: rgb(117, 117, 117);
        margin-bottom: 5px;
        font-size: 3vw;
      }
      .second {
        width: 70vw;
        height: 7.5vw;
        border-radius: 4.333vw;
        border: 1px #6e6e6e solid;
        // color: rgb(241, 242, 245);
        font-size: 2.5vw;
      }
    }
  }
}

.btn-regin {
  width: 70.5vw;
  height: 9vw;
  line-height: 5vw;
  border-radius: 3.333vw;
  background-color: rgb(254, 180, 49);
  border: 1px rgb(254, 180, 49) solid;

  a {
    text-decoration: none;
    color: white;
    font-size: 3vw;
  }
  // a:hover {
  //   font-size: 3.5vw;
  // }
}
.phonelogin {
  margin-top: 3vw;
  width: 70.5vw;
  height: 9vw;
  line-height: 4vw;
  border-radius: 3.333vw;
  background-color: #d1caa1;
  border: 1px #d1caa1 solid;
  a {
    text-decoration: none;
    color: white;

    font-size: 3vw;
  }
  // a:hover {
  //   font-size: 3.5vw;
  // }
}

.hr {
  width: 55vw;
  height: 6vw;
  border-bottom: 1px gray solid;
  position: absolute;
  bottom: -80%;
  left: 10%;
  .smallwords {
    padding: 0 12vw;
    color: gray;
    font-size: 2.3vw;
  }
}
</style>