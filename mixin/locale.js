export default {
  methods: {
    getLocalizedName (names) {
      if (this.$i18n.locale === 'en') {
        return (names.english ? names.english : names.romaji)
      } else {
        return names.japanese
      }
    },
    getLocalizedSubName (names) {
      if (this.$i18n.locale === 'en') {
        return names.japanese
      } else {
        return names.romaji
      }
    }
  }
}
