<template>
  <div class="tabs is-centered is-fullwidth has-background-white">
    <ul>
      <li :class="(active == 'information' ? 'is-active' : '')">
        <a :href="`/tag/${tag.type.slug}/${tag.slug}`">
          {{ $t('TagTabs.information') }}
        </a>
      </li>
      <li :class="(active == 'stats' ? 'is-active' : '')">
        <a :href="`/tag/${tag.type.slug}/${tag.slug}/stats`">
          {{ $t('TagTabs.statistics') }}
        </a>
      </li>
      <li :class="(active == 'changelog' ? 'is-active' : '')">
        <a :href="`/tag/${tag.type.slug}/${tag.slug}/changelog`">
          {{ $t('TagTabs.changelog') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    },
    active: {
      type: String,
      default: 'information'
    }
  }
}
</script>
