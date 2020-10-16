<template>
  <section>
    <h3 class="title is-3">
      {{ getLocalizedName(names) }}
    </h3>
    <h4 class="subtitle is-4">
      {{ getLocalizedSubName(names) }}
    </h4>
  </section>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  props: {
    names: {
      type: Array,
      required: true
    }
  }
}
</script>
