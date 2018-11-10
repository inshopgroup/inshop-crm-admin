<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="template_name" class="form-control-label">{{$t('template.name')}}</label>
      <input
        id="template_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label for="template_type" class="form-control-label">{{$t('template.type.name')}}</label>

      <v-select
              id="template_type"
              v-model="item.type"
              :options="templateTypes"
              :class="['form-control-select2', isInvalid('type') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('type')" class="invalid-feedback">{{ violations.type}}</div>
    </div>

    <div class="form-group">
      <label for="file" class="form-control-label">{{$t('template.files')}}</label>

      <div id="app">
        <vue-dropzone id="file" :options="dropOptions()" @vdropzone-success="uploaded" @vdropzone-removed-file="removed"></vue-dropzone>
      </div>
    </div>

    <item-edit-actions :item="item" :entity="'Template'" :path="'template'"></item-edit-actions>
  </form>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import fetch from '../../utils/fetch'
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions } from 'vuex'

export default {
  components: {
    vueDropzone, ItemEditActions
  },

  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    // eslint-disable-next-line
    authHeader () {
      return 'Bearer ' + this.$store.state.auth.token
    },

    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    templateTypes () {
      return this.$store.getters['template_type/list/items'] || []
    },
  },

  mounted () {
    this.getTemplateTypes()
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    ...mapActions({
      getTemplateTypes: 'template_type/list/default',
    }),

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
          let thisDropzone = this;

          if (_this.$route.params.id) {
            fetch(decodeURIComponent(_this.$route.params.id) + '/files')
              .then(response => response.json())
              .then((data) => {

                data['hydra:member'].forEach((file) => {
                  file.name = file.originalName

                  thisDropzone.emit("addedfile", file);
                  // thisDropzone.options.thumbnail.call(thisDropzone, file, process.env.API_URL + '/file/' + file.contentUrl);

                  // Make sure that there is no progress bar, etc...
                  thisDropzone.emit("complete", file);
                })
              })
              .catch((e) => {
                console.log('Error uploading', e)
              })
          }
        }
      }
    },

    uploaded (data) {
      this.item.files = this.item.files || []
      this.item.files.push('/files/' + JSON.parse(data.xhr.response).id)
    },

    removed (data) {
      this.item.files = this.item.files || []
      this.item.files = this.item.files.filter(function(el) {
        return el.id !== data.id;
      });
    }
  }
}
</script>
