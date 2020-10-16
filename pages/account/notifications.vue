<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('PageAccountNotifications.title') }}
    </h3>

    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-button icon-left="check" @click="markAllRead">
            {{ $t('PageAccountNotifications.markAllRead') }}
          </b-button>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <NotificationsPush />
        </div>
      </div>
    </nav>

    <section v-if="!notifications.data" class="section">
      <div class="content has-text-grey has-text-centered">
        <p><b-icon icon="alert-circle-outline" size="is-large" /></p>
        <p>{{ $t('PageAccountNotifications.noResults') }}</p>
      </div>
    </section>

    <section class="notification-list">
      <a v-for="notification in notifications.data" :key="notification.id" @click="readNotification(notification)">
        <div class="box" :class="(notification.is_read == false ? 'unread' : '')">
          <article class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="getBookCover(notification.book)" class="is-rounded">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <span v-if="notification.type == 'new_doujin'">
                  {{
                    $t(`PageAccountNotifications.newDoujin`, {
                      tag: getLocalizedName(notification.tag.name),
                      book: getLocalizedName(notification.book.name)
                    })
                  }}
                </span>

                <div class="is-size-7 has-text-grey-light">
                  {{ notification.created_at }}
                </div>
              </div>
            </div>
          </article>
        </div>
      </a>

      <b-pagination
        :total="notifications.meta.total"
        :current="currentPage"
        :per-page="notifications.meta.per_page"
        order="is-centered"
        range-before="4"
        range-after="4"
        :aria-next-label="$t('Common.next')"
        :aria-previous-label="$t('Common.prev')"
        :aria-page-label="$t('Common.page')"
        :aria-current-label="$t('Common.currentPage')"
        @change="onPageChange"
      >
        <b-pagination-button
          :id="`page${props.page.number}`"
          slot-scope="props"
          :page="props.page"
          :href="`/account/notifications?page=${props.page.number}`"
        >
          {{ props.page.number }}
        </b-pagination-button>

        <b-pagination-button
          slot="previous"
          slot-scope="props"
          :page="props.page"
          :href="`/account/notifications?page=${props.page.number}`"
        >
          <b-icon icon="chevron-left" />
        </b-pagination-button>

        <b-pagination-button
          slot="next"
          slot-scope="props"
          :page="props.page"
          :href="`/account/notifications?page=${props.page.number}`"
        >
          <b-icon icon="chevron-right" />
        </b-pagination-button>
      </b-pagination>
    </section>
  </section>
</template>

<script>
import locale from '~/mixin/locale'
import NotificationsPush from '~/components/NotificationsPush'

export default {
  components: {
    NotificationsPush
  },
  mixins: [locale],
  middleware: 'auth',
  async asyncData (context) {
    const currentPage = context.query.page || 1
    const notifications = await context.$axios.$get(`notifications?page=${currentPage}`)

    return { notifications, currentPage }
  },
  methods: {
    readNotification (notification) {
      this.$axios.$put('notifications/read', { notification: notification.id })

      if (notification.type === 'new_doujin') {
        this.$router.push(`/book/${notification.book.slug}`)
      }
    },
    markAllRead () {
      this.$axios.$put('notifications/read/all').then(() => {
        this.fetchNotifications()
      })
    },
    onPageChange (page) {
      history.pushState({}, null, this.$route.path + '?page=' + encodeURIComponent(page))
      this.currentPage = page
      this.fetchNotifications()
    },
    async fetchNotifications () {
      this.$nuxt.$loading.start()

      await this.$axios.$get(`notifications?page=${this.currentPage}`).then((res) => {
        this.notifications = res
        this.$nuxt.$loading.finish()
      }).catch((e) => {
        this.$nuxt.$loading.finish()
      })
    },
    getBookCover (book) {
      if (book.cover) {
        return book.cover.replace('.jpg', '-thumb.jpg')
      } else {
        return '~assets/images/now_printing_thumb.jpg'
      }
    }
  },
  head () {
    return {
      title: this.$t('PageAccountNotifications.title')
    }
  }
}
</script>
