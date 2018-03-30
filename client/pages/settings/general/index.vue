<template>
  <div class="c-app-settings__main c-general-settings">
    <div class="c-app-settings__general-settings">
      <div class="c-card c-section-header is-compact">
        <div class="c-section-header__label">
          <span class="c-section-header__label-text">应用信息</span></div>
        <div class="c-section-header__actions">
          <button
            type="submit"
            class="c-button is-compact is-primary" disabled>
            保存设置
          </button>
        </div>
      </div>
      <div class="c-card">
        <form>
          <div class="c-app-settings__app-options">
            <div class="c-app-settings__app-title-tagline">
              <fieldset class="c-form-fieldset">
                <label for="blogname" class="c-form-label">应用标题</label>
                <input type="text"
                       name="blogname"
                       id="blogname"
                       data-tip-target="c-app-title-input"
                       :value="curApp.name"
                       class="c-form-text-input">
              </fieldset>
              <fieldset class="c-form-fieldset">
                <label for="description" class="c-form-label">应用描述</label>
                <input
                  id="description"
                  type="text"
                  :value="curApp.description"
                  class="c-form-text-input">
                <p class="c-form-setting-explanation">简要描述该站点。</p>
              </fieldset>
            </div>
            <fieldset class="c-app-icon-setting c-form-fieldset">

              <label class="c-app-icon-setting__heading c-form-label">
                应用图标
              </label>
              <button type="button" class="c-app-icon-setting__icon">
                <!--<div class="c-app-icon"-->
                     <!--style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;"><img-->
                  <!--class="c-app-icon__img c-image"-->
                  <!--src="https://bluepx.files.wordpress.com/2017/10/cropped-cover.jpg?w=240"-->
                  <!--alt="">-->
                <!--</div>-->
                <div class="c-app-icon">
                  <img class="c-app-icon__img c-image"
                       :src="curApp.logo_url"
                       v-if="curApp.logo_url" style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;">
                  <svg class="gridicon gridicons-globe" height="11" width="11"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 24 24" v-else>
                    <g>
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                    </g>
                  </svg>
                </div>
              </button>
              <button type="button"
                      class="c-button c-app-icon-setting__button is-compact" disabled>更改
              </button>
              <button class="c-button c-app-icon-setting__button is-compact is-scary"
                      type="button" disabled>移除
              </button>
            </fieldset>
          </div>

        </form>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    name: 'SettingGeneral',
    computed: {
      curApp () {
        return this.$store.state.org.currentApp
      }
    }
  }
</script>
