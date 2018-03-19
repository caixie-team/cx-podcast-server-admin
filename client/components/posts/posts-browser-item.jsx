/* eslint-disable no-extra-parens */
export default {
  props: {
    isPlaceholder: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    author: {
      type: String
    },
    date: {
      type: String
    },
    link: {
      type: String
    }
  },
  data () {
    return {
      msg: 'Show the message'
    }
  },
  methods: {
    hello () {
      alert('Header is the message')
    },
    renderPlaceholder () {
      return (
        <li class="c-posts-browser-item is-placeholder">
				<span class="c-posts-browser-item__link">
					<div class="c-posts-browser-item__info">
            <div class="c-post-icon is-placeholder"></div>
						<div class="c-posts-browser-item__title">…</div>
						<div class="c-posts-browser-item__author">…</div>
					</div>
				</span>
        </li>
      );
    }
  },
  render (h) {
    if (this.isPlaceholder) {
      return this.renderPlaceholder()
    }
    return (
      <li class="c-posts-browser-item">
        <nuxt-link to={this.link} class="c-posts-browser-item__link">
          <div class="c-posts-browser-item__info">
            <div class="c-post-icon is-fallback">
              {this.icon ? (<img class="c-post-icon__img" src={this.icon}></img>) : (
                <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                  </g>
                </svg>
              )}
            </div>
            <div class="c-posts-browser-item__title">{this.title}</div>
            <div class="c-posts-browser-item__author">-{this.author}</div>
          </div>
          <div class="c-posts-browser-item__meta">
            <div class="c-posts-browser-item__meta-date">
              {this.date}
            </div>
          </div>
        </nuxt-link>
      </li>
    )
  }
}
