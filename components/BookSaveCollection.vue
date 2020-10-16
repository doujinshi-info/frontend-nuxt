<template>
  <section>
    <b-button type="is-text" @click="activateModal">
      <b-icon icon="playlist-plus" />
    </b-button>

    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      aria-role="dialog"
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('Collection.saveTo') }}
          </p>
        </header>
        <section class="modal-card-body">
          <div v-for="collection in collections" :key="collection.slug" class="field">
            <b-checkbox
              size="is-medium"
              :value="collectionSelections"
              :native-value="collection.slug"
              @input="collectionInput(collection.slug)"
            >
              {{ collection.name }}
            </b-checkbox>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      collections: [
        {
          name: this.$t('Collection.library'),
          slug: 'collection'
        },
        {
          name: this.$t('Collection.wishlist'),
          slug: 'wishlist'
        }
      ],
      collectionSelections: [],
      isComponentModalActive: false
    }
  },
  methods: {
    activateModal () {
      this.collections.forEach(async (value, index) => {
        await this.$axios.$get(`library/${value.slug}/${this.book.id}`).then((res) => {
          if (res.data === true) {
            this.collectionSelections.push(value.slug)
          }
        })
      })

      this.isComponentModalActive = true
    },
    collectionInput (collectionSlug) {
      if (this.collectionSelections.includes(collectionSlug)) {
        this.$axios.$delete(`library/${collectionSlug}`, {
          data: { book: this.book.id }
        })
          .then((res) => {
            this.$buefy.toast.open({
              message: this.$t('Collection.removedMessage'),
              position: 'is-bottom',
              type: 'is-success'
            })
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
              position: 'is-bottom',
              type: 'is-danger'
            })
          })

        const index = this.collectionSelections.indexOf(collectionSlug)

        if (index > -1) {
          this.collectionSelections.splice(index, 1)
        }
      } else {
        this.$axios.$post(`library/${collectionSlug}`, { book: this.book.id })
          .then((res) => {
            this.$buefy.toast.open({
              message: this.$t('Collection.savedMessage'),
              position: 'is-bottom',
              type: 'is-success'
            })
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
              position: 'is-bottom',
              type: 'is-danger'
            })
          })

        this.collectionSelections.push(collectionSlug)
      }
    }
  }
}
</script>
