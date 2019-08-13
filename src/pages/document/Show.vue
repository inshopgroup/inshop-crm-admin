<template>
  <is-show-template :fields="fields" entity="Document" :tabs="['files']" :history-key="historyKey">
    <template v-slot:files="{ item }">
      <files-table :files="item.files" />
    </template>
  </is-show-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilesTable from '../template/FilesTable'

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
          property: 'clients',
          type: 'collection',
          link: {
            route: 'ClientShow'
          },
        },
        {
          property: 'projects',
          type: 'collection',
          link: {
            route: 'ProjectShow',
          },
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'document/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'document/getItem',
      reset: 'document/reset'
    })
  }
}
</script>
