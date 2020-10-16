<template>
  <div class="tabs is-centered is-fullwidth has-background-white">
    <ul>
      <li :class="(active == 'profile' ? 'is-active' : '')">
        <a :href="`/profile/${user.slug}`">
          {{ $t('ProfileTab.information') }}
        </a>
      </li>
      <li :class="(active == 'library' ? 'is-active' : '')">
        <a :href="`/profile/${user.slug}/library`">
          {{ $t('ProfileTab.library') }}
        </a>
      </li>
      <li :class="(active == 'wishlist' ? 'is-active' : '')">
        <a :href="`/profile/${user.slug}/wishlist`">
          {{ $t('ProfileTab.wishlist') }}
        </a>
      </li>
      <li :class="(active == 'contributions' ? 'is-active' : '')">
        <a :href="`/profile/${user.slug}/contributions`">
          {{ $t('ProfileTab.contributions') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    active: {
      type: String,
      default: 'profile'
    }
  }
}
</script>
