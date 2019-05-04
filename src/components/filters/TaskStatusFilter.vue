<template>
  <field-select
      :item="{value: value}"
      property="value"
      id="task_status"
      :options="options"
      option-label="name"
      :multiple="true"
      @fieldUpdated="filterTable"
  ></field-select>
</template>

<script>
  import {mapActions} from 'vuex'
  import {Event} from 'vue-tables-2'

  export default {
    name: 'TaskStatusFilter',
    data: function () {
      return {
        value: [],
        initialised: 1
      }
    },
    created() {
      this.getOptions()
        .then(options => {
          let selected = []

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
    computed: {
      options() {
        return this.$store.getters['task_status/items'] || []
      }
    },
    methods: {
      ...mapActions({
        getOptions: 'task_status/getItems',
      }),
      filterTable(property, data) {
        if (this.initialised > 2) {
          let ids = []

          if (data.length) {
            data.forEach(item => {
              ids.push(item.id)
            })
          }

          Event.$emit('vue-tables.filter::status.id', ids)
        }

        this.initialised++
      }
    }
  }
</script>
