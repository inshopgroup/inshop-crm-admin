<template>
<div class="box box-default">
  <div class="box-header with-border">
    <h3 class="box-title">{{title}}</h3>
  </div>
  <div class="box-body">
    <div class="chart-responsive">
      <doughnut-chart :height="200" :chartData="dataset" :labels="labels" :options="options"></doughnut-chart>
    </div>
  </div>
  <div class="box-footer">
    <ul class="chart-legend clearfix">
      <li v-for="(item, key) in labels">
        <i class="fa fa-circle-o" :style="{color: colorByKey(key)}"></i>
        {{item}}
        <span class="pull-right">{{values[key]}}</span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import DoughnutChart from '../DoughnutChart'
import Color from 'color'

export default {
  components: {DoughnutChart},
  props: {
    title: null,
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      options: {
        legend: {
          display: false
        },
      }
    }
  },
  computed: {
    dataset () {
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
    labels () {
      let labels = []

      this.data.forEach(item => {
        labels.push(item.name)
      })

      return labels
    },
    values () {
      let values = []

      this.data.forEach(item => {
        values.push(item.cnt)
      })

      return values
    },
    colors () {
      let colors = [];
      let pieces = this.data.length
      let color = new Color('#8A56E2')

      let i = 0
      this.data.forEach(() => {
        colors.push(color.rotate((240 / pieces) * i++ % 240))
      })

      return colors;
    }
  },
  methods: {
    colorByKey (key) {
      return this.colors[key]
    }
  }
}
</script>
