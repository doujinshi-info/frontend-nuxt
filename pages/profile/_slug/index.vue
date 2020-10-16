<template>
  <div>
    <ProfileTabs :user="user" active="profile" />

    <section class="section">
      <h3 class="title is-3">
        {{ user.display_name }}
      </h3>

      <div class="box">
        <table class="table is-striped is-fullwidth">
          <tbody>
            <tr>
              <th>{{ $t('PageUserProfile.dateJoined') }}</th>
              <td>{{ user.created_at }}</td>
            </tr>
            <tr>
              <th>{{ $t('PageUserProfile.contributions') }}</th>
              <td>{{ user.contributions }}</td>
            </tr>
            <tr>
              <th>{{ $t('PageUserProfile.library') }}</th>
              <td>{{ user.collection }}</td>
            </tr>
            <tr>
              <th>{{ $t('PageUserProfile.libraryEstimatedValue') }}</th>
              <td>&yen; {{ user.estimated_cost.toLocaleString() }}</td>
            </tr>
            <tr>
              <th>{{ $t('PageUserProfile.wishlist') }}</th>
              <td>{{ user.wishlist }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileTabs from '~/components/ProfileTabs'

export default {
  components: {
    ProfileTabs
  },
  async asyncData (context) {
    const user = await context.$axios.$get(`/user/${context.route.params.slug}`)

    return { user }
  },
  head () {
    return {
      title: this.user.display_name
    }
  }
}
</script>
