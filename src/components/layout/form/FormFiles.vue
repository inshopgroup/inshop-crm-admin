<template>
  <div class="jumbotron">
    <label v-if="label" class="custom-input-group__ttl">
      {{ $t(label) }} <span v-if="required">*</span>
    </label>

    <div v-if="item[itemProperty]">
      <table class="table table-striped table-hover">
        <tbody>
        <tr v-for="file in item[itemProperty]" :key="file.id">
          <td>
            {{ file.originalName }}
          </td>
          <td>
            <button type="button" @click.prevent="deleteFile(file.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div>
      <input type="file" :multiple="multiple" @change="fileSelected($event.target.files)" />
    </div>
  </div>
</template>

<script>
  import axios from '../../../interceptor'

  export default {
    name: 'FormFiles',
    props: {
      item: {
        type: Object,
        required: true
      },
      itemProperty: {
        type: String,
        required: true
      },
      formProperty: {
        type: String,
        required: true
      },
      route: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: null
      },
      required: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      fileSelected(files) {
        Array.from(files).forEach(file => {
          let config = {header: {'Content-Type': 'multipart/form-data'}}
          let data = new FormData();

          data.append(this.formProperty, file)

          axios.post(`${process.env.API_URL}/${this.route}`, data, config)
              .then(response => {
                // TODO: use store mutation, instead of direct change
                this.item[this.itemProperty].push(response.data)
                this.$toastr.s(this.$t('File uploaded'))
              })
              .catch(e => {
                this.$toastr.e(e.message, this.$t('error_occurred'))
              })
        })
      },
      deleteFile(id) {
        if (confirm('Are you sure?')) {
          let value = []
          let files = this.item[this.itemProperty]

          value = files.filter(el => {
            return el.id !== id
          })

          // TODO: use store mutation, instead of direct change
          this.item[this.itemProperty] = value
        }
      },
    }
  }
</script>
