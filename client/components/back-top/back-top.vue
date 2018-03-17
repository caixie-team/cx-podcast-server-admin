<template>
  <div v-transfer-dom :data-transfer="transfer">

    <div :class="classes" :style="styles" @click="back">
      <slot>
        <div :class="innerClasses">
          <svgicon name="gridicons-arrow-up" class="gridicon" color="#fff #fff"/>
          <div class="c-back-top__text">返回顶端</div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
  import '~/icons/gridicons-arrow-up'
  import {scrollTop} from '../../utils/assist'
  import TransferDom from '~/directives/transfer-dom'

  const prefixCls = 'c-back-top';
  export default {
    directives: {
      TransferDom
    },
    props: {
      transfer: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 400
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
        backTop: false
      };
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleScroll, false);
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('resize', this.handleScroll, false);
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}--show`]: this.backTop
          }
        ];
      },
      styles () {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        };
      },
      innerClasses () {
        return `${prefixCls}__button`;
      }
    },
    methods: {
      handleScroll () {
        this.backTop = window.pageYOffset >= this.height;
      },
      back () {
        const scrollTopValue = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        scrollTop(window, scrollTopValue, 0, this.duration);
        this.$emit('on-click');
      }
    }
  };
</script>

