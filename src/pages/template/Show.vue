<template>
  <is-show-template
    :fields="fields"
    entity="Template"
    :tabs="['tabs_files']"
    :history-key="historyKey"
  >
    <template v-slot:tabs_files="{ item }">
      <files-table :files="item.files" />
    </template>
  </is-show-template>
</template>

<script>
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
          property: 'name'
        },
        {
          property: 'type',
          path: 'type.name'
        }
      ]
    }
  }
}
</script>
