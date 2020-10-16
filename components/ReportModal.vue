<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ $t('Report.title') }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-field label="Reason">
        <b-radio v-model="report.reason" native-value="duplicate">
          {{ $t('Report.reasonDuplicate') }}
        </b-radio>
      </b-field>

      <div class="field">
        <b-radio v-model="report.reason" native-value="spam">
          {{ $t('Report.reasonSpam') }}
        </b-radio>
      </div>

      <div class="field">
        <b-radio v-model="report.reason" native-value="removal">
          {{ $t('Report.reasonRemoval') }}
        </b-radio>
      </div>

      <div class="field">
        <b-radio v-model="report.reason" native-value="other">
          {{ $t('Report.reasonOther') }}
        </b-radio>
      </div>

      <b-field :label="$t('Report.notes')">
        <b-input v-model="report.notes" maxlength="200" type="textarea" :has-counter="true" />
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        {{ $t('Common.cancel') }}
      </button>
      <button class="button is-primary" @click="submitReport">
        {{ $t('Common.submit') }}
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      report: {}
    }
  },
  methods: {
    submitReport () {
      this.$nuxt.$loading.start()

      this.report.content_type = this.type
      this.report.content = this.content

      this.$axios.$post('/deletion', this.report).then((res) => {
        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: this.$t('report.success_message'),
          position: 'is-bottom',
          type: 'is-success'
        })

        this.$parent.close()
      }).catch((e) => {
        this.$nuxt.$loading.finish()

        this.$buefy.toast.open({
          message: (Array.isArray(e.response.data.message) ? e.response.data.message[0] : e.response.data.message),
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
