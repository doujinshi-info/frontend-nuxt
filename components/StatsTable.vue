<template>
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
          <th>{{ $t('Statistics.averagepages') }}</th>
          <td>{{ stats.average_pages.toLocaleString() }}</td>
        </tr>
        <tr>
          <th>{{ $t('Statistics.originalRatio') }}</th>
          <td>{{ stats.original_ratio }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
