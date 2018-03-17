<template>
  <c-main>
    <section-nav :navs="navs" v-show="$route.params.type"/>
    <nuxt-child/>
  </c-main>
</template>
<script>
  import SectionNav from '~/components/section-nav'
  import CMain from '~/components/main'

  export default {
    components: {
      CMain,
      SectionNav
    },
    data () {
      return {
        navs: [
          {name: '成员', slug: 'people/team'},
          {name: '微信用户', slug: 'people/wechat'},
        ],
        name: 'World'
      }
    },
    beforeCreate () {
      // this.$router.push('/people/' + this.$route.params.type)
      // console.log(this.$route.params.type)
    },
    mounted () {
      // console.log(this.$route.params.type)
      // this.$router.push('/people/' + this.$route.params.type)

      // console.log(this.$route.params.type)
      // this.$nextTick(() => {
      //   if (this.$route.fullPath === '/people') {
      //     this.$router.push('/people/team')
      //   }
      // })
    },
    methods: {},
    watch: {
      '$route.fullPath': (val) => {
        console.log(val)
      }
    }
  }
</script>

