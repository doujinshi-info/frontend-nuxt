<template>
  <div>
    <ProfileTabs :user="user" active="library" />

    <section class="section">
      <h3 class="title is-3">
        {{ user.display_name }} : {{ $t('PageUserProfile.library') }}
      </h3>

      <BookList :api-endpoint="apiEndpoint" :data="books" :page="currentPage" />
    </section>
  </div>
</template>

<script>
import BookList from '~/components/BookList'
import ProfileTabs from '~/components/ProfileTabs'
import locale from '~/mixin/locale'

export default {
  components: {
    BookList,
    ProfileTabs
  },
  mixins: [locale],
  async asyncData (context) {
    const currentPage = context.query.page || 1

    const user = await context.$axios.$get(`user/${context.route.params.slug}`)
    const books = await context.$axios.$get(`user/${context.route.params.slug}/library/collection?page=${currentPage}`)

    return {
      user,
      books,
      currentPage,
      apiEndpoint: `user/${context.route.params.slug}/library/collection`
    }
  },
  head () {
    return {
      title: this.user.display_name + ' : ' + this.$t('PageUserProfile.library')
    }
  }
}
</script>
