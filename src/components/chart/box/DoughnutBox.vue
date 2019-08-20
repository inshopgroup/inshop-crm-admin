<template>
  <v-card class="mx-auto">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <doughnut-chart
        :height="200"
        :chart-data="dataset"
        :labels="labels"
        :options="options"
      />
    </v-card-text>
    <v-card-actions>
      <v-layout align-start justify-start column fill-height>
        <v-flex v-for="(item, key) in labels" :key="item.id">
          <v-layout align-center>
            <i class="material-icons" :style="{ color: colorByKey(key) }">
              stop
            </i>
            {{ item }}
            <span class="pull-right">{{ values.key }}</span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import DoughnutChart from '../DoughnutChart'
import Color from 'color'

export default {
  components: { DoughnutChart },
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
            backgroundColor: this.colors,
            hoverBackgroundColor: this.colors,
            data: this.values
          }
        ]
      }
    },
    labels() {
      let labels = []

      this.data.forEach(item => {
        labels.push(item.name)
      })

      return labels
    },
    values() {
      let values = []

      this.data.forEach(item => {
        values.push(item.cnt)
      })

      return values
    },
    colors() {
      let colors = []
      let pieces = this.data.length
      let color = new Color('#8A56E2')

      let i = 0
      this.data.forEach(() => {
        colors.push(color.rotate(((240 / pieces) * i++) % 240))
      })

      return colors
    }
  },
  methods: {
    colorByKey(key) {
      return this.colors[key]
    }
  }
}
</script>
