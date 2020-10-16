<template>
  <div class="tags">
    <a
      v-for="(link, type) in Object.entries(links).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})"
      :key="type"
      :href="link"
      class="tag is-small is-link"
    >
      {{ $t('Links.'+type) }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Object,
      default: null
    }
  }
}
</script>
