<template>
  <div class="c-app-settings__main c-general-settings">
    <div class="c-app-settings__general-settings">
      <div class="c-card c-section-header is-compact">
        <div class="c-section-header__label">
          <span class="c-section-header__label-text">应用信息</span></div>
        <div class="c-section-header__actions">
          <button
            type="submit"
            class="c-button is-compact is-primary">
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
                       value="bluepx"
                       class="c-form-text-input">
              </fieldset>
              <fieldset class="c-form-fieldset">
                <label for="blogdescription" class="c-form-label">应用副标题</label>
                <input
                  type="text" name="blogdescription" id="blogdescription" value=""
                  class="c-form-text-input">
                <p class="c-form-setting-explanation">简要描述该站点。</p>
              </fieldset>
            </div>
            <fieldset class="c-app-icon-setting c-form-fieldset">
              <label class="c-app-icon-setting__heading c-form-label">
                应用图标
              </label>
              <button type="button" class="c-app-icon-setting__icon">
                <div class="c-app-icon"
                     style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;"><img
                  class="c-app-icon__img c-image"
                  src="https://bluepx.files.wordpress.com/2017/10/cropped-cover.jpg?w=240"
                  alt=""></div>
              </button>
              <button type="button"
                      class="c-button c-app-icon-setting__button is-compact">更改
              </button>
              <button class="c-button c-app-icon-setting__button is-compact is-scary"
                      type="button">移除
              </button>
            </fieldset>
          </div>
          <fieldset class="c-app-settings__has-divider c-form-fieldset">
            <label for="blogaddress"
                   class="c-form-label">站点地址</label>
            <div class="c-app-settings__blogaddress-settings">
              <input type="text" name="blogaddress" id="blogaddress"
                     value="bluepx.wordpress.com" disabled=""
                     class="c-form-text-input">
              <a
                href="/domains/add/bluepx.wordpress.com" class="c-button">
                <svg class="gridicon gridicons-plus" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z"></path>
                  </g>
                </svg>
                添加自定义地址</a></div>
            <p class="c-form-setting-explanation">
              购买
              <a href="/domains/add/bluepx.wordpress.com">自定义域</a>，
              <a href="/domains/add/mapping/bluepx.wordpress.com">映射</a>您已拥有的域，或
              <a href="/domains/add/c-app-redirect/bluepx.wordpress.com">重定向</a>此站点。
            </p>
          </fieldset>
        </form>
      </div>
    </div>

  </div>

</template>
