<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageForgotPassword.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="requestReset">
        <b-field :label="$t('PageForgotPassword.email')">
          <b-input v-model="user.email" type="email" icon="email" required />
        </b-field>

        <b-field class="field" grouped>
          <b-button type="is-primary" native-type="submit">
            {{ $t('PageForgotPassword.resetPasswordButton') }}
          </b-button>

          <p class="control">
            <nuxt-link to="/account/login" class="navbar-item">
              {{ $t('PageForgotPassword.returnLink') }}
            </nuxt-link>
          </p>
        </b-field>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async requestReset () {
      this.$nuxt.$loading.start()

      await this.$axios.$post('/password/email', this.user).then((res) => {
        this.user = {}

        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('notifications.password_email_sent'),
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
      title: this.$t('PageForgotPassword.title')
    }
  }
}
</script>
