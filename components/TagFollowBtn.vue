<template>
  <div v-if="this.$auth.loggedIn" class="content">
    <b-button type="is-primary" :loading="btnLoading" @click="followAction">
      {{ (tagFollowed ? $t('Follow.following') : $t('Follow.follow')) }}
    </b-button>
  </div>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  props: {
    tag: {
      type: Object,
      required: true
    },
    followed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tagFollowed: this.followed,
      btnLoading: false
    }
  },
  methods: {
    followAction () {
      this.btnLoading = true

      if (this.followed) {
        this.$axios.$delete('/following', { data: { tag: this.tag.id } }).then((res) => {
          this.tagFollowed = false
          this.btnLoading = false
        })
      } else {
        this.$axios.$post('/following', { tag: this.tag.id }).then((res) => {
          this.tagFollowed = true
          this.btnLoading = false
        })
      }
    }
  }
}
</script>
