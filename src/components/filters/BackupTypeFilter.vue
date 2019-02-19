<template>
  <v-select
          v-model="filter"
          id="backup_type"
          :options="backupTypes"
          label="name"
          :multiple="true"
          @input="filterTable"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'BackupTypeFilter',
  data:function () {
    return {
      filter: []
    }
  },
  mounted () {
    this.getBackupTypes()
  },
  computed: {
    backupTypes () {
      return this.$store.getters['backup_type/items'] || []
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
      getBackupTypes: 'backup_type/getItems'
    }),
    filterTable () {
      Event.$emit('vue-tables.filter::type.id', this.data)
    }
  }
}
</script>
