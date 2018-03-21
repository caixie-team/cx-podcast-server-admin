<template>
  <foldable-card @toggleExpanded="toggleExpanded" compact>
    <!--<div slot="header">-->
    <!--</div>-->
    <div slot="header"
         @click="$emit('selectsong', aMusic)"
         class="u-flex u-align-items-center"
         style="height: 100%; width: 100%; cursor: pointer;">
      <asset-actions v-if="isExpanded"/>
      <div v-else>
        <span class="aplayer-list-cur" :style="{background: theme}"></span>
        <span class="aplayer-list-index">{{ index + 1}}</span>
        <span class="aplayer-list-title">{{ aMusic.title }}</span>
      </div>
    </div>

    <div slot="summary">
      <confirm-button @confirm="$emit('removesong', aMusic)"/>
      <!--<span class="aplayer-list-author">{{ aMusic.author }}</span>-->
    </div>
    <div slot="expandedSummary">
      <div class="u-flex u-align-items-center u-justify-end">
      <confirm-button @confirm="$emit('removesong', aMusic)" class="u-mr-small"/>
      <button class="c-button is-primary is-compact"> 更新</button>
      </div>
    </div>
    <form>
      <div class="c-form-fieldset">
        <label class="c-form-label" for="asset_title">标题</label>
        <input type="text" id="asset_title" placeholder="请输入内容标题">
      </div>
    </form>
  </foldable-card>
</template>
<script>
  import FoldableCard from '~/components/foldable-card'
  import ConfirmButton from '~/components/confirm-button'
  import PostAsset from '~/components/post-assets'
  import AssetActions from '~/components/post-assets/post-asset-actions'

  export default {
    components: {
      FoldableCard,
      ConfirmButton,
      PostAsset,
      AssetActions
    },
    props: {
      aMusic: {
        type: Object,
        require: true
      },
      index: {
        type: Number,
        require: true
      },
      status: {
        type: String,
        require: true
      }
    },
    data () {
      return {
        theme: '#008be8',
        isExpanded: false
      }
    },
    methods: {
      toggleExpanded (e) {
        this.isExpanded = !this.isExpanded
      }
    }
  }
</script>
