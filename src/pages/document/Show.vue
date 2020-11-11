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
import FilesTable from '../document/FilesTable'

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
          property: 'client',
          path: 'client.name',
          link: {
            route: 'ClientShow',
            param: 'client.id'
          }
        }
      ]
    }
  }
}
</script>
