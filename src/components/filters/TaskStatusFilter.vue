<template>
  <v-select
          v-model="filter"
          id="task_status"
          :options="taskStatuses"
          label="name"
          :multiple="true"
          @input="filterTable"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'TaskStatusFilter',
  data:function () {
    return {
      filter: []
    }
  },
  mounted () {
    this.getTaskStatuses()
  },
  computed: {
    taskStatuses () {
      return this.$store.getters['task_status/items'] || []
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
      getTaskStatuses: 'task_status/getItems'
    }),
    filterTable () {
      Event.$emit('vue-tables.filter::status.id', this.data)
    }
  }
}
</script>
