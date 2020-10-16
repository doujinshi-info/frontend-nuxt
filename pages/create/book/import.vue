<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageImportDoujinshi.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="importDoujinshi">
        <b-field :label="$t('PageImportDoujinshi.storeUrl')">
          <b-input v-model="url" type="url" icon="link" required />
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
  middleware: 'auth',
  data () {
    return {
      url: null
    }
  },
  methods: {
    async importDoujinshi () {
      this.$nuxt.$loading.start()

      await this.$axios.$post('import', { url: this.url }).then((res) => {
        this.url = null

        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('PageImportDoujinshi.importSuccessMessage'),
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

      this.$nuxt.$loading.end()
    }
  },
  head () {
    return {
      title: this.$t('PageImportDoujinshi.title')
    }
  }
}
</script>
