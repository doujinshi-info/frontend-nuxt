<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default: null
    }
  },
  computed: {
    data () {
      const mostWorks = {
        datasets: this.chartData.map((record, idx) => {
          return {
            label: record.name.romaji,
            data: [record.amount],
            backgroundColor: '#14C1B0'
          }
        })
      }

      return mostWorks
    }
  },
  watch: {
    chartData () {
      this.$data._chart.destroy()
      this.renderBarChart()
    }
  },
  mounted () {
    this.renderBarChart()
  },
  methods: {
    renderBarChart () {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>

<style>
</style>
