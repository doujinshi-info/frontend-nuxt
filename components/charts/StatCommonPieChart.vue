<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
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
      const amounts = this.chartData.map(function (record) {
        return record.amount
      })

      const names = this.chartData.map(function (record) {
        return record.name.romaji
      })

      return {
        datasets: [{
          data: amounts,
          backgroundColor: [
            '#14C1B0',
            '#14C1B0',
            '#14C1B0',
            '#14C1B0',
            '#14C1B0'
          ]
        }],
        labels: names
      }
    }
  },
  watch: {
    chartData () {
      this.$data._chart.destroy()
      this.renderPieChart()
    }
  },
  mounted () {
    this.renderPieChart()
  },
  methods: {
    renderPieChart () {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>

<style>
</style>
