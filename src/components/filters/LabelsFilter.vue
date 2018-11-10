<template>
  <v-select
          v-model="filter"
          id="label"
          :options="labels"
          label="name"
          :multiple="true"
          @input="filterTable"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'LabelsFilter',
  data:function () {
    return {
      filter: []
    }
  },
  mounted () {
    this.getLabels()
  },
  computed: {
    labels () {
      return this.$store.getters['label/list/items'] || []
    },
    data () {
      let ids = []

      this.filter.forEach(item => {
        ids.push(item.id)
      })

      return ids
    }
  },
  methods: {
    ...mapActions({
      getLabels: 'label/list/default'
    }),
    filterTable () {
      Event.$emit('vue-tables.filter::labels.id', this.data)
    }
  }
}
</script>
