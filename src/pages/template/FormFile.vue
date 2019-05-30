<template>
  <div :class="['inshop-form', isInvalid ? 'is-invalid' : '']">
    <label :for="fieldId"><span v-if="required">* </span>{{ label }}</label>
    <div v-if="item.property">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Name</th>
            <th>Size</th>
            <th>Mime type</th>
            <th>Create at</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="file in item.property"
            :key="file.id"
          >
            <td>
              Preview
            </td>
            <td>{{ file.originalName }}</td>
            <td>{{ filesize(file.size) }}</td>
            <td>{{ file.mimeType }}</td>
            <td>{{ crmDateFormat(file.createdAt) }}</td>
            <td>
              <button
                type="button"
                @click.prevent="deleteFile(file.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <input
        type="file"
        :multiple="multiple"
        @change="fileSelected($event.target.files)"
      >
    </div>
    <div
      v-if="isInvalid"
      class="inshop-errors"
    >
      {{ errors.property }}
    </div>
  </div>
</template>

<script>
import '../../sass/styles.scss'
import filesize from 'filesize'

export default {
  name: 'FormFile',
  props: {
    id: {
      type: String,
      default: null
    },
    item: {
      type: Object,
      required: true
    },
    property: {
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
    axios: {
      type: Function,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    errors: {
      type: Object,
      default: () => {}
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filesize: filesize
    }
  },
  computed: {
    fieldId() {
      return this.id || this.property
    },
    isInvalid() {
      return Object.keys(this.errors).length > 0 && this.errors[this.property]
    }
  },
  methods: {
    fileSelected(files) {
      if (this.axios) {
        Array.from(files).forEach(file => {
          let config = {header: {'Content-Type': 'multipart/form-data'}}
          let data = new FormData();

          data.append(this.formProperty, file)

          this.axios.post(this.route, data, config)
            .then(response => {
              this.$emit('formFileUploaded', response.data)
            })
            .catch(e => {
              this.$emit('formFileUploadFailed', e)
            })
        })
      }
    },
    deleteFile(id) {
      if (confirm('Are you sure?')) {
        this.$emit('formFileDeleted', id)
      }
    }
  }
}
</script>
