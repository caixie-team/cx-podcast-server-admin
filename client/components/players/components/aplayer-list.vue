<template>
  <div
    class="aplayer-list"
    :class="{'aplayer-list-hide': !show}"
    ref="list">
    <div ref="items">

    <draggable v-model="musicList">
<!--      <post-asset :asset="item"
                  :order="musicList.length - index"
                  v-for="(item,index) in musicList"
                  :key="item.id"/>-->
      <foldable-card
        class="play-item"
        v-for="(aMusic, index) of musicList"
        :key="index"
        :class="{'aplayer-list-light': aMusic === currentMusic}" compact>
        <div slot="header" @click="$emit('selectsong', aMusic)"
             class="u-flex u-align-items-center"
             style="height: 100%; width: 100%; cursor: pointer;">
          <span class="aplayer-list-cur" :style="{background: theme}"></span>
          <span class="aplayer-list-index">{{ index + 1}}</span>
          <span class="aplayer-list-title">{{ aMusic.title }}</span>
        </div>
        <div slot="summary">
          <confirm-button
            @confirm="$emit('removesong', aMusic)" />
          <!--<span class="aplayer-list-author">{{ aMusic.author }}</span>-->
        </div>
        <div slot="expandedSummary">
          <span class="aplayer-list-author">{{ aMusic.author }}</span>
        </div>
      </foldable-card>
    </draggable>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import FoldableCard from '~/components/foldable-card'
  import ConfirmButton from '~/components/confirm-button'
  import PostAsset from '~/components/post-assets'

  export default {
    components: {
      Draggable,
      FoldableCard,
      ConfirmButton,
      PostAsset
    },
    props: {
      expanded: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default () {
          return []
        }
      },
      show: {
        type: Boolean,
        default: true,
      },
      currentMusic: Object,
      // musicList: {
      //   type: Array,
      //   default () {
      //     return []
      //   }
      // },
      playIndex: {
        type: Number,
        default: 0,
      },
      theme: String,
      listmaxheight: String,
    },
    data () {
      return {
        musicList: this.value
      }
    },
    mounted () {
      // this.$el.style.height = `${this.$el.offsetHeight}px`
      // this.$refs.items.style.height = `${this.$el.offsetHeight}px`
      // this.$nextTick(() => {
      //   this.$el.style.height = `${this.$el.offsetHeight}px`
      //   this.$refs.items.style.height = `${this.$el.offsetHeight}px`
      // })
    },
    methods: {
      handleAbort (item) {
      },
      handleConfirm (item) {
        console.log(item)
      }
    },
    watch: {
      value (val) {
        this.musicList = val
      },
      musicList (val) {
        this.$emit('music-list-change', val)
      }
    }
  }
</script>

<style lang="scss">
  $white: #FFF;
  $grey: #A4A3A4;
  $alert-yellow: #F0B849;
  $primary: #14aaf5;
  $orange-fire: #d54e21;
  .aplayer-list {
    transition: all 0.5s ease;
    will-change: height;
    display: none;
    overflow: hidden;

    &.aplayer-list-hide {
      height: 0 !important;
    }
    .play-item {
      transition: all 0.2s ease;
      &:first-child {
        border-top: none;
      }

      &:hover {
        background: mix( $primary, $white, 1.5% );
        /*&:before {*/
          /*background-color: #25e8c8;*/
          /*background-image: -webkit-linear-gradient(left, #25e8c8, #32c1ff);*/
          /*background-image: linear-gradient(to right, #25e8c8, #32c1ff);*/
          /*border-top-right-radius: 3px;*/
          /*content: "";*/
          /*display: block;*/
          /*height: 8px;*/
        /*}*/
      }

      &.aplayer-list-light {
        background: mix( $primary, $white, 3.5% );

        .aplayer-list-cur {
          display: inline-block;
        }
      }

      .aplayer-list-cur {
        display: none;
        width: 4px;
        height: 18px;
        position: absolute;
        left: 0;
        /*top: 5px;*/
        cursor: pointer;
        transition: background-color .3s;
        background: mix( $primary, $white, 8.5% );
        box-shadow: inset 4px 0 0 0 $primary;

      }
      .aplayer-list-title {}
      .aplayer-list-index {
        color: #666;
        margin-right: 12px;
        cursor: pointer;
        font-style: italic;
      }
      .aplayer-list-author {
        color: #666;
        float: right;
        cursor: pointer;
      }
    }
    .c-foldable-card.is-compact .c-foldable-card__header {
      min-height: 32px;
    }
    .c-card {
      &.is-expanded {
        margin: 16px auto;

        .c-post-asset__header {
          justify-content: space-between;
        }
        .c-post-asset__content {
          padding:12px;
        }
        .aplayer {
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
          border: 1px solid #d7d6d7;
          box-shadow: none;
        }
        .aplayer-list ol li.aplayer-list-light {
          background: #fafafa;
        }
        .aplayer-list-cur {
          background: #14AAF5 !important;
        }
      }
      &:before {
        position: absolute;
        content: '';
      }
      &.is-collapsed {
        cursor: pointer;
        &:before {
          -webkit-transition: width 250ms ease-out 0s;
          -o-transition: width 250ms ease-out 0s;
          transition: width 250ms ease-out 0s;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0;
          background: mix( $primary, $white, 8.5% );
          box-shadow: inset 4px 0 0 0 $primary;
          //border-radius: .5rem 0 0 .5rem;
        }
        &:hover {
          //box-shadow: 0 0 0 1px $gray, 0 2px 4px lighten( $gray, 20% );
          //z-index: z-index( 'root', '.c-post-asset.card.is-collapsed:hover' );
          &:before {
            width: 4px;
          }
        }
      }

      &.is-trash strong {
        color: $orange-fire;
      }

      &.is-plain {
        padding-left: 0;
        cursor: default;
      }
      // If the episode is unapproved and collapsed, color it yellow.
      &.is-unapproved.is-collapsed {
        .c-post-asset__header {
          background: mix( $alert-yellow, $white, 8.5% );
          box-shadow: inset 4px 0 0 0 $alert-yellow;
        }
      }
    }
  }
</style>
