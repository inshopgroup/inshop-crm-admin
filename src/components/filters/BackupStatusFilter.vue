<template>
  <v-select
          v-model="filter"
          id="backup_status"
          :options="backupStatuses"
          label="name"
          :multiple="true"
          @input="filterTable"
  ></v-select>
</template>

<script>
import { mapActions } from 'vuex'
import { Event } from 'vue-tables-2'

export default {
  name: 'BackupStatusFilter',
  data:function () {
    return {
      filter: []
    }
  },
  mounted () {
    this.getBackupStatuses()
  },
  computed: {
    backupStatuses () {
      return this.$store.getters['backup_status/list/items'] || []
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
      getBackupStatuses: 'backup_status/list/default'
    }),
    filterTable () {
      Event.$emit('vue-tables.filter::status.id', this.data)
    }
  }
}
</script>
