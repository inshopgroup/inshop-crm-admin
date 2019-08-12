<template>
  <is-show-template :fields="fields" entity="Template" :tabs="['tabs_files']" :history-key="historyKey">
    <template v-slot:tabs_files="{ item }">
      <files-table :files="item.files" />
    </template>
  </is-show-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilesTable from './FilesTable'

export default {
  components: {
    FilesTable
  },
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
        },
        {
          property: 'type',
          path: 'type.name',
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'template/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'template/getItem',
      reset: 'template/reset'
    })
  }
}
</script>
