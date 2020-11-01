<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageEditTag.title') }}
    </h3>

    <div class="box">
      <form @submit.prevent="editTag">
        <b-field :label="$t('Tag.type')">
          <b-select v-model="tag.type" :placeholder="$t('Tag.typePlaceholder')" expanded required>
            <option
              v-for="option in types"
              :key="option.id"
              :value="option.slug"
            >
              {{ getLocalizedName(option.name) }}
            </option>
          </b-select>
        </b-field>

        <b-field :label="$t('Tag.nameOriginal')">
          <b-input v-model="tag.name_japanese" type="text" required />
        </b-field>

        <b-field :label="$t('Tag.nameRomaji')">
          <b-input v-model="tag.name_romaji" type="text" />
        </b-field>

        <b-field :label="$t('Tag.nameEnglish')">
          <b-input v-model="tag.name_english" type="text" />
        </b-field>

        <b-field :label="$t('Tag.nameAliases')">
          <b-taginput
            v-model="tag.aliases"
            :allow-new="true"
            icon="label"
            :placeholder="$t('Search.placeholder')"
          />
        </b-field>

        <b-field v-if="(tag.type == 'artist')" :label="$t('Tag.circles')">
          <b-taginput
            ref="circleTagInput"
            v-model="selectedCircles"
            :data="circleTags"
            :allow-new="false"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            autocomplete
            @typing="getCircleTags"
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

        <b-field v-if="(tag.type == 'character')" :label="$t('Tag.series')">
          <b-taginput
            ref="seriesTagInput"
            v-model="selectedSeries"
            icon="label"
            :placeholder="$t('Search.placeholder')"
            :data="seriesTags"
            :allow-new="false"
            autocomplete
            @typing="getSeriesTags"
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

        <b-field v-if="(tag.type == 'convention')" :label="$t('Tag.eventDates')">
          <b-datepicker
            v-model="tag.event_dates"
            editable
            range
            @input="eventDateChange"
          />
        </b-field>

        <b-field v-if="(tag.type == 'artist' || tag.type == 'circle')" :label="$t('Links.pixiv')">
          <b-input v-model="tag.links.pixiv" type="url" icon="link" />
        </b-field>

        <b-field v-if="(tag.type == 'artist' || tag.type == 'circle' || tag.type == 'convention')" :label="$t('Links.twitter')">
          <b-input v-model="tag.links.twitter" type="url" icon="link" />
        </b-field>

        <b-field v-if="(tag.type == 'artist' || tag.type == 'circle')" :label="$t('Links.patreon')">
          <b-input v-model="tag.links.patreon" type="url" icon="link" />
        </b-field>

        <b-field v-if="(tag.type == 'artist' || tag.type == 'circle')" :label="$t('Links.enty')">
          <b-input v-model="tag.links.enty" type="url" icon="link" />
        </b-field>

        <b-field v-if="(tag.type == 'artist' || tag.type == 'circle')" :label="$t('Links.fantia')">
          <b-input v-model="tag.links.fantia" type="url" icon="link" />
        </b-field>

        <b-field v-if="(tag.type == 'content')" :label="$t('Tag.descriptionEnglish')">
          <b-input v-model="tag.description_english" maxlength="200" type="textarea" />
        </b-field>

        <b-field v-if="(tag.type == 'content')" :label="$t('Tag.descriptionJapanese')">
          <b-input v-model="tag.description_japanese" maxlength="200" type="textarea" />
        </b-field>

        <b-field>
          <b-button type="is-primary" native-type="submit" expanded>
            {{ $t('Common.submit') }}
          </b-button>
        </b-field>
      </form>
    </div>
  </section>
</template>

<script>
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
    return []
  }
}

export default {
  mixins: [locale],
  middleware: 'auth',
  async asyncData (context) {
    const tagType = context.route.params.type
    const tagSlug = context.route.params.slug

    const types = await context.$axios.$get('tag/types')
    const tagData = await context.$axios.$get(`tag/${tagType}/${tagSlug}`)

    const tag = {
      type: tagData.type.slug,
      name_japanese: tagData.name.japanese,
      name_romaji: tagData.name.romaji,
      name_english: (tagData.name.english ? tagData.name.english : null),
      aliases: (tagData.aliases ? tagData.aliases : []),
      description_english: (tagData.description ? tagData.description.english : null),
      description_japanese: (tagData.description ? tagData.description.japanese : null),
      links: (tagData.links ? tagData.links : {}),
      event_dates: (tagData.event ? [] : null),
      date_start: (tagData.event ? tagData.date_start : null),
      date_end: (tagData.event ? tagData.date_end : null),
      tags: []
    }

    const selectedCircles = getTagSet('circle', tagData.tags)
    const selectedSeries = getTagSet('series', tagData.tags)

    if (tagData.event) {
      if (tagData.event.date_start) {
        tag.event_dates.push(new Date(tagData.event.date_start))
      }

      if (tagData.event.date_end) {
        tag.event_dates.push(new Date(tagData.event.date_end))
      } else {
        tag.event_dates.push(new Date(tagData.event.date_start))
      }
    }

    return { types: types.data, tag, tagData, selectedCircles, selectedSeries }
  },
  data () {
    return {
      circleTags: [],
      seriesTags: []
    }
  },
  methods: {
    async editTag () {
      this.$nuxt.$loading.start()

      this.selectedSeries.map((series, index) => {
        this.tag.tags.push(series.id)
      })

      this.selectedCircles.map((circle, index) => {
        this.tag.tags.push(circle.id)
      })

      await this.$axios.$put(`tag/${this.tagData.type.slug}/${this.tagData.slug}`, this.tag).then((res) => {
        this.$router.push(`/tag/${res.type.slug}/${res.slug}`)
      }).catch((e) => {
        this.$buefy.toast.open({
          message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
          position: 'is-bottom',
          type: 'is-danger'
        })
      })

      this.$nuxt.$loading.finish()
    },
    async getCircleTags (text) {
      const tags = await this.$axios.$get('/search/tag/circle', { params: { q: text } })
      this.circleTags = tags.data
    },
    async getSeriesTags (text) {
      const tags = await this.$axios.$get('/search/tag/series', { params: { q: text } })
      this.seriesTags = tags.data
    },
    eventDateChange (value) {
      if (value.length) {
        if (value[0] !== undefined) {
          this.tag.date_start = value[0]
        } else {
          this.tag.date_start = null
        }

        if (value[1] !== undefined) {
          this.tag.date_end = value[1]
        } else {
          this.tag.date_end = null
        }
      }
    }
  },
  head () {
    return {
      title: this.getLocalizedName(this.tagData.name) + ' : ' + this.$t('Common.edit')
    }
  }
}
</script>
