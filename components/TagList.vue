<template>
  <div class="tags">
    <a
      v-for="tag in tags"
      :key="tag.id"
      :href="`/tag/${tag.type.slug}/${tag.slug}`"
      class="tag is-small is-link"
    >
      {{ getLocalizedName(tag.name) }}
    </a>
  </div>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
