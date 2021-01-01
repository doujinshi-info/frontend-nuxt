<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageDeletions.title') }}
    </h3>

    <div class="box">
      <b-table :data="deletions.data" :striped="true">
        <template slot-scope="props">
          <b-table-column :label="$t('PageDeletions.content')" field="slug" sortable>
            <a v-if="props.row.type == 'tag'" :href="`/tag/${props.row.content.type.slug}/${props.row.content.slug}`" target="_blank">
              {{ getLocalizedName(props.row.content.name) }}
            </a>

            <a v-if="props.row.type == 'book'" :href="`/book/${props.row.content.slug}`" target="_blank">
              {{ getLocalizedName(props.row.content.name) }}
            </a>
          </b-table-column>

          <b-table-column :label="$t('Report.reason')">
            {{ props.row.reason }}
          </b-table-column>

          <b-table-column :label="$t('Common.createdAt')">
            {{ props.row.created_at }}
          </b-table-column>

          <b-table-column>
            <b-button type="is-success" @click="approveReport(props.row.id)">
              <b-icon icon="check" />
            </b-button>

            <b-button type="is-danger" @click="rejectReport(props.row.id)">
              <b-icon icon="close" />
            </b-button>
          </b-table-column>
        </template>
      </b-table>
    </div>

    <b-pagination
      :total="deletions.meta.total"
      :current="currentPage"
      :per-page="deletions.meta.per_page"
      order="is-centered"
      range-before="4"
      range-after="4"
      :aria-next-label="$t('Common.next')"
      :aria-previous-label="$t('Common.prev')"
      :aria-page-label="$t('Common.page')"
      :aria-current-label="$t('Common.currentPage')"
      @change="onPageChange"
    >
      <b-pagination-button
        :id="`page${props.page.number}`"
        slot-scope="props"
        :page="props.page"
        :href="`/deletion?page=${props.page.number}`"
      >
        {{ props.page.number }}
      </b-pagination-button>

      <b-pagination-button
        slot="previous"
        slot-scope="props"
        :page="props.page"
        :href="`/deletion?page=${props.page.number}`"
      >
        <b-icon icon="chevron-left" />
      </b-pagination-button>

      <b-pagination-button
        slot="next"
        slot-scope="props"
        :page="props.page"
        :href="`/deletion?page=${props.page.number}`"
      >
        <b-icon icon="chevron-right" />
      </b-pagination-button>
    </b-pagination>
  </section>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  middleware: 'admin',
  mixins: [locale],
  async asyncData (context) {
    const currentPage = Number((context.query.page || 1))
    const deletions = await context.$axios.$get(`deletion?page=${currentPage}`)

    return { deletions, currentPage }
  },
  methods: {
    onPageChange (page) {
      history.pushState({}, null, this.$route.path + '?page=' + encodeURIComponent(page))
      this.currentPage = page
      this.fetchDeletions()
    },
    async fetchDeletions () {
      this.$nuxt.$loading.start()

      await this.$axios.$get(`deletion?page=${this.currentPage}`).then((res) => {
        this.deletions = res
        this.$nuxt.$loading.finish()
      }).catch((e) => {
        this.$nuxt.$loading.finish()
      })
    },
    approveReport (id) {
      this.$nuxt.$loading.start()

      this.$axios.$put('/deletion/' + id, { status: 'approved' }).then((res) => {
        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('PageDeletions.approveSuccess'),
          position: 'is-bottom',
          type: 'is-success'
        })

        this.fetchDeletions()

        this.$parent.close()
      }).catch((e) => {
        this.$parent.close()

        this.$buefy.toast.open({
          message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },
    rejectReport (id) {
      this.$nuxt.$loading.start()

      this.$axios.$put('/deletion/' + id, { status: 'denied' }).then((res) => {
        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('PageDeletions.rejectSuccess'),
          position: 'is-bottom',
          type: 'is-success'
        })

        this.fetchDeletions()

        this.$parent.close()
      }).catch((e) => {
        this.$parent.close()

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
      title: this.$t('PageDeletions.title')
    }
  }
}
</script>
