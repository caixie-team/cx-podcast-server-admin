<template>
  <div v-if="currentVisible"
       v-click-outside="onClickoutside">
    <div :class="classes"
         :style="getStylePosition()" :data-transfer="transfer" v-transfer-dom>
      <div class="c-popover__arrow"></div>
      <div class="c-popover__inner">
        <div>
          <slot ref="domContainer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {oneOf} from '~/utils/assist'
  // import {events} from './bus'
  import debugFactory from 'debug'
  import clickOutside from '~/directives/click-outside'
  import TransferDom from '~/directives/transfer-dom'
  import {uniqueId} from 'lodash'

  // import {
  //   bindWindowListeners,
  //   unbindWindowListeners,
  //   suggested as suggestPosition,
  //   constrainLeft,
  //   offset,
  // } from './util';
  let poputil = {}
  if (process.browser) {
    poputil = require('./util')
  }
  const noop = () => {
  };
  const debug = debugFactory('picker:popover');
  const __popovers = new Set()
  export default {
    directives: {clickOutside, TransferDom},

    props: {
      transfer: {
        type: Boolean,
        default: true
      },
      reference: {
        type: String,
        require: true
      },
      autoPosition: {
        type: Boolean,
        default: true
      },
      className: {
        type: String,
        default: ''
      },
      closeOnEsc: {
        type: Boolean,
        default: true
      },
      isVisible: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        validator (value) {
          return oneOf(value, [
            'top',
            'top right',
            'right',
            'bottom right',
            'bottom',
            'bottom left',
            'left',
            'top left'
          ])
        },
        default: 'bottom'
      },
      showDelay: {
        type: Number,
        default: 0
      },
      // onClose: {
      //   type: Function,
      //   default: noop()
      // },
      onShow: {
        type: Function,
        default: noop()
      }
    },
    data () {
      return {
        domContainer: '',
        domContext: '',
        // visiable: false,
        positionClass: '',
        style: '',
        currentVisible: this.isVisible,
        state: {
          show: this.isVisible,
          left: -99999,
          top: -99999,
          positionClass: ''
        }
        // position: {
        //   left: 0,
        //   top: 0
        // }
      }
    },
    name: 'Popover',
    computed: {
      classes () {
        return [
          'c-popover',
          this.className,
          this.state.positionClass
        ]
      }
    },
    watch: {
      isVisible (val) {
        this.currentVisible = val
      },
      currentVisible (val) {
        if (!val) {
          this.hide()
        }
      }
    },
    mounted () {
      if (this.isVisible) {
        this.bindEscKeyListener()
        this.bindDebouncedReposition()
        poputil.bindWindowListeners()
      }
    },
    updated () {
      this.state.positionClass = this.getPositionClass(this.position)
      this.domContainer =  this.$slots.default[0].elm;
      this.domContext = this.$parent.$refs[this.reference] || this.$parent.$parent.$refs[this.reference]

      this.setPosition()

    },
    beforeDestroy () {
      this.unbindClickoutHandler()
      this.unbindDebouncedReposition()
      poputil.unbindWindowListeners()
    },
    methods: {
      onClickoutside (e) {
        this.$emit('click-outside', e)
      },
      unbindClickoutHandler () {
        if (this._clickoutHandlerReference) {
          this.debug('unbinding `clickout` listener ...');
          this._clickoutHandlerReference();
          this._clickoutHandlerReference = null;
        }
      },
      onClickout (event) {
        const shouldClose =
          this.domContext && this.domContext.contains && !this.domContext.contains(event.target);
        // if ( this.props.ignoreContext && shouldClose ) {
        //   const ignoreContext = ReactDom.findDOMNode( this.props.ignoreContext );
        //   shouldClose =
        //     shouldClose &&
        //     ( ignoreContext && ignoreContext.contains && ! ignoreContext.contains( event.target ) );
        // }

        if (shouldClose) {
          this.hide();
        }
      },
      // --- ESC key ---
      bindEscKeyListener () {
        if (!this.closeOnEsc) {
          return null
        }
        this.debug('unbinding `escKey` listener ...')
        document.addEventListener('keydown', this.onKeydown, true)
      },
      onKeydown (event) {
        if (event.keyCode !== 27) {
          return null
        }

        this.close(true)
      },

      // --- window `scroll` and `resize` ---
      bindDebouncedReposition () {
        window.addEventListener('scroll', this.onWindowChange, true);
        window.addEventListener('resize', this.onWindowChange, true);
      },
      unbindDebouncedReposition () {
        if (this.willReposition) {
          window.cancelAnimationFrame(this.willReposition);
          this.willReposition = null;
        }

        window.removeEventListener('scroll', this.onWindowChange, true);
        window.removeEventListener('resize', this.onWindowChange, true);
        this.debug('unbinding `debounce reposition` ...');
      },
      onWindowChange () {
        this.willReposition = window.requestAnimationFrame(this.setPosition)
      },
      setDOMBehavior (domContainer) {
        if (!domContainer) {
          this.unbindClickoutHandler();
          return null;
        }

        this.debug('setting DOM behavior');

        this.bindClickoutHandler(domContainer);

        // store DOM element referencies
        this.domContainer = domContainer;
        this.domContext = this.$parent.$refs.reference
        // store context (target) reference into a property
        // this.domContext = ReactDom.findDOMNode( this.props.context );

        this.setPosition();
      },
      computePosition () {
        if (!this.isVisible) {
          return null
        }
        // const {domContainer, domContext} = this
        if (!this.domContainer || !this.domContext) {
          console.log('nulxlxlxlxlxl')
          this.debug('[WARN] no DOM elements to work');
          return null;
        }

        let suggestedPosition = this.position
        this.debug('position: %o', suggestedPosition);

        if (this.autoPosition) {
          suggestedPosition = poputil.suggested(suggestedPosition, this.domContainer, this.domContext)
        }

        const reposition = Object.assign(
          {},
          poputil.constrainLeft(poputil.offset(suggestedPosition, this.domContainer, this.domContext), this.domContainer),
          {positionClass: this.getPositionClass(suggestedPosition)})
        // this.repostion = repostion
        this.debug('updating reposition: ', reposition);
        return reposition
      },
      debug (string, ...args) {
        debug(`[%s] ${string}`, this.id, ...args);
      },
      setPopoverId (id) {
        this.id = id || `pop__${uniqueId()}`;
        __popovers.add(this.id);

        this.debug('creating ...');
        debug('current popover instances: ', __popovers.size);
      },
      setPosition () {
        this.debug('updating position')
        const position = this.computePosition()
        if (!position) {
          return null
        }

        this.willReposition = null
        this.state = Object.assign(this.state, position)
        // this.position = position
      },
      getPositionClass (position = this.position) {
        return `is-${position.replace(/\s+/g, '-')}`;
      },
      getStylePosition () {
        const {left, top} = this.state
        return `left: ${left}px; top: ${top}px;`
      },
      show () {
        if (!this.showDelay) {
          this.state.show = true
          return null
        }
        this.debug('showing in %o', `${this.showDelay} ms`)
        // this.clearShowTimer()
        this._openDelayTimer = setTimeout(() => {
          this.state.show = true
        }, this.showDelay)
      },
      hide () {
        // unbind clickout-side event every time the component is hidden.
        this.unbindClickoutHandler();
        this.unbindDebouncedReposition();
        // this.unbindEscKeyListener();
        poputil.unbindWindowListeners();
        this.currentVisible = false
        // document.body.removeChild(document.getElementsByClassName('c-ellipsis-menu__menu'))
      }
    }
  }
</script>
