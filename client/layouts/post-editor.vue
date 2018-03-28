<template>
  <!--layout color-scheme is-default is-group-editor is-section-post-editor focus-sidebar-->
  <div :class="classes" ref="layout">
    <!--<header id="header" class="masterbar"><a data-tip-target="my-sites" href="/stats/day/bluepx.wordpress.com" title="查看您的网站列表并访问相应的控制面板" class="masterbar__item"><svg class="gridicon gridicons-my-sites" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.5 12c0-1.232.264-2.402.736-3.46L8.29 19.65C5.456 18.272 3.5 15.365 3.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117-.884.31-1.833.48-2.823.48zm1.172-12.485c.512-.027.973-.08.973-.08.458-.055.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.24-.107-2.24-.107-.458-.026-.51.674-.053.7 0 0 .434.055.892.082l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.055.403-.728-.055-.702 0 0-1.376.108-2.265.108-.16 0-.347-.003-.547-.01C6.418 5.025 9.03 3.5 12 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.727-1.427 1.51 0 .7.404 1.292.835 1.993.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.646 2.748l-.848 2.833-3.072-9.138zm3.1 11.332l2.597-7.506c.484-1.212.645-2.18.645-3.044 0-.313-.02-.603-.057-.874.664 1.21 1.042 2.6 1.042 4.078 0 3.136-1.7 5.874-4.227 7.347z"></path></g></svg><span class="masterbar__item-content">我的站点</span></a><a data-tip-target="reader" href="/" title="阅读您关注的博客和主题" class="masterbar__item masterbar__reader"><svg class="gridicon gridicons-reader" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M3 4v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4H3zm7 11H5v-1h5v1zm2-2H5v-1h7v1zm0-2H5v-1h7v1zm7 4h-5v-5h5v5zm0-7H5V6h14v2z"></path></g></svg><span class="masterbar__item-content">阅读器</span></a><div class="masterbar__publish"><a href="/post/bluepx.wordpress.com" title="创建新文章" class="masterbar__item masterbar__item-new"><svg class="gridicon gridicons-create" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 14v5c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5v2H5v14h14v-5h2z"></path><path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4"></path></g></svg><span class="masterbar__item-content">写</span></a><div><button class="button masterbar__toggle-drafts is-compact is-borderless" title="最新草稿" type="button"><span class="count">7</span></button></div></div><a data-tip-target="me" href="/me" title="更新您的个人资料、个人设置等" class="masterbar__item masterbar__item-me"><svg class="gridicon gridicons-user-circle" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.5c-4.694 0-8.5-3.806-8.5-8.5S7.306 3.5 12 3.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5zm0-8c-3.038 0-5.5 1.728-5.5 3.5s2.462 3.5 5.5 3.5 5.5-1.728 5.5-3.5-2.462-3.5-5.5-3.5zm0-.5c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"></path></g></svg><span class="masterbar__item-content"><img alt="Me" class="gravatar" src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm" width="18" height="18"><span class="masterbar__item-me-label">我</span></span></a><div class="masterbar__notifications"><a href="/notifications" title="管理您的通知" class="masterbar__item masterbar__item-notifications has-unread"><svg class="gridicon gridicons-bell" height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M6.14 14.97l2.828 2.827c-.362.362-.862.586-1.414.586-1.105 0-2-.895-2-2 0-.552.224-1.052.586-1.414zm8.867 5.324L14.3 21 3 9.7l.706-.707 1.102.157c.754.108 1.69-.122 2.077-.51l3.885-3.884c2.34-2.34 6.135-2.34 8.475 0s2.34 6.135 0 8.475l-3.885 3.886c-.388.388-.618 1.323-.51 2.077l.157 1.1z"></path></g></svg><span class="masterbar__item-content"><span class="masterbar__item-notifications-label">通知</span><span class="masterbar__notifications-bubble"></span></span></a><div id="wpnc-panel" class="wide wpnc__main wpnt-closed"><div><div class="wpnc__note-list disable-sticky"><div class="wpnc__filter"><ul class="wpnc__filter__segmented-control"><li data-filter-name="all" class="wpnc__filter__segmented-control-item selected">全部</li><li data-filter-name="unread" class="wpnc__filter__segmented-control-item">未读</li><li data-filter-name="comments" class="wpnc__filter__segmented-control-item">评论</li><li data-filter-name="follows" class="wpnc__filter__segmented-control-item">关注</li><li data-filter-name="likes" class="wpnc__filter__segmented-control-item">喜欢</li></ul></div><div class="wpnc__list-view is-empty-list"><ol class="wpnc__notes"><div class="wpnc__status-bar" style="display: none;"><span></span><span></span><button class="wpnc__close-link"><svg class="gridicon gridicons-cross" height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Cross</title><g><path d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path></g></svg></button></div><div class="wpnc__loading-indicator" style="opacity: 1; height: 446px;"><div class="wpnc__spinner animated"><span class="side left"></span><span class="side right"></span></div></div></ol></div></div><div class="wpnc__single-view"></div></div></div></div></header>-->
    <masterbar-logged-in :title="title" :sectionName="name"/>
    <div id="content" class="o-layout__content">
      <div id="primary" class="o-layout__primary">
        <nuxt/>
      </div>
      <div id="secondary" class="o-layout__secondary">
        <div class="editor-sidebar">
          <div class="editor-sidebar__header"><span class="editor-post-type">发布状态 <span
            class="post-status is-published"><span class="post-status__text">已发布</span></span></span>
            <button class="button editor-sidebar__back is-compact is-borderless" title="关闭边栏" type="button">
              <svg class="gridicon gridicons-cross" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"></path>
                </g>
              </svg>
            </button>
          </div>
          <div class="editor-drawer">
            <div class="accordion is-expanded" data-e2e-title="status" data-tip-target="accordion-status">
              <header class="accordion__header">
                <button type="button" class="accordion__toggle">
                  <span class="accordion__title">状态</span>
                  <span class="accordion__arrow">
                    <svg class="gridicon gridicons-dropdown" height="24" width="24"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                      d="M7 10l5 5 5-5"></path></g></svg>
                </span>
                </button>
              </header>
              <div class="accordion__content">
                <div class="accordion__content-wrap">
                  <div class="edit-post-status">
                    <div class="editor-publish-date">
                      <div class="editor-publish-date__wrapper">
                        <div class="editor-publish-date__header is-back-dated is-published">
                          <svg class="gridicon gridicons-calendar editor-publish-date__header-icon needs-offset"
                               height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g>
                              <path
                                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.105 0-2 .896-2 2v13c0 1.104.895 2 2 2h14c1.104 0 2-.896 2-2V6c0-1.104-.896-2-2-2zm0 15H5V8h14v11z"></path>
                            </g>
                          </svg>
                          <div class="editor-publish-date__header-wrapper">
                            <div class="editor-publish-date__header-description">已发布</div>
                            <div class="editor-publish-date__header-chrono">2017年2月8日</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="editor-visibility">
                      <div class="editor-visibility__dropdown">
                        <fieldset class="editor-fieldset form-fieldset">
                          <div class="select-dropdown">
                            <div class="select-dropdown__container" tabindex="0" aria-haspopup="true"
                                 aria-owns="select-submenu-13" aria-controls="select-submenu-13" aria-expanded="false">
                              <div id="select-dropdown-13" class="select-dropdown__header"><span
                                class="select-dropdown__header-text"><svg class="gridicon gridicons-globe" height="18"
                                                                          width="18" xmlns="http://www.w3.org/2000/svg"
                                                                          viewBox="0 0 24 24"><g><path
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path></g></svg>公开</span>
                              </div>
                              <ul id="select-submenu-13" class="select-dropdown__options" role="menu"
                                  aria-labelledby="select-dropdown-13" aria-expanded="false">
                                <li class="select-dropdown__option"><a
                                  class="select-dropdown__item is-selected has-icon" data-bold-text="public"
                                  role="menuitem" tabindex="" aria-selected="true"><span
                                  class="select-dropdown__item-text"><svg class="gridicon gridicons-globe" height="18"
                                                                          width="18" xmlns="http://www.w3.org/2000/svg"
                                                                          viewBox="0 0 24 24"><g><path
                                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path></g></svg>公开</span></a>
                                </li>
                                <li class="select-dropdown__option"><a class="select-dropdown__item has-icon"
                                                                       data-bold-text="private" role="menuitem"
                                                                       tabindex="" aria-selected="false"><span
                                  class="select-dropdown__item-text"><svg class="gridicon gridicons-user" height="18"
                                                                          width="18" xmlns="http://www.w3.org/2000/svg"
                                                                          viewBox="0 0 24 24"><g><path
                                  d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2z"></path></g></svg>管理员和编辑</span></a>
                                </li>
                                <li class="select-dropdown__option"><a class="select-dropdown__item has-icon"
                                                                       data-bold-text="password" role="menuitem"
                                                                       tabindex="" aria-selected="false"><span
                                  class="select-dropdown__item-text"><svg class="gridicon gridicons-lock" height="18"
                                                                          width="18" xmlns="http://www.w3.org/2000/svg"
                                                                          viewBox="0 0 24 24"><g><path
                                  d="M18 8h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H6c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V10c0-1.105-.895-2-2-2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm4 8.723V18h-2v-2.277c-.595-.346-1-.984-1-1.723 0-1.105.895-2 2-2s2 .895 2 2c0 .738-.405 1.376-1 1.723z"></path></g></svg>加密</span></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <label class="edit-post-status__sticky"><span class="edit-post-status__label-text">设置为精选内容<span
                      class="info-popover"><svg class="gridicon gridicons-info-outline needs-offset" height="18"
                                                width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                      d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg></span></span><span
                      class="form-toggle__wrapper"><input type="checkbox" id="toggle-7" class="form-toggle is-compact"
                                                          readonly="" value="on"><label class="form-toggle__label"
                                                                                        for="toggle-7"><span
                      class="form-toggle__switch" role="checkbox" aria-checked="false" aria-label="将文章固定到头版"
                      tabindex="0"></span><span class="form-toggle__label-content"></span></label></span></label>

                  </div>
                </div>
              </div>
            </div>
            <div class="accordion editor-drawer__accordion editor-categories-tags__accordion is-expanded has-subtitle"
                 data-e2e-title="categories-tags" data-tip-target="accordion-categories-tags">
              <header class="accordion__header">
                <button type="button" class="accordion__toggle"><span class="accordion__title">类别和标签</span><span
                  class="accordion__subtitle">采撷科技</span><span class="accordion__arrow"><svg
                  class="gridicon gridicons-dropdown" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"><g><path d="M7 10l5 5 5-5"></path></g></svg></span></button>
              </header>
              <div class="accordion__content">
                <div class="accordion__content-wrap">
                  <section class="accordion__section"><label class="editor-drawer__label"><span
                    class="editor-drawer__label-text">分类<span class="info-popover"><svg
                    class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                    d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg></span></span></label>
                    <div>
                      <div class="">
                        <div class="term-tree-selector is-small is-compact">
                          <div aria-label="grid"
                               class="ReactVirtualized__Grid ReactVirtualized__List term-tree-selector__results"
                               role="grid" tabindex="0"
                               style="box-sizing: border-box; direction: ltr; height: 78px; position: relative; width: 238px; will-change: transform; overflow: hidden;">
                            <div class="ReactVirtualized__Grid__innerScrollContainer"
                                 style="width: auto; height: 78px; max-width: 238px; max-height: 78px; overflow: hidden; position: relative;">
                              <div style="height: 26px; left: 0px; position: absolute; top: 0px; width: 100%;">
                                <div class="term-tree-selector__list-item"><label><input type="checkbox"
                                                                                         value="51105"><span
                                  class="term-tree-selector__label">000</span></label></div>
                              </div>
                              <div style="height: 26px; left: 0px; position: absolute; top: 26px; width: 100%;">
                                <div class="term-tree-selector__list-item"><label><input type="checkbox"
                                                                                         value="43324206"><span
                                  class="term-tree-selector__label">異</span></label></div>
                              </div>
                              <div style="height: 26px; left: 0px; position: absolute; top: 52px; width: 100%;">
                                <div class="term-tree-selector__list-item"><label><input type="checkbox"
                                                                                         value="559370614"><span
                                  class="term-tree-selector__label">采撷科技</span></label></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="editor-term-selector__add-term is-compact">
                        <button type="button" class="button is-compact is-borderless">
                          <svg class="gridicon gridicons-folder" height="24" width="24"
                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g>
                              <path
                                d="M18 19H6c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2h7c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2z"></path>
                            </g>
                          </svg>
                          添加新分类目录
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div class="editor-drawer__taxonomies"></div>
            <div class="accordion is-expanded" data-e2e-title="featured-image"
                 data-tip-target="accordion-featured-image">
              <header class="accordion__header">
                <button type="button" class="accordion__toggle">
                  <span class="accordion__title">封面图片</span><span
                  class="accordion__arrow">
                  <svg class="gridicon gridicons-dropdown" height="24" width="24"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                    d="M7 10l5 5 5-5"></path></g></svg></span>
                </button>
              </header>
              <div class="accordion__content">
                <div class="accordion__content-wrap">
                  <div class="accordion__content-wrap">
                    <div class="editor-drawer-well is-empty">
                      <div class="editor-drawer-well__content">
                        <div class="editor-featured-image">
                          <div class="editor-featured-image__inner-content">
                            <button class="button editor-featured-image__current-image is-compact is-borderless"
                                    data-tip-target="editor-featured-image-current-image" type="button">
                              <svg class="gridicon gridicons-pencil editor-featured-image__edit-icon" height="24"
                                   width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g>
                                  <path
                                    d="M13 6l5 5-9.507 9.507c-.686-.686-.69-1.794-.012-2.485l-.002-.003c-.69.676-1.8.673-2.485-.013-.677-.677-.686-1.762-.036-2.455l-.008-.008c-.694.65-1.78.64-2.456-.036L13 6zm7.586-.414l-2.172-2.172c-.78-.78-2.047-.78-2.828 0L14 5l5 5 1.586-1.586c.78-.78.78-2.047 0-2.828zM3 18v3h3c0-1.657-1.343-3-3-3z"></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="editor-drawer-well__placeholder">
                        <span class="editor-drawer-well__button button is-compact">设置封面图</span></button>
                      <div class="drop-zone editor-featured-image__dropzone">
                        <div class="drop-zone__content">
                          <div><span class="drop-zone__content-icon"><svg width="55" height="42" viewBox="0 0 55 42"
                                                                          xmlns="http://www.w3.org/2000/svg"><title>Featured Image</title><g
                            fill-rule="nonzero" fill="#542B06"><path
                            d="M22 11c0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3-3-1.344-3-3zm18-7v12.33l-3.173 8.29-12.01.637L31.992 32H4c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h32c2.21 0 4 1.79 4 4zm-4 0H4v14.888L12 10l11.79 13.1 3.174-3.7c1.596-1.864 4.48-1.864 6.074 0L36 22.852V4z"></path><path
                            d="M41 16.667l3.443 9.27 9.89.406-7.762 6.136L49.24 42 41 36.52 32.76 42l2.67-9.52-7.763-6.14 9.89-.404"></path></g></svg></span><span
                            class="drop-zone__content-text">设为推荐图片</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="accordion editor-post-formats__accordion editor-drawer__accordion is-expanded has-subtitle"
                   data-e2e-title="post-format" data-tip-target="accordion-post-format">
                <header class="accordion__header">
                  <button type="button" class="accordion__toggle"><span class="accordion__title">文章格式</span><span
                    class="accordion__subtitle">链接</span><span class="accordion__arrow"><svg
                    class="gridicon gridicons-dropdown" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"><g><path d="M7 10l5 5 5-5"></path></g></svg></span></button>
                </header>
                <div class="accordion__content">
                  <div class="accordion__content-wrap">
                    <section class="accordion__section">
                      <ul class="editor-post-formats">
                        <li class="editor-post-formats__format"><label><input type="radio" name="format"
                                                                              value="standard" class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-posts needs-offset" height="18" width="18"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                          d="M16 19H3v-2h13v2zm5-10H3v2h18V9zM3 5v2h11V5H3zm14 0v2h4V5h-4zm-6 8v2h10v-2H11zm-8 0v2h5v-2H3z"></path></g></svg></span>标准</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="aside"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-aside" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"><g><path
                          d="M14 20l6-6V6c0-1.105-.895-2-2-2H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h8zM6 6h12v6h-4c-1.105 0-2 .895-2 2v4H6V6zm10 4H8V8h8v2z"></path></g></svg></span>日志</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="image"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-image" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"><g><path
                          d="M20 6v12c0 1.105-.895 2-2 2H6c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2zm-2 0H6v6.38l2.19-2.19 5.23 5.23 1-1c.63-.504 1.536-.456 2.11.11L18 16V6zm-5 3.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5z"></path></g></svg></span>图像</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="video"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-video-camera needs-offset-y" height="18" width="18"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                          d="M17 9V7c0-1.105-.895-2-2-2H4c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h11c1.105 0 2-.895 2-2v-2l5 4V5l-5 4z"></path></g></svg></span>视频</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="quote"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-quote" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"><g><path
                          d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z"></path></g></svg></span>引语</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="link"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-link needs-offset" height="18" width="18"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                          d="M17 13H7v-2h10v2zm1-6h-1c-1.63 0-3.065.792-3.977 2H18c1.103 0 2 .897 2 2v2c0 1.103-.897 2-2 2h-4.977c.913 1.208 2.347 2 3.977 2h1c2.21 0 4-1.79 4-4v-2c0-2.21-1.79-4-4-4zM2 11v2c0 2.21 1.79 4 4 4h1c1.63 0 3.065-.792 3.977-2H6c-1.103 0-2-.897-2-2v-2c0-1.103.897-2 2-2h4.977C10.065 7.792 8.63 7 7 7H6c-2.21 0-4 1.79-4 4z"></path></g></svg></span>链接</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="gallery"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-image-multiple" height="18" width="18"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                          d="M15 7.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5S17.328 9 16.5 9 15 8.328 15 7.5zM4 20h14c0 1.105-.895 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.105.895-2 2-2v14zM22 4v12c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2V4c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2zM8 4v6.333L11 7l4.855 5.395.656-.73c.796-.886 2.183-.886 2.977 0l.513.57V4H8z"></path></g></svg></span>相册</span></label>
                        </li>
                        <li class="editor-post-formats__format"><label><input type="radio" name="format" value="audio"
                                                                              class="form-radio"><span
                          class="editor-post-formats__format-label"><span class="editor-post-formats__format-icon"><svg
                          class="gridicon gridicons-audio" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"><g><path
                          d="M8 4v10.184C7.686 14.072 7.353 14 7 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7h7v4.184c-.314-.112-.647-.184-1-.184-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V4H8z"></path></g></svg></span>音频</span></label>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion editor-drawer__more-options is-expanded" data-e2e-title="more-options"
                 data-tip-target="accordion-more-options">
              <header class="accordion__header">
                <button type="button" class="accordion__toggle"><span class="accordion__title">更多选项</span><span
                  class="accordion__arrow"><svg class="gridicon gridicons-dropdown" height="24" width="24"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                  d="M7 10l5 5 5-5"></path></g></svg></span></button>
              </header>
              <div class="accordion__content">
                <div class="accordion__content-wrap">
                  <section class="accordion__section"><label class="editor-drawer__label"><span
                    class="editor-drawer__label-text">摘要<span class="info-popover"><svg
                    class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                    d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg></span></span><textarea
                    id="excerpt" name="excerpt" placeholder="编写摘录…" aria-label="编写摘录…" class="form-textarea"></textarea></label>
                  </section>

                  <section class="accordion__section">
                    <fieldset class="editor-fieldset">
                      <legend class="editor-fieldset__legend">讨论</legend>
                      <div class="editor-fieldset__option">
                        <label><input type="checkbox" name="comment_status"
                                      class="form-checkbox"
                                      value="on"><span>允许评论<span
                          class="info-popover editor-comment_status__info"><svg
                          class="gridicon gridicons-info-outline needs-offset" height="18" width="18"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                          d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm-1-7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></g></svg></span></span></label>
                      </div>
                    </fieldset>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div class="sidebar__footer">
            <div class="editor-delete-post">
              <button class="button editor-delete-post__button is-borderless" aria-label="移动到回收站" type="button">
                <svg class="gridicon gridicons-trash needs-offset-y" height="18" width="18"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"></path>
                  </g>
                </svg>
                移动到回收站
              </button>
            </div>
            <button class="button inline-help is-borderless" title="帮助" type="button">
              <svg class="gridicon gridicons-help-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24">
                <g>
                  <path
                    d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 8c0-2.21-1.79-4-4-4s-4 1.79-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2c-.552 0-1 .448-1 1v2h2v-1.14c1.722-.447 3-1.998 3-3.86zm-3 6h-2v2h2v-2z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MasterbarLoggedIn from './masterbar/logged-in.vue'

  export default {
    name: 'PostEditorLayout',
    props: {
      title: String,
      name: String
    },
    components: {
      MasterbarLoggedIn
    },
    mounted () {
      // scrollToTop: function () {
      document.getElementById('secondary').scrollTop = 0
      window.scrollTo(0, 0)
      // },
    },
    computed: {
      fullWideLayout () {
        return this.$store.state.options.fullWideLayout
      },
      editorLayout () {
      },
      currentLayoutFocus () {
        return this.$store.state.options.layoutFocus
      },
      classes () {
        // const focus = this.$store.state.options.layoutFocus
        const classArray = [
          'notouch',
          'o-layout',
          'is-default',
          this.$store.state.options.layoutStatus,
          // 'is-section-posts-pages',
          this.currentLayoutFocus ? this.currentLayoutFocus : 'focus-sidebar',
          // this.currentLayoutFocus,
          {'has-no-sidebar': this.fullWideLayout && this.currentLayoutFocus !== 'focus-sidebar'}
        ]
        return classArray
      }
    }
  }
</script>
