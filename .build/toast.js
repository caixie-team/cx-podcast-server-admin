import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {"duration":3000,"action":{"text":"×","onClick":(e, toast) => {
        toast.goAway(0)
      }}})

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}