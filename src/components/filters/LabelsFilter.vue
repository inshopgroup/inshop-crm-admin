<template>
  <field-select
    id="label"
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
  name: 'LabelFilter',
  data() {
    return {
      value: []
    }
  },
  computed: {
    options() {
      return this.$store.getters['label/items'] || []
    }
  },
  created() {
    this.getOptions().then(options => {
      const selected = []

      if (this.$route.query['labels.id']) {
        let params = []

        if (this.$route.query['labels.id'].length > 1) {
          params = this.$route.query['labels.id']
        } else {
          params.push(this.$route.query['labels.id'])
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
      getOptions: 'label/getItems'
    }),
    filterTable(property, data) {
      const ids = []

      if (data.length) {
        data.forEach(item => {
          ids.push(item.id)
        })
      }

      Event.$emit('vue-tables.filter::labels.id', ids)
    }
  }
}
</script>
