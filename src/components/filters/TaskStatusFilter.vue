<template>
  <v-select
    :value="value"
    :items="options"
    item-text="name"
    :multiple="true"
    return-object
    outlined
    dense
    @input="filterTable(value, $event)"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'TaskStatusFilter',
  data() {
    return {
      value: []
    }
  },
  computed: {
    options() {
      return this.$store.getters['taskStatus/items'] || []
    }
  },
  created() {
    this.getOptions().then(options => {
      const selected = []

      if (this.$route.query['status.id']) {
        let params = []

        if (this.$route.query['status.id'].length > 1) {
          params = this.$route.query['status.id']
        } else {
          params.push(this.$route.query['status.id'])
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
      getOptions: 'taskStatus/getItems'
    }),
    filterTable(property, data) {
      const ids = []

      if (data.length) {
        data.forEach(item => {
          ids.push(item.id)
        })
      }

      Event.$emit('vue-tables.filter::status.id', ids)
    }
  }
}
</script>
