<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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
        return record.count
      })

      const names = this.chartData.map(function (record) {
        return record.month
      })

      const dataset = {
        data: amounts,
        backgroundColor: '#14C1B0',
        borderColor: '#14C1B0'
      }

      return { datasets: [dataset], labels: names }
    }
  },
  watch: {
    chartData () {
      this.$data._chart.destroy()
      this.renderLineChart()
    }
  },
  mounted () {
    this.renderLineChart()
  },
  methods: {
    renderLineChart () {
      this.renderChart(this.data, this.options)
    }
  }
}
</script>

<style>
</style>
