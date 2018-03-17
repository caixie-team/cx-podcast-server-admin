import Vue from 'vue'
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'

const dictionary = {
  zh_CN: {
    attributes: {
      cate_name: '分类名',
      user_login: '用户名',
      user_pass: '密码',
      email: '邮箱',
      episode_title: '节目名称'
    }
  }
}
// 组件的字典进行更新
// Validator.updateDictionary(dictionary)
Validator.localize(zh, dictionary)

Vue.use(VeeValidate, {
  locale: 'zh_CN'
})
