<template>
  <div>
    <TagTabs :tag="tag" active="information" />

    <section class="section">
      <h3 class="title is-3">
        {{ getLocalizedName(tag.name) }}
      </h3>

      <h4 class="subtitle is-4">
        {{ getLocalizedSubName(tag.name) }}
      </h4>

      <nav v-if="this.$auth.loggedIn" class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <TagFollowBtn :tag="tag" :followed="followed" />
          </div>
          <div class="level-item">
            <TagContextMenu :tag="tag" />
          </div>
        </div>
      </nav>

      <TagInfoTable :tag="tag" />

      <hr>

      <TagBookList :api-endpoint="apiEndpoint" :data="tag.books" :page="currentPage" />
    </section>
  </div>
</template>

<script>
import TagContextMenu from '~/components/TagContextMenu'
import TagBookList from '~/components/TagBookList'
import TagInfoTable from '~/components/TagInfoTable'
import TagFollowBtn from '~/components/TagFollowBtn'
import TagTabs from '~/components/TagTabs'
import locale from '~/mixin/locale'

export default {
  components: {
    TagFollowBtn,
    TagContextMenu,
    TagBookList,
    TagInfoTable,
    TagTabs
  },
  mixins: [locale],
  async asyncData (context) {
    const currentPage = context.query.page || 1
    const tagType = context.route.params.type
    const tagSlug = context.route.params.slug
    let followed = false

    const tag = await context.$axios.$get(`tag/${tagType}/${tagSlug}?page=${currentPage}`)

    if (context.$auth.loggedIn) {
      await context.$axios.$get(`/following/${tag.id}`).then((res) => {
        followed = res.data
      })
    }

    return {
      tag,
      currentPage,
      apiEndpoint: `tag/${tagType}/${tagSlug}`,
      followed
    }
  },
  head () {
    return {
      title: this.getLocalizedName(this.tag.name),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('Meta.Description.viewTag', {
            tag: this.getLocalizedName(this.tag.name),
            type: this.getLocalizedName(this.tag.type.name)
          })
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.tag.tags.data.map((tag) => {
            return this.getLocalizedName(tag.name)
          }).join(', ')
        }
      ]
    }
  }
}
</script>
