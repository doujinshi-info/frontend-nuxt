<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageForgotPassword.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="changePassword">
        <b-field :label="$t('PageForgotPassword.email')">
          <b-input v-model="user.email" type="email" icon="email" required />
        </b-field>

        <b-field :label="$t('PageForgotPassword.newPassword')">
          <b-input v-model="user.password" type="password" icon="lock" password-reveal required />
        </b-field>

        <b-field :label="$t('PageForgotPassword.confirmNewPassword')">
          <b-input v-model="user.password_confirmation" type="password" icon="lock" password-reveal required />
        </b-field>

        <b-field class="field" grouped>
          <b-button type="is-primary" native-type="submit">
            {{ $t('Common.submit') }}
          </b-button>
        </b-field>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  asyncData (context) {
    return {
      token: context.route.params.token
    }
  },
  data () {
    return { user: {} }
  },
  methods: {
    async changePassword () {
      this.$nuxt.$loading.start()

      this.user.token = this.token

      await this.$axios.$post('/password/reset', this.user).then((res) => {
        this.user = {}

        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('PageForgotPassword.passwordChangedMessage'),
          position: 'is-bottom',
          type: 'is-success'
        })

        this.$router.push('/account/login')
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
      title: this.$t('PageForgotPassword.title')
    }
  }
}
</script>
