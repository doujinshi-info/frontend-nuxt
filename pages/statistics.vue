<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageStatistics.title') }}
    </h3>

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

    <div class="box">
      <table class="table is-fullwidth is-striped">
        <tbody>
          <tr>
            <th>{{ $t('Statistics.totalDoujinshi') }}</th>
            <td>{{ stats.total.doujinshi.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalTags') }}</th>
            <td>{{ stats.total.tags.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalCircles') }}</th>
            <td>{{ stats.total.circles.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalArtists') }}</th>
            <td>{{ stats.total.artists.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalContents') }}</th>
            <td>{{ stats.total.contents.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalSeries') }}</th>
            <td>{{ stats.total.series.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalCharacters') }}</th>
            <td>{{ stats.total.characters.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalConventions') }}</th>
            <td>{{ stats.total.conventions.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.totalCollections') }}</th>
            <td>{{ stats.total.collections.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.averagePrice') }}</th>
            <td>&yen; {{ stats.average_price }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.averagePages') }}</th>
            <td>{{ stats.average_pages.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>{{ $t('Statistics.originalRatio') }}</th>
            <td>{{ stats.original_ratio }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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

    <div class="columns is-multiline">
      <div class="column is-12">
        <h4 class="title is-4">
          {{ $t('Statistics.contributions') }}
        </h4>
        <div class="box">
          <ContributionsChart
            :height="150"
            :width="700"
            :chart-data="stats.community.contributions"
            :options="{legend:{display:false}}"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import StatTotalBarChart from '~/components/charts/StatTotalBarChart'
import StatCommonPieChart from '~/components/charts/StatCommonPieChart'
import ContributionsChart from '~/components/charts/ContributionsLineChart'

export default {
  components: {
    ContributionsChart,
    StatTotalBarChart,
    StatCommonPieChart
  },
  async asyncData (context) {
    const stats = await context.$axios.$get('/')
    return { stats }
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
      title: this.$t('PageStatistics.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('Meta.Description.statistics')
        }
      ]
    }
  }
}
</script>
