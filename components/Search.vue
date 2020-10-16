<template>
  <form @submit.prevent="searchRequest">
    <b-field>
      <b-input
        v-model="searchTerm"
        :placeholder="$t('Search.placeholder')"
        type="search"
        icon="magnify"
        required
        expanded
        :use-html5-validation="false"
      />

      <p class="control">
        <b-select v-model="selectedFilter">
          <option
            v-for="option in filters"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </b-select>
      </p>

      <b-upload v-model="imageFile" accept="image/*" @input="imageSearch">
        <a class="button is-primary">
          <b-icon icon="image" />
        </a>
      </b-upload>

      <p class="control">
        <b-button type="is-primary" native-type="submit">
          <b-icon icon="magnify" />
        </b-button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { serialize } from 'object-to-formdata'

export default {
  data () {
    return {
      selectedFilter: 'book',
      filters: [
        {
          value: 'artist',
          name: this.$t('Search.type.artist')
        },
        {
          value: 'circle',
          name: this.$t('Search.type.circle')
        },
        {
          value: 'character',
          name: this.$t('Search.type.character')
        },
        {
          value: 'series',
          name: this.$t('Search.type.series')
        },
        {
          value: 'content',
          name: this.$t('Search.type.content')
        },
        {
          value: 'convention',
          name: this.$t('Search.type.convention')
        },
        {
          value: 'book',
          name: this.$t('Search.type.doujin')
        }
      ],
      imageFile: null,
      searchTerm: null
    }
  },
  methods: {
    searchRequest () {
      if (this.selectedFilter === 'book') {
        this.$router.push({
          path: '/search',
          query: { q: this.searchTerm }
        })
      } else {
        this.$router.push({
          path: `/tag/${this.selectedFilter}`,
          query: { q: this.searchTerm }
        })
      }
    },
    async imageSearch (image) {
      await this.resize({
        file: image,
        maxSize: 500
      }).then(async (resizedImage) => {
        this.$nuxt.$loading.start()

        const formData = serialize({ image: resizedImage })

        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }

        await this.$axios.$post('/search/image', formData, config).then((res) => {
          if (res.meta.total === 1) {
            this.$router.push(`/book/${res.data[0].slug}`)
          } else {
            this.$store.commit('searchResults/add', res)
            this.$router.push('/search')
          }
        }).catch((e) => {
          this.$buefy.toast.open({
            message: this.$t((Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message)),
            position: 'is-bottom',
            type: 'is-danger'
          })
        })

        this.$nuxt.$loading.finish()
      })
    },
    resize (settings) {
      const file = settings.file
      const maxSize = settings.maxSize
      const reader = new FileReader()
      const image = new Image()
      const canvas = document.createElement('canvas')

      const dataURItoBlob = (dataURI) => {
        const bytes = (dataURI.split(',')[0].includes('base64') ? atob(dataURI.split(',')[1]) : unescape(dataURI.split(',')[1]))
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
        const max = bytes.length
        const ia = new Uint8Array(max)

        for (let i = 0; i < max; i++) {
          ia[i] = bytes.charCodeAt(i)
        }

        return new Blob([ia], { type: mime })
      }

      const resize = () => {
        let width = image.width
        let height = image.height

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else if (height > maxSize) {
          width *= maxSize / height
          height = maxSize
        }

        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)

        const dataUrl = canvas.toDataURL('image/jpeg')

        return dataURItoBlob(dataUrl)
      }

      return new Promise((resolve, reject) => {
        if (!file.type.match(/image.*/)) {
          reject(new Error('Not an image'))
          return
        }

        reader.onload = (readerEvent) => {
          image.onload = () => {
            return resolve(resize())
          }

          image.src = readerEvent.target.result
        }

        reader.readAsDataURL(file)
      })
    }
  }
}
</script>
