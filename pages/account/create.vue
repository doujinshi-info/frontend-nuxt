<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageSignUp.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="registrationRequest">
        <b-field :label="$t('PageSignUp.displayName')">
          <b-input v-model="user.display_name" type="text" icon="account" required />
        </b-field>

        <b-field :label="$t('PageSignUp.username')">
          <b-input v-model="user.user_name" type="text" icon="account" required />
        </b-field>

        <b-field :label="$t('PageSignUp.email')">
          <b-input v-model="user.email" type="email" icon="email" required />
        </b-field>

        <b-field :label="$t('PageSignUp.password')">
          <b-input v-model="user.password" type="password" icon="lock" password-reveal required />
        </b-field>

        <b-field class="field" grouped>
          <b-button type="is-primary" native-type="submit">
            {{ $t('PageSignUp.signUpButton') }}
          </b-button>

          <p class="control">
            <nuxt-link to="/account/login" class="navbar-item">
              {{ $t('PageSignUp.loginLink') }}
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
    registrationRequest () {
      this.$nuxt.$loading.start()

      this.$axios.$post('/auth/create', this.user).then((res) => {
        this.$auth.loginWith('local', {
          data: {
            email: this.user.email,
            password: this.user.password
          }
        }).then((res) => {
          this.$nuxt.$loading.finish()
        }).catch((e) => {
          this.$buefy.toast.open({
            message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
            position: 'is-bottom',
            type: 'is-danger'
          })

          this.$nuxt.$loading.finish()
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
      title: this.$t('PageSignUp.title')
    }
  }
}
</script>
