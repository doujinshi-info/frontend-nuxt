<template>
  <div v-if="this.$auth.loggedIn" class="content">
    <b-dropdown aria-role="list">
      <b-button slot="trigger" type="is-text">
        <b-icon icon="dots-horizontal" />
      </b-button>

      <b-dropdown-item has-link aria-role="menuitem">
        <a :href="`/tag/${tag.type.slug}/${tag.slug}/edit`">
          {{ $t('Commom.edit') }}
        </a>
      </b-dropdown-item>

      <b-dropdown-item aria-role="menuitem" @click="openReportModel()">
        {{ $t('Report.buttonText') }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import locale from '~/mixin/locale'
import ReportModal from '~/components/ReportModal'

export default {
  mixins: [locale],
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  methods: {
    openReportModel () {
      this.$buefy.modal.open({
        parent: this,
        component: ReportModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          type: 'tag',
          content: this.tag.id
        }
      })
    }
  }
}
</script>
