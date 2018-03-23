<template>
  <div class="c-section-nav">
    <h6 class="c-section-nav-group__label">Suggested Searches</h6>
    <div class="c-section-nav__panel ">
      <div class="c-section-nav-group">
        <div class="c-section-nav-tabs">
          <ul class="c-section-nav-tabs__list">
            <li class="c-section-nav-tab"
                :class="{'is-selected':selected === item.id}" v-for="(item, index) in navList"
                :key="item.id">
              <a class="c-section-nav-tab__link" tabindex="0">
                  <span class="c-section-nav-tab__text">
                    {{ item.title }}
                  </span>
              </a>
            </li>

          </ul>
        </div>
      </div>
      <!--
      <div class="c-section-header__actions">
              <button class="c-button is-compact u-mr-medium">
                <svgicon name="gridicons-cloud-upload" class="gridicon needs-offset"/>
                上传
              </button>
            </div>
            -->
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // Navs
        selected: 1,
        navList: [
          {id: 1, name: 'all', title: '全部'},
          {id: 2, name: 'unapproved', title: `未审核`},
          {id: 3, name: 'approved', title: '已审核'},
          {id: 4, name: 'trash', title: '回收站'}]
      }
    }
  }
</script>
