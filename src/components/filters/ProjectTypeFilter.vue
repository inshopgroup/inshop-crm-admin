<template>
  <field-select
    id="projectType"
    :item="{ value: value }"
    property="value"
    :options="options"
    option-label="name"
    :multiple="true"
    @fieldUpdated="filterTable"
  />
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'ProjectTypeFilter',
  data() {
    return {
      value: []
    }
  },
  computed: {
    options() {
      return this.$store.getters['projectType/items'] || []
    }
  },
  created() {
    this.getOptions().then(options => {
      const selected = []

      if (this.$route.query['type.id']) {
        let params = []

        if (this.$route.query['type.id'].length > 1) {
          params = this.$route.query['type.id']
        } else {
          params.push(this.$route.query['type.id'])
        }

        params.forEach(id => {
          options.some(element => {
            if (element.id === parseInt(id)) {
              selected.push(element)
            }
          })
        })
      }

      this.value = selected
    })
  },
  methods: {
    ...mapActions({
      getOptions: 'projectType/getItems'
    }),
    filterTable(property, data) {
      const ids = []

      if (data.length) {
        data.forEach(item => {
          ids.push(item.id)
        })
      }

      Event.$emit('vue-tables.filter::type.id', ids)
    }
  }
}
</script>
