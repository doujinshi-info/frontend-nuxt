<template>
  <b-switch v-model="pushStatus" :disabled="!pushAvailable" @input="toggleSubscription">
    {{ $t('PageAccountNotifications.desktopNotifications') }}
  </b-switch>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  props: [],
  data () {
    return {
      pushAvailable: false,
      pushStatus: false,
      activeSubscription: null,
      serviceWorker: null
    }
  },
  mounted () {
    if (!('serviceWorker' in navigator)) {
      this.pushAvailable = false
      return
    }

    if (!('PushManager' in window) || !('Notification' in window)) {
      this.pushAvailable = false
      return
    }

    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      this.pushAvailable = false
      return
    }

    // Get existing push subscription
    navigator.serviceWorker.ready.then((sw) => {
      this.serviceWorker = sw

      this.serviceWorker.pushManager.getSubscription().then((sub) => {
        if (sub === null) {
          this.pushStatus = false
          this.pushAvailable = true
        } else {
          this.pushStatus = true
          this.pushAvailable = true
          this.activeSubscription = sub
        }
      })
    })
  },
  methods: {
    checkPermission () {
      if (!('Notification' in window)) {
        return false
      } else if (Notification.permission === 'granted') {
        return true
      } else if (Notification.permission === 'denied') {
        return false
      } else {
        Notification.requestPermission((result) => {
          if (result === 'granted') {
            return true
          }
        })
      }
    },
    subscribe () {
      if (this.activeSubscription === null) {
        this.serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlB64ToUint8Array(process.env.PUSH_KEY)
        }).then((subscription) => {
          this.pushStatus = true
          this.activeSubscription = subscription

          this.$axios.$put('notifications/push', {
            type: 'create',
            subscription,
            language: this.$i18n.locale
          })
        })
      }
    },
    unsubscribe () {
      if (this.activeSubscription !== null) {
        this.activeSubscription.unsubscribe().then((successful) => {
          this.$axios.$put('notifications/push', {
            type: 'delete',
            subscription: this.activeSubscription,
            language: this.$i18n.locale
          }).then((res) => {
            this.pushStatus = false
            this.activeSubscription = null
          })
        })
      }
    },
    toggleSubscription () {
      if (this.checkPermission()) {
        if (this.pushStatus === false && this.activeSubscription !== null) {
          this.unsubscribe()
        }

        if (this.pushStatus === true && this.activeSubscription === null) {
          this.subscribe()
        }
      }
    },
    urlB64ToUint8Array (base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)

      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }

      return outputArray
    }
  }
}
</script>
