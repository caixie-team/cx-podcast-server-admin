<template>
  <fieldset class="c-form-fieldset">
    <label :for="labelFor" class="c-form-label" v-if="label">
      {{label}}
    </label>
    <div class="c-counted-textarea">
      <textarea
        :id="labelFor"
        :name="name"
        :maxlength="maxlength"
        :placeholder="placeholder"
        class="c-counted-textarea__input c-form-textarea"
        v-model="content" @change="handleChange"/>
      <div class="c-counted-textarea__count-panel">
        {{ _wordCount(content) }} 个字
      </div>
    </div>
  </fieldset>
</template>
<script>
  export default {
    props: {
      label: {
        type: String
      },
      id: {
        type: String
      },
      name: {
        type: String,
        require: true
      },
      maxlength: {
        type: Number,
        default: 500
      },
      placeholder: {
        type: String
      },
      value: {
        type: String
      }
    },
    data () {
      return {
        content: this.value
      }
    },
    computed: {
      labelFor () {
        return this.id ? this.id : this.name
      }
    },
    methods: {
      _wordCount (data) {
        const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g

        const m = data.match(pattern)
        let count = 0
        if (m === null) {
          return count
        }
        for (let i = 0; i < m.length; i++) {
          if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
          } else {
            count += 1
          }
        }
        return count
      },
      handleChange (event) {
        this.$emit('change', event.target.value)
      }
    },
    watch: {
      value (val) {
        this.content = val
      },
      content (val) {
        this.$emit('input-change', val)
      }
    }
  }
</script>
