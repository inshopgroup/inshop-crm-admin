<template>
  <form @submit.prevent="updateTranslations">
    <section class="content">
      <item-errors :entity="'product'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li :class="{active: i === 0}" v-for="(translation, i) in translations" :key="translation.language.id">
            <a :href="'#' + translation.language.code" data-toggle="tab" aria-expanded="false">{{translation.language.name}}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div :class="['tab-pane', {active: i === 0}]" :id="translation.language.code" v-for="(translation, i) in translations" :key="translation.language.id">
            <form-input :item="translation" :errors="errors" :property="'name'" :label="'product.name'" @fieldUpdated="updateValue"></form-input>
            <form-textarea :item="translation" :errors="errors" :property="'description'" :label="'product.description'" @fieldUpdated="updateValue"></form-textarea>
          </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-body">
          <form-select :item="item" :errors="errors" :property="'brand'" :option-property="'brand'" :label="'product.brand.name'" @fieldUpdated="updateValue"></form-select>
          <form-input :item="item" :errors="errors" :property="'ean'" :label="'product.ean'" @fieldUpdated="updateValue"></form-input>
          <form-select-autocomplete :item="item" :errors="errors" :property="'category'" :option-property="'category'" :label="'product.category.name'" @fieldUpdated="updateValue"></form-select-autocomplete>
          <form-input :item="item" :errors="errors" :property="'video'" :label="'product.video'" @fieldUpdated="updateValue"></form-input>

          <div class="form-group">
            <label for="product_images" class="form-control-label">{{$t('product.images')}}</label>

            <div id="app">
              <vue-dropzone id="product_images" :options="dropOptions()" @vdropzone-success="uploaded" @vdropzone-removed-file="removed"></vue-dropzone>
            </div>
          </div>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Product'" :path="'product'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import vueDropzone from "vue2-dropzone";
  import FormSelect from "../../components/layout/form/FormSelect";
  import FormInput from "../../components/layout/form/FormInput";
  import FormSelectAutocomplete from "../../components/layout/form/FormSelectAutocomplete";
  import FormTextarea from "../../components/layout/form/FormTextarea";
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import axios from '../../interceptor'

  export default {
    components: {
      ItemErrors,
      FormTextarea,
      FormSelectAutocomplete,
      FormInput,
      FormSelect,
      ItemEditActions,
      vueDropzone
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
        errors: 'product/errors'
      }),
      languages() {
        return this.$store.getters['language/items'] || []
      },
      translations: {
        get() {
          let translations = [];

          this.languages.forEach(language => {
            translations.push(this.findItem(language))
          });

          return translations
        },
        set(v) {
          console.log('set', v)
        }
      },
      authHeader() {
        return 'Bearer ' + this.$store.state.auth.token
      }
    },
    created() {
      this.getLanguages()
    },
    methods: {
      ...mapActions({
        reset: 'product/reset'
      }),
      updateTranslations() {
        this.item.translations = this.translations.filter(translation => {
          return translation.name && translation.name !== ''
        })

        this.handleSubmit(this.item)
      },
      findItem(language) {
        let translation = {
          language: language,
        };

        this.item.translations.some(element => {
          if (element.language.code === language.code) {
            translation = element
          }
        });

        return translation
      },
      updateValue(property, value) {
        this.$store.commit('product/PRODUCT_UPDATE_ITEM', {[property]: value})
      },
      ...mapActions({
        getLanguages: 'language/getItems',
      }),
      dropOptions() {
        let _this = this
        return {
          url: process.env.API_URL + '/images',
          paramName: 'image', // MB
          maxFilesize: 20, // MB
          maxFiles: 20,
          createImageThumbnails: true,
          thumbnailWidth: 200, // px
          thumbnailHeight: 150,
          addRemoveLinks: true,
          headers: {
            'Authorization': this.authHeader
          },
          init: function () {
            let thisDropzone = this;

            if (_this.$route.params.id) {
              axios.get(process.env.API_URL + '/products/' + _this.$route.params.id + '/images')
                .then(response => response.json())
                .then((data) => {

                  data['hydra:member'].forEach((file) => {
                    file.name = file.originalName

                    thisDropzone.emit("addedfile", file);
                    thisDropzone.options.thumbnail.call(thisDropzone, file, process.env.API_URL + '/images/200/' + file.contentUrl);

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
        let image = JSON.parse(data.xhr.response)

        Object.assign(image, {
          'id': '/images/' + image.id,
          '@type': '"http://schema.org/MediaObject"'
        })

        this.item.images = this.item.images || []
        this.item.images.push(image)
        // this.item.images.push('/images/' + JSON.parse(data.xhr.response).id)
        // console.log('uploaded', this.item.images)
      },
      removed(data) {
        this.item.images = this.item.images || []
        this.item.images = this.item.images.filter(function (el) {
          return el.id !== JSON.parse(data.xhr.response).id
        });
        // console.log('removed data', data)
        // console.log('removed data', JSON.parse(data.xhr.response).id)
        // console.log('removed', this.item.images)
      }
    }
  }
</script>
