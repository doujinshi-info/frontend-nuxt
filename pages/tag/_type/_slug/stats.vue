<template>
  <div>
    <TagTabs :tag="tag" active="stats" />
    <section class="section">
      <h3 class="title is-3">
        {{ getLocalizedName(tag.name) }}
      </h3>

      <h4 class="subtitle is-4">
        {{ getLocalizedSubName(tag.name) }}
      </h4>

      <div class="filter-container">
        <div class="filter-header">
          <b-button type="is-light" icon-left="filter" @click="filterHidden = !filterHidden">
            {{ $t('Filter.buttonText') }}
          </b-button>
        </div>

        <div v-if="!filterHidden" class="filter-body">
          <b-field :label="$t('Filter.releaseDate')">
            <b-datepicker
              v-model="dateRange"
              :placeholder="$t('Filter.releaseDatePlaceholder')"
              editable
              range
              @input="fetchStats"
            />
          </b-field>
        </div>
      </div>

      <StatsTable :stats="stats" />

      <hr>

      <div class="columns is-multiline">
        <div class="column is-4">
          <h4 class="title is-4">
            {{ $t('Statistics.mostWorksArtists') }}
          </h4>
          <div class="box">
            <StatTotalBarChart :height="300" :width="400" :chart-data="stats.volume.artists" />
          </div>
        </div>

        <div class="column is-4">
          <h4 class="title is-4">
            {{ $t('Statistics.mostWorksCircle') }}
          </h4>
          <div class="box">
            <StatTotalBarChart :height="300" :width="400" :chart-data="stats.volume.circles" />
          </div>
        </div>

        <div class="column is-4">
          <h4 class="title is-4">
            {{ $t('Statistics.mostWorksConvention') }}
          </h4>
          <div class="box">
            <StatTotalBarChart :height="300" :width="400" :chart-data="stats.volume.conventions" />
          </div>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-4">
          <h4 class="title is-4">
            {{ $t('Statistics.commonSeries') }}
          </h4>
          <div class="box">
            <StatCommonPieChart :height="300" :width="400" :chart-data="stats.volume.series" />
          </div>
        </div>

        <div class="column is-4">
          <h4 class="title is-4">
            {{ $t('Statistics.commonCharacters') }}
          </h4>
          <div class="box">
            <StatCommonPieChart :height="300" :width="400" :chart-data="stats.volume.characters" />
          </div>
        </div>

        <div class="column is-4">
          <h4 class="title is-4">
            {{ $t('Statistics.commonContent') }}
          </h4>
          <div class="box">
            <StatCommonPieChart :height="300" :width="400" :chart-data="stats.volume.contents" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TagTabs from '~/components/TagTabs'
import StatsTable from '~/components/StatsTable'
import StatTotalBarChart from '~/components/charts/StatTotalBarChart'
import StatCommonPieChart from '~/components/charts/StatCommonPieChart'
import locale from '~/mixin/locale'

export default {
  components: {
    TagTabs,
    StatsTable,
    StatTotalBarChart,
    StatCommonPieChart
  },
  mixins: [locale],
  async asyncData (context) {
    const tagType = context.route.params.type
    const tagSlug = context.route.params.slug

    const tag = await context.$axios.$get(`tag/${tagType}/${tagSlug}`)

    const stats = await context.$axios.$get('/', {
      params: { tag: tag.id }
    })

    return { tag, stats }
  },
  data () {
    return {
      dateRange: [],
      filterHidden: true
    }
  },
  methods: {
    async fetchStats () {
      this.$nuxt.$loading.start()

      const filters = {}

      if (this.dateRange.length) {
        if (this.dateRange[0] !== undefined) {
          filters.start_date = this.dateRange[0]
        } else {
          filters.start_date = null
        }

        if (this.dateRange[1] !== undefined) {
          filters.end_date = this.dateRange[1]
        } else {
          filters.end_date = null
        }
      }

      filters.tag = this.tag.id

      await this.$axios.$get('/', { params: filters }).then((res) => {
        this.stats = res
        this.$nuxt.$loading.finish()
      }).catch((e) => {
        this.$nuxt.$loading.finish()
      })
    }
  },
  head () {
    return {
      title: this.getLocalizedName(this.tag.name) + ' : ' + this.$t('PageStatistics.title')
    }
  }
}
</script>
