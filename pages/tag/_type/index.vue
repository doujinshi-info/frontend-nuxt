<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageTags.title') }} : {{ $t('TagTypes.'+tagType) }}
    </h3>

    <div class="box">
      <b-table :data="tags.data" :striped="true">
        <template slot-scope="props">
          <b-table-column :label="$t('PageTags.tag')" sortable>
            <a :href="`/tag/${props.row.type.slug}/${props.row.slug}`">
              {{ getLocalizedName(props.row.name) }}
            </a>
          </b-table-column>

          <b-table-column :label="$t('PageTags.type')">
            <a :href="`/tag/${props.row.type.slug}`">
              {{ getLocalizedName(props.row.type.name) }}
            </a>
          </b-table-column>

          <b-table-column :label="$t('Common.createdAt')">
            {{ props.row.created_at }}
          </b-table-column>

          <b-table-column :label="$t('Common.updatedAt')">
            {{ props.row.updated_at }}
          </b-table-column>
        </template>
      </b-table>
    </div>

    <b-pagination
      :total="tags.meta.total"
      :current="currentPage"
      :per-page="tags.meta.per_page"
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
        :href="`${uriPath}${props.page.number}`"
      >
        {{ props.page.number }}
      </b-pagination-button>

      <b-pagination-button
        slot="previous"
        slot-scope="props"
        :page="props.page"
        :href="`${uriPath}${props.page.number}`"
      >
        <b-icon icon="chevron-left" />
      </b-pagination-button>

      <b-pagination-button
        slot="next"
        slot-scope="props"
        :page="props.page"
        :href="`${uriPath}${props.page.number}`"
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
    const currentPage = Number((context.query.page || 1))
    const tagType = context.route.params.type
    const query = context.query.q || null
    const apiPath = (query ? `search/tag/${tagType}?q=${query}&page=` : `tag/${tagType}?page=`)
    const uriPath = (query ? `/tag/${tagType}?q=${query}&page=` : `tag/${tagType}?page=`)

    const tags = await context.$axios.$get(apiPath + currentPage)

    return { tags, tagType, currentPage, uriPath, apiPath }
  },
  methods: {
    onPageChange (page) {
      history.pushState({}, null, `${this.uriPath}${encodeURIComponent(page)}`)
      this.currentPage = page
      this.fetchTags()
    },
    async fetchTags () {
      this.$nuxt.$loading.start()

      await this.$axios.$get(this.apiPath + this.currentPage).then((res) => {
        this.tags = res
        this.$nuxt.$loading.finish()
      }).catch((e) => {
        this.$nuxt.$loading.finish()
      })
    }
  },
  head () {
    return {
      title: this.$t('PageTags.title') + ' : ' + this.$t('tagTypes.' + this.tagType)
    }
  }
}
</script>
