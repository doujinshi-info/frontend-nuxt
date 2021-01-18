<template>
  <section class="section">
    <SearchBookList
      v-if="books.meta.total > 0"
      api-endpoint="search"
      :data="books"
      :page="currentPage"
      :search-term="searchQuery"
    />

    <div v-if="books.meta.total == 0" class="box">
      <div class="content has-text-grey has-text-centered">
        <p><b-icon icon="alert-circle-outline" size="is-large" /></p>
        <p>{{ $t('Search.noResults') }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import SearchBookList from '~/components/SearchBookList'

export default {
  components: {
    SearchBookList
  },
  async asyncData ({ $axios, redirect, query, store }) {
    if (store.state.searchResults.list != null) {
      const imageResults = store.state.searchResults.list
      store.commit('searchResults/remove')

      return {
        books: imageResults,
        currentPage: 1,
        searchQuery: ''
      }
    }

    const currentPage = query.page || 1
    const searchQuery = query.q || ''

    const books = await $axios.$get('search', {
      params: {
        q: searchQuery,
        page: currentPage
      }
    })

    return {
      books,
      currentPage,
      searchQuery
    }
  },
  head () {
    return {
      title: `${this.$t('PageSearchResults.title')} : ${encodeURI(this.searchQuery)}`
    }
  }
}
</script>
