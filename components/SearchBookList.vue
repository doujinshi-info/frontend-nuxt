<template>
  <section>
    <div v-if="books" class="book-list columns is-multiline is-mobile">
      <div
        v-for="book in books.data"
        :key="book.id"
        class="column is-half-mobile is-4-tablet is-2-desktop"
      >
        <div class="book-block">
          <nuxt-link :to="'/book/' + book.slug">
            <figure class="image">
              <img :src="getBookCover(book)" :alt="getLocalizedName(book.name)">
            </figure>

            <div class="book-title">
              {{ getLocalizedName(book.name) }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <b-pagination
      :total="books.meta.total"
      :current="currentPage"
      :per-page="books.meta.per_page"
      order="is-centered"
      range-before="4"
      range-after="4"
      :aria-next-label="$t('Common.next')"
      :aria-previous-label="$t('Common.prev')"
      :aria-page-label="$t('Common.page')"
      :aria-current-label="$t('Common.currentPage')"
      @change="onPageChange"
    >
      <b-pagination-button
        :id="`page${props.page.number}`"
        slot-scope="props"
        :page="props.page"
        :href="`${$route.path}?q=${searchQuery}&page=${props.page.number}`"
      >
        {{ props.page.number }}
      </b-pagination-button>

      <b-pagination-button
        slot="previous"
        slot-scope="props"
        :page="props.page"
        :href="`${$route.path}?q=${searchQuery}&page=${props.page.number}`"
      >
        <b-icon icon="chevron-left" />
      </b-pagination-button>

      <b-pagination-button
        slot="next"
        slot-scope="props"
        :page="props.page"
        :href="`${$route.path}?q=${searchQuery}&page=${props.page.number}`"
      >
        <b-icon icon="chevron-right" />
      </b-pagination-button>
    </b-pagination>
  </section>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  props: {
    apiEndpoint: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: null
    },
    page: {
      type: Number,
      default: 1
    },
    searchTerm: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      books: this.data,
      currentPage: Number(this.page),
      searchQuery: this.searchTerm,
      totalPages: 0,
      perPage: 0
    }
  },
  methods: {
    onPageChange (page) {
      history.pushState({}, null, this.$route.path + '?q=' + encodeURIComponent(this.searchQuery) + '&page=' + encodeURIComponent(page))
      this.currentPage = Number(page)
      this.fetchBooks()
    },
    async fetchBooks () {
      this.$nuxt.$loading.start()

      await this.$axios.$get(`${this.apiEndpoint}?page=${this.currentPage}&q=${this.searchQuery}`).then((res) => {
        this.books = res
        this.$nuxt.$loading.finish()
      }).catch((e) => {
        this.$nuxt.$loading.finish()
      })
    },
    getBookCover (book) {
      if (book.cover) {
        return book.cover.replace('.jpg', '-thumb.jpg')
      } else {
        return '~assets/images/now_printing_thumb.jpg'
      }
    }
  }
}
</script>
