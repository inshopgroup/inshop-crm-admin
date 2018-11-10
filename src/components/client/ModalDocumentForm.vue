<template>
<div class="modal fade" id="modal-document-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">

        <div :class="[{ 'has-error': isInvalid('name') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('document.name')}}:</label>
          <div class="col-sm-10">
            <input
                    id="document_name"
                    v-model="modalEdit.item.name"
                    :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('projects') }, 'form-group']" v-if="showProjects">
          <label class="col-sm-2 control-label">{{$t('document.projects')}}:</label>
          <div class="col-sm-10">
            <v-select multiple
                      id="document_projects"
                      v-model="modalEdit.item.projects"
                      :options="projects"
                      :class="['form-control-select2', isInvalid('projects') ? 'is-invalid' : '']"
                      label="name"
            ></v-select>
            <span class="help-block">{{ violations.projects }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('contactType') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('document.files')}}:</label>
          <div class="col-sm-10">
            <vue-dropzone id="file" :options="dropOptions()" @vdropzone-success="uploaded" @vdropzone-removed-file="removed"></vue-dropzone>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
        <button type="submit" class="btn btn-primary" @click="save(modalEdit.item)">{{$t('save')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '../../interceptor'
import vueDropzone from "vue2-dropzone";

export default {
  components: {
    vueDropzone
  },
  name: 'ModalDocumentForm',
  data () {
    return {
      errors: {},
    }
  },
  props: {
    showProjects: true,
    modalEdit: {
      title: '',
      item: {},
    },
    projects: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  watch: {
    'modalEdit.item': (document) => {
      if (document.files) {
        document.files.forEach(file => {
          window.dropzone.emit('addedfile', file)
          window.dropzone.emit('complete', file)
          window.dropzone.files.push(file)
        })
      }
    }
  },

  computed: {
    violations () {
      return this.errors || {}
    },

    authHeader () {
      return 'Bearer ' + this.$store.state.auth.token
    },
  },

  methods: {
    reset () {
      window.dropzone.removeAllFiles(true)
    },
    dropOptions () {
      let _this = this

      return {
        url: process.env.API_URL + '/files',
        paramName: 'file', // MB
        maxFilesize: 20, // MB
        maxFiles: 20,
        createImageThumbnails: false,
        // thumbnailWidth: 200, // px
        // thumbnailHeight: 200,
        addRemoveLinks: true,
        headers: {
          'Authorization': this.authHeader
        },
        init: function() {
          window.dropzone = this
        }
      }
    },

    uploaded (data) {
      this.modalEdit.item.files = this.modalEdit.item.files || []
      this.modalEdit.item.files.push(JSON.parse(data.xhr.response))
    },

    removed (data) {
      // console.log('removed', data)
      this.modalEdit.item.files = this.modalEdit.item.files || []
      this.modalEdit.item.files = this.modalEdit.item.files.filter(function(el) {
        return el.id !== data.id;
      });
    },

    save (item) {
      // console.log('send item ', item)
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('document.saved', {document: item.value}), this.$t('saved'))
          $('#modal-document-edit').modal('hide')
          this.$emit('documentCreated', item)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            let data = e.response.data

            if (data.violations) {
              const errors = {}

              data.violations.map(violation => {
                Object.assign(errors, { [violation.propertyPath]: violation.message })
              })

              this.errors = errors
            } else {
              this.$toastr.e(data['hydra:description'], data['hydra:title']);
            }
          } else {
            this.$toastr.e(e.message, this.$t('error_occurred'))
          }
        })
    },

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
  }
}
</script>

<style>
.dz-preview {
  width: 150px;
  height: 150px;
}
</style>
