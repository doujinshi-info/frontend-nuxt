<template>
  <div class="box">
    <table class="table is-striped is-fullwidth book-table">
      <tbody>
        <tr>
          <th>{{ $t('Tag.type') }}</th>
          <td>{{ getLocalizedName(tag.type.name) }}</td>
        </tr>
        <tr>
          <th>{{ $t('Tag.nameOriginal') }}</th>
          <td>{{ tag.name.japanese }}</td>
        </tr>
        <tr>
          <th>{{ $t('Tag.nameRomaji') }}</th>
          <td>{{ tag.name.romaji }}</td>
        </tr>
        <tr v-if="tag.name.english">
          <th>{{ $t('Tag.nameEnglish') }}</th>
          <td>{{ tag.name.english }}</td>
        </tr>
        <tr v-if="tag.aliases">
          <th>{{ $t('Tag.nameAliases') }}</th>
          <td>{{ tag.aliases.join(', ') }}</td>
        </tr>
        <tr v-if="tag.event">
          <th>{{ $t('Tag.eventDates') }}</th>
          <td>{{ tag.event.date_start + (tag.event.date_start == tag.event.date_end ? '' : ' ~ ' + tag.event.date_end) }}</td>
        </tr>
        <tr v-if="tag.description">
          <th>{{ $t('Tag.descriptionEnglish') }}</th>
          <td>{{ tag.description.english }}</td>
        </tr>
        <tr v-if="tag.description">
          <th>{{ $t('Tag.descriptionJapanese') }}</th>
          <td>{{ tag.description.japanese }}</td>
        </tr>
        <tr v-if="artists">
          <th>{{ $t('Tag.artists') }}</th>
          <td><TagList :tags="artists" /></td>
        </tr>
        <tr v-if="circles">
          <th>{{ $t('Tag.circles') }}</th>
          <td><TagList :tags="circles" /></td>
        </tr>
        <tr v-if="series">
          <th>{{ $t('Tag.series') }}</th>
          <td><TagList :tags="series" /></td>
        </tr>
        <tr v-if="tag.links">
          <th>{{ $t('Tag.links') }}</th>
          <td><InfoLinks :links="tag.links" /></td>
        </tr>
        <tr>
          <th>{{ $t('Common.createdAt') }}</th>
          <td>{{ tag.created_at }}</td>
        </tr>
        <tr>
          <th>{{ $t('Common.updatedAt') }}</th>
          <td>{{ tag.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TagList from '~/components/TagList'
import InfoLinks from '~/components/InfoLinks'
import locale from '~/mixin/locale'

function getTagSet (category, tags) {
  const results = tags.data.map((tag) => {
    if (tag.type.slug === category) {
      return tag
    }
  }).filter(Boolean)

  if (results.length) {
    return results
  } else {
    return false
  }
}

export default {
  components: {
    TagList,
    InfoLinks
  },
  mixins: [locale],
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  computed: {
    artists () {
      return getTagSet('artist', this.tag.tags)
    },
    circles () {
      return getTagSet('circle', this.tag.tags)
    },
    series () {
      return getTagSet('series', this.tag.tags)
    }
  }
}
</script>
