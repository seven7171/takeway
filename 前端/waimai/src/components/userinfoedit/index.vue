<template>
  <div>
    <Header title="个人信息修改" />
    <!-- 可以使用 CellGroup 作为容器 -->
    <van-cell-group inset>

      <van-field v-model="value1" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="value2" label="个性签名" placeholder="请输入个性签名" />
      <van-field v-model="value3" label="密码" placeholder="请输入密码" />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" class="save-btn" @click="save">
        保存
      </van-button>
      <van-button @click="quite" class="save-btn" round block type="primary">
        退出
      </van-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Header from '../Header.vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  components: {
    Header
  },
  setup() {
    let router = useRouter()
    let data = reactive({
      value1: '',
      value2: '',
      value3: ''
    })
    const save = () => {
      if (data.value1 && data.value3) {
        let userinfo = JSON.parse(localStorage.userinfo)
        let newUserinfo = {
          value1: data.value1 || userinfo.name,
          value3: data.value3 || userinfo.pass
        }
        localStorage.setItem('userinfo', JSON.stringify(newUserinfo))
        Toast('修改成功！')
        router.push('/mine')
      } else {
        Toast('请输入内容')
      }
    }
    const quite = () => {
      localStorage.removeItem('isLogin')
      Toast('退出成功！')
      router.push('/login')
    }
    return {
      ...toRefs(data),
      save,
      quite
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-button--primary {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/.van-cell-group--inset {
  margin: 0px;
}
.save-btn {
  width: 80%;
  margin: 20px auto;
}
</style>