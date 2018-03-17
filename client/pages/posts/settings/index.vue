<template>
  <main data-reactroot="" class="site-settings main" role="main"><!-- react-empty: 932 --><!-- react-empty: 933 -->
    <header class="current-section"><a>
      <svg class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path>
        </g>
      </svg>
      <div class="site-icon is-blank" style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
        <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
          </g>
        </svg>
      </div>
      <div>
        <p class="current-section__site-title">bluepx</p>
        <h1 class="current-section__section-title">站点设置</h1>
      </div>
    </a>
    </header>
    <div class="section-nav">
      <div class="section-nav__mobile-header"><span class="section-nav__mobile-header-text">常规</span></div>
      <div class="section-nav__panel">
        <div class="section-nav-group">
          <div class="section-nav-tabs">
            <ul class="section-nav-tabs__list" role="menu">
              <li class="is-selected section-nav-tab"><a href="/settings/general/bluepx.wordpress.com"
                                                         class="section-nav-tab__link" tabindex="0" aria-selected="true"
                                                         role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 956 -->常规
                <!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/settings/writing/bluepx.wordpress.com" class="section-nav-tab__link"
                                             tabindex="0" aria-selected="false" role="menuitem"><span
                class="section-nav-tab__text"><!-- react-text: 960 -->撰写<!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/settings/discussion/bluepx.wordpress.com"
                                             class="section-nav-tab__link" tabindex="0" aria-selected="false"
                                             role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 964 -->讨论
                <!-- /react-text --></span></a></li>
              <li class="section-nav-tab"><a href="/settings/traffic/bluepx.wordpress.com" class="section-nav-tab__link"
                                             tabindex="0" aria-selected="false" role="menuitem"><span
                class="section-nav-tab__text"><!-- react-text: 968 -->浏览量<!-- /react-text --></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div><!-- react-empty: 969 --><!-- react-empty: 970 -->
    <div class="site-settings__main general-settings">
      <div><!-- react-empty: 973 -->
        <div class="site-settings__general-settings"><!-- react-empty: 975 -->
          <div class="card section-header is-compact">
            <div class="section-header__label"><span class="section-header__label-text">站点个人资料</span></div>
            <div class="section-header__actions">
              <button data-tip-target="settings-site-profile-save" type="submit" class="button is-compact is-primary">
                保存设置
              </button>
            </div>
          </div>
          <div class="card">
            <form>
              <div class="site-settings__site-options">
                <div class="site-settings__site-title-tagline">
                  <fieldset class="form-fieldset"><label for="blogname" class="form-label"><!-- react-text: 987 -->站点标题
                    <!-- /react-text --></label><input type="text" name="blogname" id="blogname"
                                                       data-tip-target="site-title-input" value="bluepx"
                                                       class="form-text-input"></fieldset>
                  <fieldset class="form-fieldset"><label for="blogdescription" class="form-label">
                    <!-- react-text: 991 -->站点副标题<!-- /react-text --></label><input type="text" name="blogdescription"
                                                                                    id="blogdescription"
                                                                                    data-tip-target="site-tagline-input"
                                                                                    value="" class="form-text-input">
                    <p class="form-setting-explanation">简要描述该站点。</p></fieldset>
                </div>
                <fieldset class="site-icon-setting form-fieldset"><label class="site-icon-setting__heading form-label">
                  <!-- react-text: 996 -->站点图标<!-- /react-text --><span class="info-popover"><svg
                  class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                  d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg>
                  <!-- react-empty: 1001 --></span></label>
                  <button type="button" class="site-icon-setting__icon">
                    <div class="site-icon is-blank"
                         style="height: 96px; width: 96px; line-height: 96px; font-size: 96px;">
                      <svg class="gridicon gridicons-globe" height="74" width="74" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24">
                        <g>
                          <path
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                        </g>
                      </svg>
                    </div>
                  </button>
                  <button type="button" class="button site-icon-setting__button is-compact">更改</button>
                </fieldset>
              </div>
              <fieldset class="site-settings__has-divider form-fieldset"><label for="blogaddress" class="form-label">
                <!-- react-text: 1010 -->站点地址<!-- /react-text --></label>
                <div class="site-settings__blogaddress-settings"><input type="text" name="blogaddress" id="blogaddress"
                                                                        value="bluepx.wordpress.com" disabled=""
                                                                        class="form-text-input"><a
                  href="/domains/add/bluepx.wordpress.com" class="button">
                  <svg class="gridicon gridicons-plus" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 24 24">
                    <g>
                      <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8v2z"></path>
                    </g>
                  </svg><!-- react-text: 1017 --> <!-- /react-text --><!-- react-text: 1018 -->添加自定义地址
                  <!-- /react-text --></a></div>
                <p class="form-setting-explanation"><!-- react-text: 1020 -->购买<!-- /react-text --><a
                  href="/domains/add/bluepx.wordpress.com">自定义域</a><!-- react-text: 1022 -->，<!-- /react-text --><a
                  href="/domains/add/mapping/bluepx.wordpress.com">映射</a><!-- react-text: 1024 -->您已拥有的域，或
                  <!-- /react-text --><a href="/domains/add/site-redirect/bluepx.wordpress.com">重定向</a>
                  <!-- react-text: 1026 -->此站点。<!-- /react-text --></p>
              </fieldset>
            </form>
          </div>
          <div class="card section-header is-compact">
            <div class="section-header__label"><span class="section-header__label-text">隐私权</span></div>
            <div class="section-header__actions">
              <button type="submit" class="button is-compact is-primary">保存设置</button>
            </div>
          </div>
          <div class="card">
            <form>
              <fieldset class="form-fieldset"><label class="form-label"><input type="radio" name="blog_public" value="1"
                                                                               class="form-radio"><span>公开</span></label>
                <p class="form-setting-explanation is-indented">所有人都能看到您的站点，并且您的站点可能被搜索引擎编入索引。</p><label
                  class="form-label"><input type="radio" name="blog_public" value="0" class="form-radio"><span>隐藏</span></label>
                <p class="form-setting-explanation is-indented">所有人都能看到您的站点，不过我们已请求搜索引擎不将您的站点编入索引。</p>
                <div><label class="form-label"><input type="radio" name="blog_public" value="-1"
                                                      class="form-radio"><span>私密</span></label>
                  <p class="form-setting-explanation is-indented">只有您自己和得到您批准的用户能够看到您的站点。</p></div>
              </fieldset>
            </form>
          </div>
          <div class="site-settings__footer-credit-container">
            <div class="card section-header is-compact">
              <div class="section-header__label"><span class="section-header__label-text">注脚文本</span></div>
              <div class="section-header__actions"></div>
            </div>
            <div class="card site-settings__footer-credit-explanation is-compact"><p>您可以在定制器中更改注脚文本，定制您的网站。</p>
              <div><a class="button site-settings__footer-credit-change"
                      href="/customize/identity/bluepx.wordpress.com">更改注脚文本</a></div>
            </div>
            <a class="card banner is-upgrade-business is-card-link"
               href="/plans/bluepx.wordpress.com?feature=no-wp-branding">
              <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
                </g>
              </svg>
              <div class="banner__icon-plan"><img src="/images/plans/plan-business-circle.svg"
                                                  class="plan-icon plan-icon__business is-business-plan"></div>
              <div class="banner__content">
                <div class="banner__info">
                  <div class="banner__title">购买 WordPress.com 商务版以彻底删除注脚文本</div>
                  <div class="banner__description">升级以删除注脚文本，添加 Google Analytics（分析）等功能</div>
                </div>
              </div>
            </a></div>
        </div>
      </div>
      <div class="site-tools">
        <div class="card section-header is-compact">
          <div class="section-header__label"><span class="section-header__label-text">站点工具</span></div>
          <div class="section-header__actions"></div>
        </div>
        <a href="/domains/manage/bluepx.wordpress.com" class="card site-tools__link is-compact is-card-link">
          <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
            </g>
          </svg>
          <div class="site-tools__content"><p class="site-tools__section-title">更改您的站点地址。</p>
            <p class="site-tools__section-desc">注册新域或更改站点地址。</p></div>
        </a><a href="/settings/import/bluepx.wordpress.com" class="card site-tools__link is-compact is-card-link">
        <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
          </g>
        </svg>
        <div class="site-tools__content"><p class="site-tools__section-title">导入</p>
          <p class="site-tools__section-desc">从其他 WordPress 或 Medium 站点中导入内容。</p></div>
      </a><a href="/settings/export/bluepx.wordpress.com" class="card site-tools__link is-compact is-card-link">
        <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
          </g>
        </svg>
        <div class="site-tools__content"><p class="site-tools__section-title">导出</p>
          <p class="site-tools__section-desc">从您的站点中导出内容。您的数据为您所有。</p></div>
      </a><a href="/settings/start-over/bluepx.wordpress.com" class="card site-tools__link is-compact is-card-link">
        <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
          </g>
        </svg>
        <div class="site-tools__content"><p class="site-tools__section-title">删除您的内容</p>
          <p class="site-tools__section-desc">保留您站点的地址和当前主题，但删除所有文章、网页和媒体文件，以便您可以重新开始。</p></div>
      </a><a href="/settings/delete-site/bluepx.wordpress.com" class="card site-tools__link is-compact is-card-link">
        <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
          </g>
        </svg>
        <div class="site-tools__content"><p class="site-tools__section-title is-warning">永久删除您的站点</p>
          <p class="site-tools__section-desc">删除您的所有文章、网页、媒体和数据，并放弃您的站点地址</p></div>
      </a><!-- react-empty: 1121 --></div>
    </div>
  </main>
</template>
