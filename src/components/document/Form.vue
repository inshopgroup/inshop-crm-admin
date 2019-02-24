<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'document'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'document.name'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'client'" :option-property="'client'" :label="'document.client'" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'projects'" :option-property="'project'" :label="'document.projects'" :multiple="true" @fieldUpdated="updateValue"></form-select>

          <div class="form-group">
            <label for="file" class="form-control-label">{{$t('document.files')}}</label>

            <div id="app">
              <vue-dropzone id="file" :options="dropOptions()" @vdropzone-success="uploaded" @vdropzone-removed-file="removed"></vue-dropzone>
            </div>
          </div>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Document'" :path="'document'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import vueDropzone from "vue2-dropzone";
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormSelect from "../layout/form/FormSelect";
  import ItemErrors from "../layout/errors/ItemErrors";
  import axios from '../../interceptor'

  export default {
    components: {
      ItemErrors,
      FormSelect,
      FormInput,
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
      }
    },
    beforeDestroy() {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'document/errors'
      }),
      authHeader() {
        return 'Bearer ' + this.$store.state.auth.token
      },
    },
    methods: {
      ...mapActions({
        reset: 'document/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('document/DOCUMENT_UPDATE_ITEM', {[property]: value})
      },
      dropOptions() {
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
          init: function () {
            let thisDropzone = this;

            if (_this.$route.params.id) {
              axios.get(process.env.API_URL + '/documents/' + _this.$route.params.id + '/files')
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
      uploaded(data) {
        this.item.files = this.item.files || []
        this.item.files.push('/files/' + JSON.parse(data.xhr.response).id)
      },
      removed(data) {
        this.item.files = this.item.files || []
        this.item.files = this.item.files.filter(function (el) {
          return el.id !== data.id;
        });
      },
    }
  }
</script>
