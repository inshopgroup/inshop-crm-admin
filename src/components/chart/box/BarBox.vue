<template>
  <v-card class="mx-auto">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <bar-chart
        :height="200"
        :chart-data="dataset"
        :labels="labels"
        :options="options"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from '../BarChart'

export default {
  components: { BarChart },
  props: {
    title: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    dataset() {
      return {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: '#f87979',
            data: this.values
          }
        ]
      }
    },
    labels() {
      return this.data.map(i => i.name)
    },
    values() {
      return this.data.map(i => i.cnt)
    }
  }
}
</script>
