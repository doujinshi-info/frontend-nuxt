<template>
  <section class="section">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a :href="`/book/${book.slug}`">{{ getLocalizedName(book.name) }}</a>
        </li>
        <li class="is-active">
          <a aria-current="page">{{ $t('Common.edit') }}</a>
        </li>
      </ul>
    </nav>

    <h3 class="title is-3">
      {{ $t('PageEditBook.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="editBook">
        <b-field :label="$t('Doujin.titleOriginal')">
          <b-input v-model="book.name_japanese" type="text" required />
        </b-field>

        <b-field :label="$t('Doujin.titleRomaji')">
          <b-input v-model="book.name_romaji" type="text" />
        </b-field>

        <b-field :label="$t('Doujin.titleEnglish')">
          <b-input v-model="book.name_english" type="text" />
        </b-field>

        <b-field :label="$t('Doujin.artists')">
          <b-taginput
            ref="artistTagInput"
            v-model="selectedArtists"
            :data="searchedTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @add="syncTags"
            @remove="syncTags"
            @typing="searchTags($event, 'artist')"
          >
            <template slot-scope="props">
              {{ getLocalizedName(props.option.name) }}
            </template>

            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                ellipsis
                closable
                @close="$refs.artistTagInput.removeTag(index, $event)"
              >
                {{ getLocalizedName(tag.name) }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field :label="$t('Doujin.circles')">
          <b-taginput
            ref="circleTagInput"
            v-model="selectedCircles"
            :data="searchedTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @add="syncTags"
            @remove="syncTags"
            @typing="searchTags($event, 'circle')"
          >
            <template slot-scope="props">
              {{ getLocalizedName(props.option.name) }}
            </template>

            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                ellipsis
                closable
                @close="$refs.circleTagInput.removeTag(index, $event)"
              >
                {{ getLocalizedName(tag.name) }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field :label="$t('Doujin.characters')">
          <b-taginput
            ref="characterTagInput"
            v-model="selectedCharacters"
            :data="searchedTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @add="syncTags"
            @remove="syncTags"
            @typing="searchTags($event, 'character')"
          >
            <template slot-scope="props">
              {{ getCharacterName(props.option) }}
            </template>

            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                ellipsis
                closable
                @close="$refs.characterTagInput.removeTag(index, $event)"
              >
                {{ getCharacterName(tag) }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field :label="$t('Doujin.series')">
          <b-taginput
            ref="seriesTagInput"
            v-model="selectedSeries"
            :data="searchedTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @add="syncTags"
            @remove="syncTags"
            @typing="searchTags($event, 'series')"
          >
            <template slot-scope="props">
              {{ getLocalizedName(props.option.name) }}
            </template>

            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                ellipsis
                closable
                @close="$refs.seriesTagInput.removeTag(index, $event)"
              >
                {{ getLocalizedName(tag.name) }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field :label="$t('Doujin.content')">
          <b-taginput
            ref="contentTagInput"
            v-model="selectedContent"
            :data="searchedTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @add="syncTags"
            @remove="syncTags"
            @typing="searchTags($event, 'content')"
          >
            <template slot-scope="props">
              {{ getLocalizedName(props.option.name) }}
            </template>

            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                ellipsis
                closable
                @close="$refs.contentTagInput.removeTag(index, $event)"
              >
                {{ getLocalizedName(tag.name) }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field :label="$t('Doujin.convention')">
          <b-taginput
            ref="conventionTagInput"
            v-model="selectedConvention"
            :data="searchedTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @add="syncTags"
            @remove="syncTags"
            @typing="searchTags($event, 'convention')"
          >
            <template slot-scope="props">
              {{ getLocalizedName(props.option.name) }}
            </template>

            <template slot="selected" slot-scope="props">
              <b-tag
                v-for="(tag, index) in props.tags"
                :key="index"
                ellipsis
                closable
                @close="$refs.conventionTagInput.removeTag(index, $event)"
              >
                {{ getLocalizedName(tag.name) }}
              </b-tag>
            </template>
          </b-taginput>
        </b-field>

        <b-field :label="$t('Doujin.releaseDate')">
          <b-datepicker v-model="book.date_released" editable />
        </b-field>

        <b-field :label="$t('Doujin.pages')">
          <b-numberinput v-model="book.pages" />
        </b-field>

        <b-field :label="$t('Doujin.price')">
          <b-numberinput v-model="book.price" />
        </b-field>

        <b-field :label="$t('Doujin.isAdult')">
          <b-switch v-model="book.is_adult">
            {{ (book.is_adult ? $t('Common.yes') : $t('Common.no')) }}
          </b-switch>
        </b-field>

        <b-field :label="$t('Doujin.isCopybook')">
          <b-switch v-model="book.is_copybook">
            {{ (book.is_copybook ? $t('Common.yes') : $t('Common.no')) }}
          </b-switch>
        </b-field>

        <b-field :label="$t('Doujin.isAnthology')">
          <b-switch v-model="book.is_anthology">
            {{ (book.is_anthology ? $t('Common.yes') : $t('Common.no')) }}
          </b-switch>
        </b-field>

        <b-field :label="$t('Doujin.isNovel')">
          <b-switch v-model="book.is_novel">
            {{ (book.is_novel ? $t('Common.yes') : $t('Common.no')) }}
          </b-switch>
        </b-field>

        <b-field :label="$t('Links.toranoana')">
          <b-input v-model="book.links.toranoana" type="url" icon="link" />
        </b-field>

        <b-field :label="$t('Links.melonbooks')">
          <b-input v-model="book.links.melonbooks" type="url" icon="link" />
        </b-field>

        <b-field :label="$t('Links.boothpm')">
          <b-input v-model="book.links.boothpm" type="url" icon="link" />
        </b-field>

        <b-field :label="$t('Links.alice')">
          <b-input v-model="book.links.alice" type="url" icon="link" />
        </b-field>

        <b-field :label="$t('Links.dlsite')">
          <b-input v-model="book.links.dlsite" type="url" icon="link" />
        </b-field>

        <b-field :label="$t('Links.dmm')">
          <b-input v-model="book.links.dmm" type="url" icon="link" />
        </b-field>

        <b-field :label="$t('Doujin.cover')">
          <vue-file-agent
            ref="vueFileAgentCover"
            v-model="coverImage"
            :accept="'image/*'"
            :max-size="'5MB'"
            :max-files="1"
            :help-text="$t('Doujin.imageUploadMessage')"
            :error-text="{
              type: $t('Doujin.imageUploadErrorType'),
              size: $t('Doujin.imageUploadErrorSize')
            }"
            :deletable="true"
            :multiple="false"
            :meta="false"
            @beforedelete="onBeforeDeleteCover($event)"
            @delete="onDeleteCover($event)"
          />
        </b-field>

        <b-field :label="$t('Doujin.samples')">
          <vue-file-agent
            ref="vueFileAgentSamples"
            v-model="sampleImages"
            :accept="'image/*'"
            :max-size="'5MB'"
            :max-files="10"
            :help-text="$t('Doujin.imageUploadMessage')"
            :error-text="{
              type: $t('Doujin.imageUploadErrorType'),
              size: $t('Doujin.imageUploadErrorSize')
            }"
            :deletable="true"
            :multiple="true"
            :meta="false"
            @beforedelete="onBeforeDeleteSample($event)"
            @delete="onDeleteSample($event)"
          />
        </b-field>

        <b-field>
          <b-button type="is-primary" native-type="submit" expanded>
            {{ $t('Common.save') }}
          </b-button>
        </b-field>
      </form>
    </div>
  </section>
</template>

<script>
import { serialize } from 'object-to-formdata'
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
  mixins: [locale],
  middleware: 'auth',
  async asyncData (context) {
    const book = await context.$axios.$get(`book/${context.route.params.slug}`)

    book.name_japanese = book.name.japanese
    book.name_romaji = book.name.romaji

    if (book.name.english) {
      book.name_english = book.name.english
    }

    if (book.date_released) {
      book.date_released = new Date(book.date_released)
    }

    const selectedSeries = getTagSet('series', book.tags) || []
    const selectedArtists = getTagSet('artist', book.tags) || []
    const selectedCircles = getTagSet('circle', book.tags) || []
    const selectedConvention = getTagSet('convention', book.tags) || []
    const selectedContent = getTagSet('content', book.tags) || []
    const selectedCharacters = getTagSet('character', book.tags) || []

    const coverImage = []
    const sampleImages = []

    if (book.tags) {
      book.tags = book.tags.data.map((tag) => {
        return tag.id
      })
    }

    if (book.cover) {
      coverImage.push({
        name: '',
        size: 0,
        type: 'image/jpg',
        ext: 'jpg',
        url: book.cover
      })
    }

    if (book.samples) {
      book.samples.forEach((value, index) => {
        sampleImages.push({
          name: '',
          size: 0,
          type: 'image/jpg',
          ext: 'jpg',
          url: value
        })
      })
    }

    book.removed_samples = []

    if (!book.links) {
      book.links = {}
    }

    return {
      book,
      coverImage,
      sampleImages,
      selectedSeries,
      selectedArtists,
      selectedCircles,
      selectedConvention,
      selectedContent,
      selectedCharacters
    }
  },
  data () {
    return {
      selectedSeries: [],
      selectedArtists: [],
      selectedCircles: [],
      selectedConvention: [],
      selectedContent: [],
      selectedCharacters: [],
      searchedTags: []
    }
  },
  methods: {
    getCharacterName (tag) {
      let charName = this.getLocalizedName(tag.name)

      if (tag.tags) {
        const series = getTagSet('series', tag.tags)

        if (series) {
          charName += ` (${this.getLocalizedName(series[0].name)})`
        }
      }

      return charName
    },
    async editBook () {
      this.$nuxt.$loading.start()

      if (this.coverImage.file !== undefined) {
        this.book.cover = this.coverImage.file
      } else {
        delete this.book.cover
      }

      this.book.samples = []

      this.sampleImages.forEach((value, index) => {
        if (value.file !== undefined) {
          this.book.samples.push(value.file)
        }
      })

      this.book._method = 'PUT'

      const formData = serialize(this.book)

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      await this.$axios.$post(`/book/${this.book.slug}`, formData, config).then((res) => {
        this.$router.push(`/book/${res.slug}`)
      }).catch((e) => {
        this.$buefy.toast.open({
          message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
          position: 'is-bottom',
          type: 'is-danger'
        })
      })

      this.$nuxt.$loading.finish()
    },
    async searchTags (text, type) {
      const tags = await this.$axios.$get(`/search/tag/${type}`, { params: { q: text } })
      this.searchedTags = tags.data
    },
    syncTags (tag) {
      this.searchedTags = []

      const index = this.book.tags.indexOf(tag.id)

      if (index !== -1) {
        this.book.tags.splice(index, 1)
      } else {
        this.book.tags.push(tag.id)
      }
    },
    onBeforeDeleteCover (fileRecord) {
      if (confirm(this.$t('Doujin.imageUploadDeleteConfirm'))) {
        this.$refs.vueFileAgentCover.deleteFileRecord(fileRecord)
      }
    },
    onBeforeDeleteSample (fileRecord) {
      if (confirm(this.$t('Doujin.imageUploadDeleteConfirm'))) {
        this.$refs.vueFileAgentSamples.deleteFileRecord(fileRecord)
      }
    },
    onDeleteCover (fileRecord) {
      this.book.cover = null
    },
    onDeleteSample (fileRecord) {
      this.book.removed_samples.push(fileRecord.url)
    }
  },
  head () {
    return {
      title: this.getLocalizedName(this.book.name) + ' : ' + this.$t('PageEditBook.title')
    }
  }
}
</script>
