export default {
  methods: {
    getTagSet (category, tags) {
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
  }
}
