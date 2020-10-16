<template>
  <section class="section">
    <BookList api-endpoint="book" :data="books" :page="currentPage" />
  </section>
</template>

<script>
import BookList from '~/components/BookList'

export default {
  components: {
    BookList
  },
  async asyncData (context) {
    const currentPage = context.query.page || 1
    const books = await context.$axios.$get(`book?page=${currentPage}`)

    return {
      books,
      currentPage
    }
  },
  head () {
    return {
      titleTemplate: this.$t('PageHome.title')
    }
  }
}
</script>
