<template>
  <b-loading v-if="loading" :active="true">
    <b-icon
      pack="mdi"
      icon="loading"
      size="is-large"
      custom-class="mdi-spin"
    />
  </b-loading>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
