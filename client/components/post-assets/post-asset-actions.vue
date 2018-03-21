<template>
  <div class="c-post-asset__actions">
    <button type="button"
            class="c-button c-post-asset__action-approve is-borderless"
            :class="isApproved ? 'is-approved' : ''"
            @click="$emit('toggleApprove')">
      <svgicon name="gridicons-checkmark" class="" v-if="isApproved"/>
      <svgicon name="gridicons-checkmark-circle" class="" v-else/>
      <span v-if="isApproved">已审核</span>
      <span v-else>已批准</span>
    </button>

    <button type="button"
            class="c-button c-post-asset__action-trash is-borderless"
            @click="$emit('trash')"
            v-if="!isTrash">
      <svgicon name="gridicons-trash" class=""/>
      <span>回收站</span>
    </button>

    <button type="button"
            class="c-button c-post-asset__action-trash is-borderless is-scary"
            @click="$emit('delete')"
            v-if="isTrash">
      <svgicon name="gridicons-trash" class=""/>
      <span>删除</span>
    </button>
  </div>
</template>
<script>
  import {Card} from '~/components/card'
  import '~/icons/gridicons-checkmark'
  import '~/icons/gridicons-checkmark-circle'
  import '~/icons/gridicons-trash'

  export default {
    name: 'PostAssetActions',
    props: {
      status: {
        type: String
      }
    },
    data () {
      return {}
    },
    components: {
      Card
    },
    computed: {
      isApproved () {
        return this.status === 'approved'
      },
      isTrash () {
        return this.status === 'trash'
      }
    },
    methods: {
      translate (title) {
        switch (title) {
          case 'approved': {
            return '已审核'
          }
          case 'approve': {
            return '批准'
          }
          case 'edit': {
            return '编辑'
          }
          case 'trashed': {
            return '已回收'
          }
          case 'trash': {
            return '回收站'
          }
          default:
            break
        }
      }
    }
  }
</script>
