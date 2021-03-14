<template>
  <is-show-template
    :fields="fields"
    entity="Document"
    :tabs="['files']"
    :history-key="historyKey"
  >
    <template #files="{ item }">
      <files-table :files="item.files" />
    </template>
  </is-show-template>
</template>

<script>
import FilesTable from '../../document/FilesTable'

export default {
  components: {
    FilesTable,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
        },
        {
          property: 'client',
          path: 'client.name',
          link: {
            route: 'client-id-show___en',
            param: 'client.id',
          },
        },
      ],
    }
  },
  head() {
    return {
      title: 'Homepage title',
    }
  },
}
</script>
