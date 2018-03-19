/* eslint-disable no-extra-parens */
import {PostsBrowserList} from '~/components/posts'

export default {
  middleware: 'authenticated',
  data () {
    return {
      filter: 'publish',
      collapsed: true,
      SHORT_LIST_LENGTH: 6,
      visibleCategories: [
        {name: '精选', slug: 'featured'},
        {name: '热门', slug: 'popular'},
        {name: '最新', slug: 'new'}
      ],
      isOpen: false,
      isFocus: false,
      category: ''
      // child
    }
  },
  components: {
    PostsBrowserList
  },
  methods: {
    handleClick () {
      this.collapsed = !this.collapsed
    },
    getShortList (category) {
      this.$store.dispatch('getPostsShortList', category.slug)
    },
    getFullListView (category) {
    },
    getSearchListView (searchPost) {
    },
    getSingleListView (category) {
      this.getShortList(category)
      return (
        <posts-browser-list title={category.name} category={category} link={`/posts/term/${category.slug}`} />
      )
    },
    getShortListView () {
      return (
        <span>
          {this.visibleCategories.map((category, index) => (
            this.getSingleListView(category)
          ))}
      </span>
      )
    }
  },
  render (h) {
    return this.getShortListView()
  }
}
