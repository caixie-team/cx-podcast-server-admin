<template>
  <c-main>
    <slot></slot>
  </c-main>
</template>

<script lang="es">
  import CMain from '~/components/main'
  export default {
    components: {
      CMain
    },
    data: () => {
      return {name: 'world'}
    }
  }
</script>
<!--<script>-->
<!--import Posts from '~/pages/posts'-->
<!--export default Posts-->
<!--</script>-->
