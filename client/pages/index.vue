<template>
  <main>
    <slot></slot>
  </main>
</template>

<script>
  import CMain from '~/components/main'
  export default {
    middleware: ['auth'],
    components: {
      CMain
    },
    data: () => {
      return {name: 'world'}
    }
  }
</script>
