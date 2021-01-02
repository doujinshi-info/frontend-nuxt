<template>
  <section class="section">
    <h3 class="title is-3">
      {{ getLocalizedName(book.name) }}
    </h3>

    <h4 class="subtitle is-4">
      {{ getLocalizedSubName(book.name) }}
    </h4>

    <nav v-if="this.$auth.loggedIn" class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <BookSaveCollection :book="book" />
        </div>
        <div class="level-item">
          <BookContextMenu :book="book" />
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-one-quarter has-text-centered">
        <v-gallery
          :images="galleryImages"
          :index="galleryIndex"
          @close="galleryIndex = null"
        />

        <div class="columns is-multiline is-mobile">
          <div class="column has-text-centered is-12">
            <a @click="galleryIndex = 0">
              <figure class="image book-image">
                <img :src="getBookCover(book)" :alt="getLocalizedName(book.name)">
              </figure>
            </a>
          </div>

          <div v-if="book.samples" class="column is-12">
            <b-carousel-list :data="sliderItems" :items-to-show="3" :repeat="true">
              <template slot="item" slot-scope="props">
                <a @click="galleryIndex = (props.index + 1)">
                  <img :src="props.list.thumbnail" class="book-image">
                </a>
              </template>
            </b-carousel-list>
          </div>
        </div>
      </div>

      <div class="column">
        <BookInfoTable :book="book" />
      </div>
    </div>
  </section>
</template>

<script>
import BookSaveCollection from '~/components/BookSaveCollection'
import BookContextMenu from '~/components/BookContextMenu'
import BookInfoTable from '~/components/BookInfoTable'
import locale from '~/mixin/locale'
import util from '~/mixin/util'

export default {
  components: {
    BookSaveCollection,
    BookContextMenu,
    BookInfoTable
  },
  mixins: [locale, util],
  async asyncData (context) {
    const book = await context.$axios.$get('book/' + context.route.params.slug)
    const images = []

    if (book.cover) {
      images.push(book.cover)
    }

    if (book.samples) {
      for (let i = 0; i < book.samples.length; i++) {
        images.push(book.samples[i])
      }
    }

    return {
      book,
      sliderItems: (book.samples ? book.samples.map((sample) => {
        if (book.is_adult && context.$auth.$storage.getCookie('sfw')) {
          return {
            image: sample,
            thumbnail: require('~/assets/images/now_printing_thumb.jpg')
          }
        } else {
          return {
            image: sample,
            thumbnail: sample.replace('.jpg', '-thumb.jpg')
          }
        }
      }) : []),
      galleryImages: images,
      galleryIndex: null
    }
  },
  computed: {
    circles () {
      return this.getTagSet('circle', this.book.tags)
    }
  },
  methods: {
    getBookCover (book) {
      if (book.is_adult && this.$auth.$storage.getCookie('sfw')) {
        return require('~/assets/images/now_printing_thumb.jpg')
      }

      if (book.cover) {
        return book.cover.replace('.jpg', '-thumb.jpg')
      } else {
        return require('~/assets/images/now_printing_thumb.jpg')
      }
    }
  },
  head () {
    return {
      title: (this.circles ? `[${this.getLocalizedName(this.circles[0].name)}] ` : '') + this.getLocalizedName(this.book.name),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('Meta.Description.viewDoujin', {
            book: this.getLocalizedName(this.book.name),
            artist: (this.circles ? this.getLocalizedName(this.circles[0].name) : '')
          })
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.book.tags.data.map((tag) => {
            return this.getLocalizedName(tag.name)
          }).join(', ')
        }
      ]
    }
  }
}
</script>
