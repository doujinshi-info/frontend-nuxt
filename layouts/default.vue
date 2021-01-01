<template>
  <div>
    <b-navbar :fixed-top="true" :shadow="true">
      <template slot="brand">
        <b-navbar-item href="/">
          <img src="~assets/images/logo.png" alt="Doujinshi.info">
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="div">
          <Search />
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-dropdown v-if="this.$auth.loggedIn && this.$auth.user.is_admin" :label="$t('Navigation.admin')">
          <b-navbar-item href="/admin/deletions">
            {{ $t('Navigation.adminDeletions') }}
          </b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-item href="/about">
          {{ $t('Navigation.about') }}
        </b-navbar-item>

        <b-navbar-item href="/changelog">
          {{ $t('Navigation.changelog') }}
        </b-navbar-item>

        <b-navbar-item href="/statistics">
          {{ $t('Navigation.statistics') }}
        </b-navbar-item>

        <b-navbar-item href="/tag">
          {{ $t('Navigation.tags') }}
        </b-navbar-item>

        <b-navbar-item v-if="!this.$auth.loggedIn" href="/account/create">
          {{ $t('Navigation.signup') }}
        </b-navbar-item>

        <b-navbar-item v-if="!this.$auth.loggedIn" href="/account/login">
          {{ $t('Navigation.login') }}
        </b-navbar-item>

        <b-navbar-dropdown v-if="this.$auth.loggedIn" :label="$t('Navigation.contribute')">
          <b-navbar-item href="/create/tag">
            {{ $t('Navigation.contributeTag') }}
          </b-navbar-item>

          <b-navbar-item href="/create/book">
            {{ $t('Navigation.contributeDoujinshi') }}
          </b-navbar-item>

          <b-navbar-item href="/create/book/import">
            {{ $t('Navigation.contributeImport') }}
          </b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-dropdown v-if="this.$auth.loggedIn" :label="$t('Navigation.account')">
          <b-navbar-item :href="`/profile/${this.$auth.user.slug}`">
            {{ $t('Navigation.accountProfile') }}
          </b-navbar-item>

          <b-navbar-item :href="`/profile/${this.$auth.user.slug}/library`">
            {{ $t('Navigation.accountLibrary') }}
          </b-navbar-item>

          <b-navbar-item :href="`/profile/${this.$auth.user.slug}/wishlist`">
            {{ $t('Navigation.accountWishlist') }}
          </b-navbar-item>

          <hr class="navbar-divider">

          <b-navbar-item href="/account/notifications">
            {{ $t('Navigation.accountNotifications') }}
          </b-navbar-item>

          <b-navbar-item href="/account/following">
            {{ $t('Navigation.accountFollowing') }}
          </b-navbar-item>

          <b-navbar-item href="/account/settings">
            {{ $t('Navigation.accountSettings') }}
          </b-navbar-item>

          <hr class="navbar-divider">

          <b-navbar-item @click="authLogout">
            {{ $t('Navigation.logout') }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>

    <main>
      <nuxt />
    </main>

    <footer class="footer">
      <div class="container-fluid">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <LocaleSelector />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Search from '~/components/Search'
import LocaleSelector from '~/components/LocaleSelector'

export default {
  components: {
    Search,
    LocaleSelector
  },
  methods: {
    async authLogout () {
      this.$nuxt.$loading.start()

      await this.$auth.logout()

      this.$nuxt.$loading.finish()

      this.$router.push('/')
    }
  }
}
</script>
