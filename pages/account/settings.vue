<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageAccountSettings.title') }}
    </h3>

    <form @submit.prevent="updateProfile">
      <div class="box">
        <h5 class="title is-5">
          {{ $t('PageAccountSettings.profileInformation') }}
        </h5>

        <b-field :label="$t('PageAccountSettings.displayName')">
          <b-input v-model="user.display_name" type="text" icon="account" required />
        </b-field>

        <b-field :label="$t('PageAccountSettings.email')">
          <b-input v-model="user.email" type="email" icon="email" required />
        </b-field>

        <b-field :label="$t('PageAccountSettings.profilePrivacy')">
          <b-switch v-model="user.is_private" :rounded="false">
            {{ (user.is_private ? $t('PageAccountSettings.private') : $t('PageAccountSettings.public')) }}
          </b-switch>
        </b-field>
      </div>

      <div class="box">
        <h5 class="title is-5">
          {{ $t('PageAccountSettings.securityTitle') }}
        </h5>

        <b-field :label="$t('PageAccountSettings.currentPassword')">
          <b-input v-model="user.password" type="password" icon="lock" />
        </b-field>

        <b-field :label="$t('PageAccountSettings.newPassword')">
          <b-input v-model="user.password_new" type="password" icon="lock" password-reveal />
        </b-field>

        <b-field :label="$t('PageAccountSettings.confirmNewPassword')">
          <b-input v-model="user.password_new_confirmation" type="password" icon="lock" password-reveal />
        </b-field>
      </div>

      <b-field>
        <b-button type="is-primary" native-type="submit" expanded>
          {{ $t('Common.save') }}
        </b-button>
      </b-field>
    </form>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      user: {
        display_name: this.$auth.user.display_name,
        user_name: this.$auth.user.user_name,
        email: this.$auth.user.email,
        is_private: this.$auth.user.is_private
      }
    }
  },
  methods: {
    async updateProfile () {
      this.$nuxt.$loading.start()

      await this.$axios.$put('user/' + this.$auth.user.slug, this.user).then((res) => {
        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('PageAccountSettings.settingsUpdatedMessage'),
          position: 'is-bottom',
          type: 'is-success'
        })
      }).catch((e) => {
        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    }
  },
  head () {
    return {
      title: this.$t('PageAccountSettings.title')
    }
  }
}
</script>
