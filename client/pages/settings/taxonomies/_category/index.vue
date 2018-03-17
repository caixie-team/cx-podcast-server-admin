<template>
  <div>
    <c-dialog
      v-model="showDialog"
      :on-close="closeDialog">
      <p>是否确定要永久删除“{{curTerm.name}}”？</p>
    </c-dialog>
    <div class="c-taxonomy-manager" style="position: relative;">
      <div class="c-taxonomy-manager__list-item" v-for="item in categories" :key="item.id">
        <div class="c-card c-taxonomy-manager__list-item-card is-compact">
          <div class="c-taxonomy-manager__item is-default">

            <span class="c-taxonomy-manager__icon">
              <svgicon name="gridicons-checkmark-circle"
                       class="gridicon gridicons-checkmark-circle"
                       v-if="options.options.term === item.term_id.toString()"/>
              <svg
                class="gridicon gridicons-folder" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" v-else><g><path
                d="M18 19H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2h7c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2z"></path></g>
              </svg>
            </span>
            <span class="c-taxonomy-manager__label" @click="edit(item)">
              <span>{{item.name}}</span>
              <span class="c-taxonomy-manager__default-label"
                    v-if="options.options.term === item.term_id.toString()">
                默认
              </span>
            </span>

            <span class="c-taxonomy__term-thumbnail-wrapper" v-if="item.featured_image">
              <img :src="`${item.featured_image}?imageMogr2/thumbnail/100x100/q/90/format/jpg/interlace/1`"
                   class="c-taxonomy__term-thumbnail">
            </span>
            <!--<span class="c-count">0</span>-->
            <ellipsis-menu>
              <button tabindex="-1"
                      class="c-popover__menu-item" @click="edit(item)">
                <svgicon name="gridicons-pencil"
                         class="gridicon gridicons-pencil needs-offset-y" scale="1.125"/>
                编辑
              </button>
              <button tabindex="-1" class="c-popover__menu-item" @click="del(item)"
                      v-if="!(options.options.term === item.term_id.toString())">
                <svgicon name="gridicons-trash"
                         class="gridicon gridicons-pencil needs-offset-y" scale="1.125"/>
                删除
              </button>
              <button class="c-popover__menu-item" @click="go(item)">
                <svgicon name="gridicons-visible"
                         class="gridicon gridicons-visible needs-offset-y" scale="1.125"/>
                查看内容
              </button>
              <!--<hr class="c-popover__menu-separator">-->
              <!--<button tabindex="-1" class="c-popover__menu-item" @click="setDefault(item)">-->
              <!--<svgicon name="gridicons-checkmark-circle"-->
              <!--class="gridicon gridicons-checkmark-circle needs-offset-y"-->
              <!--height="18" width="18" />-->
              <!--设为默认-->
              <!--</button>-->
            </ellipsis-menu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TransferDom from '~/directives/transfer-dom'

  import HeaderCake from '~/components/header-cake'
  import EllipsisMenu from '~/components/ellipsis-menu'
  import {CDialog} from '~/components/dialog'
  // import RootChild from '~/components/root-child'
  import '~/icons/gridicons-trash'
  import '~/icons/gridicons-pencil'
  import '~/icons/gridicons-checkmark-circle'
  import '~/icons/gridicons-visible'

  export default {
    async fetch ({store, params}) {
      await store.dispatch('loadCategories')
      await store.dispatch('loadAppInfo')
    },
    data () {
      return {
        showTermActions: false,
        termModal: false,
        transfer: true,
        showDialog: false,
        curTerm: {}
      }
    },
    components: {
      HeaderCake,
      EllipsisMenu,
      CDialog
    },
    directives: {
      TransferDom
    },
    methods: {
      setDefault (item) {
        console.log('set default')
      },
      edit (item) {
        this.$parent.$emit('edit-term', item)
      },
      async del (item) {
        this.showDialog = true
        this.curTerm = item
      },
      go (item) {
        this.$router.push('/posts/term/' + item.slug)
      },
      closeDialog (action) {
        if (action === 'ok') {
          this.$store.dispatch('deleteCategory', this.curTerm.slug)
        } else {
          this.curTerm = {}
        }
        this.showDialog = false
      }
    },
    computed: {
      options () {
        return this.$store.state.options.globalOption.data
      },
      categories () {
        return this.$store.state.categories.data.list
      }
    }
  }
</script>
