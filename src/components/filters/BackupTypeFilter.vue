<template>
  <field-select
      :item="{value: value}"
      property="value"
      id="backup_type"
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
    name: 'BackupTypeFilter',
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
    computed: {
      options() {
        return this.$store.getters['backup_type/items'] || []
      }
    },
    methods: {
      ...mapActions({
        getOptions: 'backup_type/getItems',
      }),
      filterTable(property, data) {
        if (this.initialised > 2) {
          let ids = []

          if (data.length) {
            data.forEach(item => {
              ids.push(item.id)
            })
          }

          Event.$emit('vue-tables.filter::type.id', ids)
        }

        this.initialised++
      }
    }
  }
</script>
