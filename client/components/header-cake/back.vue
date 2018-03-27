<template>
  <btn compact borderless :to="href" :class="classes" @click="handleClick">
    <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24">
      <g>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
      </g>
    </svg>
    {{ text }}
  </btn>
  <!--<button class="button header-cake__back is-compact is-borderless" type="button">-->
  <!--</button>-->
</template>
<script>
  import {CButton} from '~/components/button'

  export default {
    name: 'HeaderCakeBack',
    props: {
      href: String,
      text: {
        type: String,
        default: '返回'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      spacer: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Btn: CButton
    },
    computed: {
      classes () {
        return [
          'c-header-cake__back',
          {
            'is-spacer': this.spacer,
            'is-action': !!this.icon
          }
        ]
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    }
  }
</script>
