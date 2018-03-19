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
      :order="1"
      @toggleExpanded="toggleExpanded"/>

    <div class="c-post-asset__content" v-if="isExpanded"></div>
  </card>
</template>
<script>
  import {Card} from '~/components/card'
  import PostAssetHeader from './post-asset-header'

  export default {
    components: {
      PostAssetHeader,
      Card
    },
    props: {
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
      handleDelete () {},
      handleTrash () {},
      toggleApprove () {}
    }
  }
</script>
