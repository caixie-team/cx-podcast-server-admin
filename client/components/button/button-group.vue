<template>
  <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick"></button>
</template>
<script>
  export default {
    name: 'Button',
    props: {
      type: {
        validator (value) {
        }
      }
    }
  }
</script>
