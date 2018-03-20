<template>
  <card :class="classes">
    <post-asset-header
      status="status"
      :isBulkEdit="isBulkEdit"
      :isExpanded="isExpanded"
      @delete="handleDelete"
      @trash="handleTrash"
      @toggleApprove="toggleApprove"
      :asset="asset"
      :order="order"
      @toggleExpanded="toggleExpanded"/>

    <div class="c-post-asset__content" v-if="isExpanded">
      <form>
        <div class="c-form-fieldset">
          <label for="asset_title">标题</label>
          <input type="text" id="asset_title" placeholder="请输入内容标题">
        </div>
      </form>
      <a-player
        theme="#14aaf5"
        preload="metadata"
        mode="circulation"
        :music="asset.audios[0]"
        :list="asset.audios"
        v-if="asset.audios"/>
    </div>
  </card>
</template>
<script>
  import {Card} from '~/components/card'
  import PostAssetHeader from './post-asset-header'
  import APlayer from '~/components/vue-aplayer'

  export default {
    components: {
      PostAssetHeader,
      Card,
      APlayer
    },
    props: {
      order: {
        type: Number,
        default: 1
      },
      asset: {
        type: Object
      },
      isBulkEdit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isExpanded: false,
        status: '',
        isLoading: true
      }
    },
    computed: {
      classes () {
        return [
          'c-post-asset',
          {
            'c-post-asset__placeholder': this.isLoading,
            'is-approved': this.status === 'approved',
            'is-unapproved': this.status === 'unapproved',
            'is-pending': this.status === 'unapproved',
            'is-bulk-edit': this.isBulkEdit,
            'is-expanded': this.isExpanded,
            'is-collapsed': !this.isExpanded,
            'is-trash': this.status === 'trash'
          }
        ]
      }
    },
    methods: {
      toggleExpanded () {
        this.isExpanded = !this.isExpanded
      },
      handleDelete () {
      },
      handleTrash () {
      },
      toggleApprove () {
      }
    }
  }
</script>
