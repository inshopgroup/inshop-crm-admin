<template>
  <is-table v-if="files.length" :headers="headers" :items="files">
    <template v-slot:item.size="{ item }">
      {{ bytes(item.size) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="text-right">
        <v-btn color="primary" text x-small @click.stop="download(item)">
          <v-icon small class="mr-1">
            save_alt
          </v-icon>
          {{ $t('file_download') }}
        </v-btn>
      </div>
    </template>
  </is-table>
</template>

<script>
import filesize from '../../../node_modules/filesize'
import axios from '../../interceptor'

export default {
  name: 'FilesTable',
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('originalName'), value: 'originalName' },
        { text: this.$t('size'), value: 'size' },
        { text: this.$t('mimeType'), value: 'mimeType' },
        {
          text: this.$t('createdAt'),
          value: 'createdAt',
          type: 'datetime',
          sortable: false
        },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    bytes(size) {
      return filesize(size)
    },
    download(file) {
      axios({
        url: `${process.env.VUE_APP_API_URL}/files/download/${file.id}`,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file.originalName)
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>
