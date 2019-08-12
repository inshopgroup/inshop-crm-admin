<template>
  <div class="table-responsive" style="">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">
            {{ $t('id') }}
          </th>
          <th>{{ $t('originalName') }}</th>
          <th>{{ $t('size') }}</th>
          <th>{{ $t('mimeType') }}</th>
          <th>{{ $t('createdAt') }}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td>{{ file.id }}</td>
          <td>{{ file.originalName }}</td>
          <td>{{ bytes(file.size) }}</td>
          <td>{{ file.mimeType }}</td>
          <td>{{ crmDateFormat(file.createdAt) }}</td>
          <td class="text-right">
            <v-btn color="primary" text x-small @click.stop="download(file)">
              <v-icon small class="mr-1">
                save_alt
              </v-icon>
              {{ $t('file_download') }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import filesize from '../../../node_modules/filesize'
import axios from '../../interceptor'

export default {
  name: 'FilesTable',
  props: {
    files: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    bytes(size) {
      return filesize(size)
    },
    download(file) {
      axios({
        url: process.env.VUE_APP_API_URL + '/files/download/' + file.id,
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
