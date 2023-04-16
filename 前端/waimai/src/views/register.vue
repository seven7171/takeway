<template>
  <div id="app">

    <div class="w">
      <!-- 标题 -->
      <h1>注 册</h1>
      <div class="h">
        <!-- 用户名 -->
        <div class="users">
          <!-- 账号由后端发送，在其他页面请求，兄弟传值 -->
          <label class="username">账&nbsp;&nbsp;&nbsp;号：</label>
          <input type="text" class="input-all" v-model="val">
          <!-- readonly="readonly" -->
        </div>

        <!-- 密码 -->
        <div class="passwords">
          <label class="password">密&nbsp;&nbsp;&nbsp;码：</label>
          <input type="password" class="input-all" v-model="pwd" @blur="poofread">
        </div>
        <!-- 确认密码 -->
        <div class="confirm-pwd">
          <label class="pwd">确认密码：</label>
          <input type="password" class="input-all" v-model="rePwd" @blur="again">
        </div>
        <div class="box">
          <button class="btn" @click="register"><a href="#">注 册</a></button>
        </div>

      </div>
      <div class="hr">
        <img src="@/assets/images/pic_1.png">
      </div>
    </div>
  </div>

</template>

<script>
import { RegisterPostOne } from '@/api/api.js'
import { Toast } from 'vant'

export default {
  data() {
    return {
      pwd: '',
      rePwd: '',
      val: this.$route.query.datas,
      phone: this.$route.query.phonum
    }
  },

  methods: {
    poofread() {
      const regPwd = /^[a-zA-Z0-9_-]{8,16}$/
      if (this.pwd !== '') {
        const result = regPwd.test(this.pwd)
        // console.log(result)
        if (result) {
          //绿色样式打钩显示正确
        } else {
          Toast('支持8-16位数字、字母组合')
        }
      }
    },
    again() {
      if (this.rePwd === this.pwd) {
        //密码正确，显示正确样式
      } else {
        Toast('密码不一致！')
      }
    },
    register() {
      // 将数据传给后端
      let datas = {
        password: this.pwd,
        accountnumber: this.val,
        phonenumber: this.phone
      }
      RegisterPostOne(datas)
      if (this.$route.query.suc) {
        Toast('账号注册成功！')
        this.$router.push('/home')
      } else {
        Toast('账号注册失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  margin-top: 15vw;
  text-align: center;
  font-size: 8vw;
}

.users {
  margin-top: 10vw;
  position: relative;
  text-align: center;
  .username {
    color: #757575;
    font-size: 3vw;
    position: absolute;
    top: -6vw;
  }
}

.input-all {
  width: 70vw;
  height: 7vw;
  line-height: 7vw;
  font-size: 4vw;
  border-style: none;
  border-bottom: 1px #6e6e6e solid;
}

.passwords {
  position: relative;
  text-align: center;
  margin-top: 10vw;
  .password {
    color: #757575;
    font-size: 3vw;
    position: absolute;
    top: -6vw;
  }
}
.confirm-pwd {
  text-align: center;
  margin-top: 10vw;
  margin-left: 3px;
  position: relative;
  .pwd {
    color: #757575;
    font-size: 3vw;
    position: absolute;
    top: -6vw;
  }
}
.hr {
  width: 70%;
  border-bottom: 1px #6e6e6e solid;
  margin-top: 7vw;
  margin-left: 16vw;
  text-align: center;
  padding: 0;
  img {
    width: 53vw;
    height: 53vw;
  }
}
.box {
  text-align: center;
  margin-top: 15vw;
}
.btn {
  text-align: center;
  height: 10vw;
  width: 70vw;
  line-height: 10vw;
  border-radius: 5vw;
  border-style: none;
  background-color: #fbc118;

  a {
    color: white;
    font-size: 5vw;
    text-decoration: none;
  }
}
</style>