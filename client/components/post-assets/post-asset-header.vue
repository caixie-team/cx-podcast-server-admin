<template>
  <div :class="classes">
    <asset-actions
      @toggleApprove="$emit('toggleApprove')"
      @trash="$emit('trash')"
      @delete="$emit('delete')"
      :status="status"
      v-if="isExpanded"/>

    <div class="c-post-asset__header-content" v-if="!isExpanded">
      <div class="c-post-asset__content-preview">
        <label class="c-post-asset__checkbox" v-if="isBulkEdit">
          <input type="checkbox" class="c-form-checkbox">
        </label>
        <div class="c-post-asset__order" v-else>{{order}}.</div>

        <div class="c-post-asset__content-info u-text-bold">
          <div class="c-post-asset__title">
            {{asset.title}}
          </div>
        </div>
      </div>
      <div class="c-post-asset__asset-preview">{{asset.content}}</div>
    </div>
    <div class="c-post-asset__header__summary">
      lalal
    </div>
    <button class=" c-post-asset__action-collapse c-post-asset__header__expand "
            type="button"
            v-if="!isBulkEdit" >
      <svgicon name="gridicons-chevron-down" class="gridicon"/>
    </button>
  </div>
</template>
<style lang="scss">
  $white: #FFF;
  $alert-yellow: #F0B849;

  .c-post-asset__title {
    line-height: 1.2;
    overflow: hidden;
    padding-left: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .c-post-asset__asset-preview {
    box-sizing: border-box;
    line-height: 1.4;
    max-height: 38px;
    overflow: hidden;
    padding: 0 8px;
    position: relative;
    width: 50%;
    /*
        @include breakpoint("<960px") {
          width: 100%;
        }
    */
    &:after {
      background: linear-gradient(
          to right,
          rgba($white, 0),
          rgba($white, 1) 50%
      );
      content: '';
      height: 19px;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 30%;
    }
    @supports ( -webkit-line-clamp: 2 ) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      &:after {
        background: transparent;
      }
    }
  }

  .post-asset.is-unapproved .post-asset__asset-preview:after {
    background: linear-gradient(
        to right,
        rgba(mix($alert-yellow, $white, 8.5%), 0),
        rgba(mix($alert-yellow, $white, 8.5%), 1) 50%
    );
    @supports ( -webkit-line-clamp: 2 ) {
      background: transparent;
    }
  }
</style>
<script>
  import {Card} from '~/components/card'
  import AssetActions from './post-asset-actions'
  import '~/icons/gridicons-chevron-down'

  export default {
    props: {
      status: {
        type: String,
        require: true
      },
      isExpanded: {
        type: Boolean,
        default: false
      },
      isBulkEdit: {
        type: Boolean,
        default: false
      },
      order: {
        type: Number
      },
      asset: {
        type: Object
      }
    },
    components: {
      Card,
      AssetActions
    },
    computed: {
      classes () {
        return [
          'c-post-asset__header',
          {
            'is-preview': !this.isExpanded
          }
        ]
      }
    },
    methods: {
      handleFullHeaderClick (e) {
        return this.isBulkEdit ? this.$emit('toggleSelected', e) : this.toggleExpanded()
      },
      toggleExpanded (e) {
        this.$emit('toggleExpanded', e)
      }
    }
  }
</script>
