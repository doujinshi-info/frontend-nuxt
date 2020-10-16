<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half has-text-centered">
        <img src="~/assets/images/logo_large.png">
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-half">
        <p class="content">
          {{ $t('PageAbout.textOpening') }}
        </p>
        <p class="content">
          {{ $t('PageAbout.textDisclaimer') }}
        </p>
      </div>
    </div>

    <section class="section">
      <div class="columns is-centered">
        <div class="column has-text-centered">
          <h4 class="title is-4 is-spaced has-text-weight-bold">
            {{ $t('PageAbout.featurePiracy.title') }}
          </h4>

          <p class="content">
            <b-icon icon="download-off" custom-size="mdi-48px" />
          </p>
          <p>{{ $t('PageAbout.featurePiracy.text') }}</p>
        </div>

        <div class="column has-text-centered">
          <h4 class="title is-4 is-spaced has-text-weight-bold">
            {{ $t('PageAbout.featureCommunity.title') }}
          </h4>

          <p class="content">
            <b-icon icon="account-group" custom-size="mdi-48px" />
          </p>
          <p>{{ $t('PageAbout.featureCommunity.text') }}</p>
        </div>

        <div class="column has-text-centered">
          <h4 class="title is-4 is-spaced has-text-weight-bold">
            {{ $t('PageAbout.featureOpenSource.title') }}
          </h4>

          <p class="content">
            <b-icon icon="source-branch" custom-size="mdi-48px" />
          </p>
          <!-- eslint-disable-next-line -->
          <p v-html="$t('PageAbout.featureOpenSource.text')" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('PageAbout.title')
    }
  }
}
</script>
