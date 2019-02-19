<template>
  <v-select
          v-model="filter"
          id="project_status"
          :options="projectStatuses"
          label="name"
          :multiple="true"
          @input="filterTable"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'ProjectStatusFilter',
  data:function () {
    return {
      filter: []
    }
  },
  mounted () {
    this.getProjectStatuses()
  },
  computed: {
    projectStatuses () {
      return this.$store.getters['project_status/items'] || []
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
      getProjectStatuses: 'project_status/getItems'
    }),
    filterTable () {
      Event.$emit('vue-tables.filter::status.id', this.data)
    }
  }
}
</script>
