<template>
  <is-show-template
    :fields="fields"
    entity="Document"
    :tabs="['files']"
    :history-key="historyKey"
  >
    <template v-slot:files="{ item }">
      <files-table :files="item.files" />
    </template>
  </is-show-template>
</template>

<script>
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
          property: 'name'
        },
        {
          property: 'clients',
          type: 'collection',
          link: {
            route: 'ClientShow'
          }
        },
        {
          property: 'projects',
          type: 'collection',
          link: {
            route: 'ProjectShow'
          }
        }
      ]
    }
  }
}
</script>
