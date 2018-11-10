<template>
  <v-select
          v-model="filter"
          id="project_type"
          :options="projectTypes"
          label="name"
          :multiple="true"
          @input="filterTable"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'ProjectTypeFilter',
  data:function () {
    return {
      filter: []
    }
  },
  mounted () {
    this.getProjectTypes()
  },
  computed: {
    projectTypes () {
      return this.$store.getters['project_type/list/items'] || []
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
      getProjectTypes: 'project_type/list/default'
    }),
    filterTable () {
      Event.$emit('vue-tables.filter::type.id', this.data)
    }
  }
}
</script>
