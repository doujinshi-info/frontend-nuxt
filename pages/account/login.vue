<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageSignIn.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="loginRequest">
        <b-field :label="$t('PageSignIn.email')">
          <b-input v-model="user.email" type="email" icon="email" required />
        </b-field>

        <b-field :label="$t('PageSignIn.password')">
          <b-input v-model="user.password" type="password" icon="lock" password-reveal required />
        </b-field>

        <b-field class="field" grouped>
          <b-button type="is-primary" native-type="submit">
            {{ $t('PageSignIn.loginButton') }}
          </b-button>

          <p class="control">
            <nuxt-link to="/account/forgot" class="navbar-item">
              {{ $t('PageSignIn.forgotPasswordLink') }}
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
    async loginRequest () {
      this.$nuxt.$loading.start()

      await this.$auth.loginWith('local', {
        data: {
          email: this.user.email,
          password: this.user.password
        }
      }).then((res) => {
        this.$nuxt.$loading.finish()
        this.$router.push('/')
      }).catch((e) => {
        this.$buefy.toast.open({
          message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
          position: 'is-bottom',
          type: 'is-danger'
        })

        this.$nuxt.$loading.finish()
      })
    }
  },
  head () {
    return {
      title: this.$t('PageSignIn.title')
    }
  }
}
</script>
