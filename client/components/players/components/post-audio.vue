<template>
  <foldable-card @toggleExpanded="toggleExpanded" compact>
    <div slot="header"
         @click="$emit('selectsong', aMusic)"
         class="u-flex u-align-items-center"
         style="height: 100%; width: 100%; cursor: pointer;">
      <!--<asset-actions v-if="isExpanded"/>-->
      <span class="aplayer-list-cur" :style="{background: theme}"></span>
      <div v-if="isExpanded" class="u-text-mute">时长：{{secondToTime(aMusic.duration)}} 分</div>
      <div v-else>
        <!--<span class="aplayer-list-index">{{ index +1}}</span>-->
        <span class="aplayer-list-title">{{ form.title }}</span>
      </div>
    </div>

    <div slot="summary">
      <confirm-button @confirm="$emit('removesong', aMusic)"/>
      <!--<span class="aplayer-list-author">{{ aMusic.author }}</span>-->
    </div>
    <div slot="expandedSummary">
      <div class="u-flex u-align-items-center u-justify-end">
        <confirm-button @confirm="$emit('removesong', aMusic)" class="u-mr-small"/>
        <button :class="{'c-button is-primary is-compact': true, 'is-busy': isSaving}" @click="handleSave">
          更新
        </button>
      </div>
    </div>
    <form>
      <div class="c-form-fieldset">
        <label class="c-form-label" for="asset_title">标题</label>
        <input type="text"
               id="asset_title"
               name="title"
               v-validate="'required'"
               placeholder="请输入内容标题"
               v-model="form.title"
               @change="updateTitle"
               :disabled="isSaving">

        <form-input-validation :isError="errors.has('title')" v-show="errors.has('title')">
          {{ errors.first('title') }}
        </form-input-validation>
      </div>
    </form>
  </foldable-card>
</template>
<script>
  import FoldableCard from '~/components/foldable-card'
  import ConfirmButton from '~/components/confirm-button'
  import PostAsset from '~/components/post-assets'
  import AssetActions from '~/components/post-assets/post-asset-actions'
  import FormInputValidation from '~/components/forms/form-input-validation'

  export default {
    components: {
      FoldableCard,
      ConfirmButton,
      PostAsset,
      AssetActions,
      FormInputValidation
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
        isSaving: false,
        theme: '#008be8',
        isExpanded: false
      }
    },
    computed: {
      form: {
        get () {
          return {...this.aMusic}
        },
        set (val) {
          this.form = val
        }
      }
    },
    methods: {
      secondToTime (second) {
        if (isNaN(second)) {
          return '00:00'
        }
        const pad0 = (num) => {
          return num < 10 ? '0' + num : '' + num
        }

        const min = Math.trunc(second / 60)
        const sec = Math.trunc(second - min * 60)
        const hours = Math.trunc(min / 60)
// eslint-disable-next-line no-extra-parens
        const minAdjust = Math.trunc((second / 60) - (60 * Math.trunc((second / 60) / 60)))
        return second >= 3600 ? pad0(hours) + ':' + pad0(minAdjust) + ':' + pad0(sec) : pad0(min) + ':' + pad0(sec)
      },
      updateTitle (e) {
        this.form.title = e.target.value
      },
      toggleExpanded (e) {
        this.isExpanded = !this.isExpanded
      },
      async handleSave () {
        this.isSaving = true
        await this.$validator.validateAll()
          .then(async (result) => {
            if (result) {
              const {data} = await this.$axios.post(`/apps/${this.$store.getters.appId}/posts/${this.form.id}`, {
                id: this.form.id,
                author: this.form.author,
                title: this.form.title,
                status: this.form.status
              })
              if (data && data.errno === 0) {
                this.$emit('updated', this.form)
                // 同步更新标题
                this.$store.commit('post/UPDATE_BLOCK_ITEM', this.form)
                this.$toast.success('更新成功')
                this.isSaving = false
              } else {
                this.$toast.error('更新失败')
                this.isSaving = false
              }
            } else {
              this.isSaving = false
            }
          })
      }
    }
  }
</script>
