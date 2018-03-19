<template>
  <div class="c-section-nav">
    <div class="c-section-nav__mobile-header">
      <span class="c-section-nav__mobile-header-text">建议搜索</span></div>
    <div class="c-section-nav__panel">
      <div class="c-section-nav-group">
        <div class="c-section-nav-tabs has-siblings">
          <h6 class="c-section-nav-group__label">Suggested Searches</h6>
          <ul class="c-section-nav-tabs__list" role="menu">
            <nuxt-link :to="defaultNav.slug" tag="li" class="c-section-nav-tab" v-if="defaultNav">
              <a class="c-section-nav-tab__link">
                <span class="c-section-nav-tab__text">
                  {{defaultNav.name}}
                </span>
              </a>
            </nuxt-link>

            <nuxt-link
              :to="basePath ? `${basePath}/${item.slug}` : `/${item.slug}`"
              tag="li"
              class="c-section-nav-tab"
              v-for="item in navs" :key="item.slug">
              <a class="c-section-nav-tab__link">
                  <span class="c-section-nav-tab__text">
                    {{item.name}}
                  </span>
              </a>
            </nuxt-link>
          </ul>
        </div>
      </div>
      <div :class="searchClass" v-if="isSearch">
        <div class="c-search__icon-navigation" aria-controls="search-component-12" aria-label="打开“搜索”"
             @click="toggleSearch">
          <svg class="gridicon gridicons-search c-search__open-icon" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path
                d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
            </g>
          </svg>
        </div>
        <div class="c-search__input-fade">
          <input type="search" id="search-component-12" class="c-search__input"
                 placeholder="搜索所有内容…" role="search" value="" aria-label="搜索"
                 aria-hidden="false" autocapitalize="none" @change="inputChange">
        </div>

        <div class="c-search__icon-navigation" tabindex="0" aria-controls="search-component-12" aria-label="关闭“搜索”"
             @click="toggleSearch">
          <svg class="gridicon gridicons-cross c-search__close-icon" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path
                d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div>
        <slot></slot>
      </div>

    </div>
  </div>

</template>
<script>
  export default {
    props: {
      isSearch: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String
      },
      defaultNav: {
        type: Object
      },
      navs: {
        type: Array
      }
    },
    data () {
      return {
        isOpen: false,
        isFocus: false
      }
    },
    methods: {
      inputChange (e) {
        this.$emit('input-change', e.target.value)
      },
      toggleSearch () {
        this.isOpen = !this.isOpen
        this.isFocus = !this.isFocus
      }
    },
    computed: {
      searchClass () {
        return [
          'is-expanded-to-container',
          {
            'is-open': this.isOpen
          },
          {
            'has-focus': this.isFocus
          },
          'has-open-icon',
          'c-search'
        ]
      }
    }
  }
</script>
