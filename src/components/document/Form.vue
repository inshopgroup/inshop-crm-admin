<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="document_name"
        class="form-control-label">{{$t('document.name')}}</label>
      <input
        id="document_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder="">
      <div
        v-if="isInvalid('name')"
        class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label
        for="document_client"
        class="form-control-label">{{$t('document.client')}}</label>

      <v-select
                id="document_client"
                v-model="item.client"
                :options="clients"
                :class="['form-control-select2', isInvalid('client') ? 'is-invalid' : '']"
                label="name"
                @search="loadClients"
      ></v-select>

      <div v-if="isInvalid('client')" class="invalid-feedback">{{ violations.client }}</div>
    </div>

    <div class="form-group">
      <label
        for="document_projects"
        class="form-control-label">{{$t('document.projects')}}</label>

      <v-select multiple
                id="document_projects"
                v-model="item.projects"
                :options="projects"
                :class="['form-control-select2', isInvalid('projects') ? 'is-invalid' : '']"
                label="name"
      ></v-select>

      <div v-if="isInvalid('projects')" class="invalid-feedback">{{ violations.projects }}</div>
    </div>

    <div class="form-group">
      <label for="file" class="form-control-label">{{$t('document.files')}}</label>

      <div id="app">
        <vue-dropzone id="file" :options="dropOptions()" @vdropzone-success="uploaded" @vdropzone-removed-file="removed"></vue-dropzone>
      </div>
    </div>

    <item-edit-actions :item="item" :entity="'Document'" :path="'document'"></item-edit-actions>
  </form>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import fetch from '../../utils/fetch'
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions, mapGetters } from 'vuex'
import lodash from 'lodash'

export default {
  components: {
    vueDropzone, ItemEditActions
  },

  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    item: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },


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

    projects () {
      if (this.item && this.item.client) {
        return this.item.client.projects
      }
    },

    ...mapGetters({
      clients: 'client/list/items',
    }),
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
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
    },

    ...mapActions({
      getClients: 'client/list/default'
    }),

    loadClients (keyword, loading) {
      loading(true);

      this.search(loading, keyword, this);
    },

    search: _.debounce((loading, keyword, vm) => {
      vm.getClients('/clients?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>
