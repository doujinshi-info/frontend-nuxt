<template>
  <a :href="switchLocalePath(changeLocale)" class="localeSelector">
    <img v-if="currentLocale == 'en'" src="~assets/images/jp.svg">
    <img v-if="currentLocale !== 'en'" src="~assets/images/us.svg">
  </a>
</template>

<script>
export default {
  data () {
    return {
      currentLocale: this.$i18n.locale,
      changeLocale: (this.$i18n.locale !== 'en' ? 'en' : 'ja')
    }
  }
}
</script>
