<template>
  <div
    class="aplayer-list"
    :class="{'aplayer-list-hide': !show}"
    ref="list">
    <div ref="items">
      <draggable v-model="musicList">
        <post-audio
          class="play-item"
          v-for="(aMusic, index) of musicList"
          :key="index"
          :index="musicList.length - index-1"
          :aMusic="aMusic"
          @selectsong="$emit('selectsong', aMusic)"
          @removesong="handleRemove"
          @updated="handleUpdated"
          :class="{'aplayer-list-light': aMusic === currentMusic}"/>
      </draggable>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import PostAudioAsset from '~/components/post-assets/post-audio-asset'
  import PostAudio from './post-audio'

  export default {
    components: {
      Draggable,
      PostAudio,
      PostAudioAsset
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
      list: {
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
    computed: {
      // musicList () {
      //   return this.value
      // }
    },
    methods: {
      handleRemove (song) {
        for (let i = 0; i < this.musicList.length; i++) {
          if (this.musicList[i].id === song.id) {
            this.musicList.splice(i, 1)
          }
        }
        this.$emit('remove-song', song)
      },
      handleUpdated (song) {
        this.$emit('update-song', song)
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
    /*will-change: height;*/
    /*display: none;*/
    /*overflow: hidden;*/

    &.aplayer-list-hide {
      height: 0 !important;
    }
    .play-item {
      transition: all 0.2s ease;
      &.c-card {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .07);
      }
      &:first-child {
        /*border-top: none;*/
      }

      &:hover {
        background: mix($primary, $white, 1.5%);
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
        background: mix($primary, $white, 3.5%);

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
        background: mix($primary, $white, 8.5%);
        box-shadow: inset 4px 0 0 0 $primary;

      }
      .aplayer-list-title {
      }
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
          padding: 12px;
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
          background: mix($primary, $white, 8.5%);
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
          background: mix($alert-yellow, $white, 8.5%);
          box-shadow: inset 4px 0 0 0 $alert-yellow;
        }
      }
    }
  }
</style>
