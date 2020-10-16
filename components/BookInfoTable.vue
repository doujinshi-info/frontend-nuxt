<template>
  <div class="box">
    <table class="table is-striped is-fullwidth book-table">
      <tbody>
        <tr>
          <th>{{ $t('Doujin.titleOriginal') }}</th>
          <td>{{ book.name.japanese }}</td>
        </tr>
        <tr>
          <th>{{ $t('Doujin.titleRomaji') }}</th>
          <td>{{ book.name.romaji }}</td>
        </tr>
        <tr v-if="book.name.english">
          <th>{{ $t('Doujin.titleEnglish') }}</th>
          <td>{{ book.name.english }}</td>
        </tr>
        <tr v-if="book.date_released">
          <th>{{ $t('Doujin.releaseDate') }}</th>
          <td>{{ book.date_released }}</td>
        </tr>
        <tr v-if="book.price">
          <th>{{ $t('Doujin.price') }}</th>
          <td>&yen; {{ book.price }}</td>
        </tr>
        <tr v-if="book.pages">
          <th>{{ $t('Doujin.pages') }}</th>
          <td>{{ book.pages }}</td>
        </tr>
        <tr>
          <th>{{ $t('Doujin.isAdult') }}</th>
          <td>{{ (book.is_adult ? $t('Common.yes') : $t('Common.no')) }}</td>
        </tr>
        <tr>
          <th>{{ $t('Doujin.isAnthology') }}</th>
          <td>{{ (book.is_anthology ? $t('Common.yes') : $t('Common.no')) }}</td>
        </tr>
        <tr>
          <th>{{ $t('Doujin.isCopybook') }}</th>
          <td>{{ (book.is_copybook ? $t('Common.yes') : $t('Common.no')) }}</td>
        </tr>
        <tr>
          <th>{{ $t('Doujin.isNovel') }}</th>
          <td>{{ (book.is_novel ? $t('Common.yes') : $t('Common.no')) }}</td>
        </tr>
        <tr v-if="language">
          <th>{{ $t('Doujin.language') }}</th>
          <td><TagList :tags="language" /></td>
        </tr>
        <tr v-if="censoring">
          <th>{{ $t('Doujin.censoring') }}</th>
          <td><TagList :tags="censoring" /></td>
        </tr>
        <tr v-if="convention">
          <th>{{ $t('Doujin.convention') }}</th>
          <td><TagList :tags="convention" /></td>
        </tr>
        <tr v-if="artists">
          <th>{{ $t('Doujin.artists') }}</th>
          <td><TagList :tags="artists" /></td>
        </tr>
        <tr v-if="circles">
          <th>{{ $t('Doujin.circles') }}</th>
          <td><TagList :tags="circles" /></td>
        </tr>
        <tr v-if="series">
          <th>{{ $t('Doujin.series') }}</th>
          <td><TagList :tags="series" /></td>
        </tr>
        <tr v-if="characters">
          <th>{{ $t('Doujin.characters') }}</th>
          <td><TagList :tags="characters" /></td>
        </tr>
        <tr v-if="content">
          <th>{{ $t('Doujin.content') }}</th>
          <td><TagList :tags="content" /></td>
        </tr>
        <tr v-if="book.links">
          <th>{{ $t('Doujin.links') }}</th>
          <td><InfoLinks :links="book.links" /></td>
        </tr>
        <tr>
          <th>{{ $t('Common.createdAt') }}</th>
          <td>{{ book.created_at }}</td>
        </tr>
        <tr>
          <th>{{ $t('Common.updatedAt') }}</th>
          <td>{{ book.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TagList from '~/components/TagList'
import InfoLinks from '~/components/InfoLinks'
import util from '~/mixin/util'

export default {
  components: {
    TagList,
    InfoLinks
  },
  mixins: [util],
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    artists () {
      return this.getTagSet('artist', this.book.tags)
    },
    language () {
      return this.getTagSet('language', this.book.tags)
    },
    censoring () {
      return this.getTagSet('censoring', this.book.tags)
    },
    convention () {
      return this.getTagSet('convention', this.book.tags)
    },
    circles () {
      return this.getTagSet('circle', this.book.tags)
    },
    series () {
      return this.getTagSet('series', this.book.tags)
    },
    characters () {
      return this.getTagSet('character', this.book.tags)
    },
    content () {
      return this.getTagSet('content', this.book.tags)
    }
  }
}
</script>
