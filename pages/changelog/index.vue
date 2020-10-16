<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageChangelog.title') }}
    </h3>

    <div class="box">
      <b-table :data="contributions.data" :striped="true">
        <template slot-scope="props">
          <b-table-column :label="$t('Contribution.transaction')">
            <a :href="`/changelog/${props.row.id}`">{{ props.row.id }}</a>
          </b-table-column>

          <b-table-column :label="$t('Contribution.type')">
            {{ (props.row.tag ? $t('Contribution.tag') : $t('Contribution.doujinshi')) }}
          </b-table-column>

          <b-table-column :label="$t('Contribution.object')">
            <a :href="(props.row.tag ? `/tag/${props.row.tag.type.slug}/${props.row.tag.slug}` : `/book/${props.row.book.slug}`)">
              {{ getLocalizedName(props.row.tag ? props.row.tag.name : props.row.book.name) }}
            </a>
          </b-table-column>

          <b-table-column :label="$t('Contribution.operation')">
            {{ $t('Contribution.' + props.row.type) }}
          </b-table-column>

          <b-table-column
            :class="(Math.sign(props.row.amount) === 1 ? 'has-text-success' : 'has-text-danger')"
            :label="$t('Contribution.amount')"
          >
            {{ props.row.amount }}
          </b-table-column>

          <b-table-column :label="$t('Contribution.contributor')">
            <a v-if="props.row.user" :href="`/profile/${props.row.user.slug}`">
              {{ props.row.user.display_name }}
            </a>
          </b-table-column>

          <b-table-column :label="$t('Common.createdAt')">
            {{ props.row.created_at }}
          </b-table-column>
        </template>
      </b-table>
    </div>

    <b-pagination
      :total="contributions.meta.total"
      :current="currentPage"
      :per-page="contributions.meta.per_page"
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
        :href="`/changelog?page=${props.page.number}`"
      >
        {{ props.page.number }}
      </b-pagination-button>

      <b-pagination-button
        slot="previous"
        slot-scope="props"
        :page="props.page"
        :href="`/changelog?page=${props.page.number}`"
      >
        <b-icon icon="chevron-left" />
      </b-pagination-button>

      <b-pagination-button
        slot="next"
        slot-scope="props"
        :page="props.page"
        :href="`/changelog?page=${props.page.number}`"
      >
        <b-icon icon="chevron-right" />
      </b-pagination-button>
    </b-pagination>
  </section>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  async asyncData (context) {
    const currentPage = context.query.page || 1
    const contributions = await context.$axios.$get(`changelog?page=${currentPage}`)

    return {
      contributions,
      currentPage
    }
  },
  methods: {
    onPageChange (page) {
      history.pushState({}, null, this.$route.path + '?page=' + encodeURIComponent(page))
      this.currentPage = page
      this.fetchContributions()
    },
    async fetchContributions () {
      this.$nuxt.$loading.start()

      await this.$axios.$get(`changelog?page=${this.currentPage}`).then((res) => {
        this.contributions = res
        this.$nuxt.$loading.finish()
      }).catch((e) => {
        this.$nuxt.$loading.finish()
      })
    }
  },
  head () {
    return {
      title: this.$t('PageChangelog.title')
    }
  }
}
</script>
