<template>
  <section class="section">
    <h3 class="title is-3">
      {{ $t('Contribution.differences') }}
    </h3>

    <div class="box">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>{{ $t('Contribution.data') }}</th>
            <th>{{ $t('Contribution.oldValue') }}</th>
            <th>{{ $t('Contribution.newValue') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="change in changes" :key="change.type + change.column">
            <td>{{ $t('Contribution.diff.'+change.type+'.'+change.column) }}</td>
            <td>{{ change.old_value }}</td>
            <td>{{ change.new_value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import locale from '~/mixin/locale'

export default {
  mixins: [locale],
  async asyncData (context) {
    const contribution = await context.$axios.$get(`changelog/${context.params.id}`)
    const tagChanges = []
    const changes = []

    contribution.changelog.data.forEach((change) => {
      if (change.column === 'tag_id' || change.column === 'child_tag_id') {
        if (tagChanges[change.new_value.type.slug] === undefined) {
          tagChanges[change.new_value.type.slug] = []
        }

        tagChanges[change.new_value.type.slug].push(change)
      } else {
        changes.push(change)
      }
    })

    return { contribution, changes, tagChanges }
  }
}
</script>
