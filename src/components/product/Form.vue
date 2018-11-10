<template>
  <form @submit.prevent="updateTranslations">
    <div class="form-group">
      <label for="product_brand" class="form-control-label">{{$t('product.brand.name')}}</label>

      <v-select
              id="product_brand"
              v-model="item.brand"
              :options="brands"
              :class="['form-control-select2', isInvalid('brand') ? 'is-invalid' : '']"
              label="name"
              @search="loadBrands"
      ></v-select>

      <div v-if="isInvalid('brand')" class="invalid-feedback">{{ violations.brand }}</div>
    </div>
    
    <div class="form-group">
      <label for="product_ean" class="form-control-label">{{$t('product.ean')}}</label>
      <input
        id="product_ean"
        v-model="item.ean"
        :class="['form-control', isInvalid('ean') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('ean', $event.target.value)">
      <div v-if="isInvalid('ean')" class="invalid-feedback">{{ violations.ean }}</div>
    </div>

    <div class="form-group">
      <label for="product_category" class="form-control-label">{{$t('product.category.name')}}</label>

      <v-select
              id="product_category"
              v-model="item.category"
              :options="categories"
              :class="['form-control-select2', isInvalid('category') ? 'is-invalid' : '']"
              label="name"
              @search="loadCategories"
      ></v-select>

      <div v-if="isInvalid('category')" class="invalid-feedback">{{ violations.category }}</div>
    </div>

    <div class="form-group">
      <label for="product_video" class="form-control-label">{{$t('product.video')}}</label>
      <input
              id="product_video"
              v-model="item.video"
              :class="['form-control', isInvalid('video') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('video', $event.target.value)">
      <div v-if="isInvalid('video')" class="invalid-feedback">{{ violations.video }}</div>
    </div>

    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <li :class="{active: i === 0}" v-for="(translation, i) in translations" :key="translation.language.id">
          <a :href="'#' + translation.language.code" data-toggle="tab" aria-expanded="false">{{translation.language.name}}</a>
        </li>
      </ul>
      <div class="tab-content">
        <div :class="['tab-pane', {active: i === 0}]" :id="translation.language.code" v-for="(translation, i) in translations" :key="translation.language.id">

          <div class="form-group">
            <label for="product_name" class="form-control-label">{{$t('product.name')}}</label>
            <input id="product_name" v-model="translation.name" :class="['form-control', isInvalid('name') ? 'is-invalid' : '']" type="text">
            <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
          </div>

          <div class="form-group">
            <label for="product_description" class="form-control-label">{{$t('product.description')}}</label>
            <textarea
                    id="product_description"
                    v-model="translation.description"
                    :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
            ></textarea>
            <div v-if="isInvalid('description')" class="invalid-feedback">{{ violations.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="product_images" class="form-control-label">{{$t('product.images')}}</label>

      <div id="app">
        <vue-dropzone id="product_images" :options="dropOptions()" @vdropzone-success="uploaded" @vdropzone-removed-file="removed"></vue-dropzone>
      </div>
    </div>

    <item-edit-actions :item="item" :entity="'Product'" :path="'product'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions } from 'vuex'
import vueDropzone from "vue2-dropzone";
import fetch from '../../utils/fetch'

export default {
  components: {
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
    },

    errors: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    violations () {
      return this.errors || {}
    },

    categories () {
      return this.$store.getters['category/list/items'] || []
    },

    brands () {
      return this.$store.getters['brand/list/items'] || []
    },

    languages () {
      return this.$store.getters['language/list/items'] || []
    },

    translations: {
      get () {
        let translations = [];

        this.languages.forEach(language => {
          translations.push(this.findItem(language))
        });

        return translations
      },
      set (v) {
        console.log('set', v)
      }
    },

    authHeader () {
      return 'Bearer ' + this.$store.state.auth.token
    }
  },

  created () {
    this.getLanguages()
  },

  methods: {
    updateTranslations () {
      this.item.translations = this.translations.filter(translation => {
        return translation.name && translation.name !== ''
      })

      this.handleSubmit(this.item)
    },

    findItem (language) {
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

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    ...mapActions({
      getCategories: 'category/list/default',
      getBrands: 'brand/list/default',
      getLanguages: 'language/list/default',
    }),

    loadCategories (keyword, loading) {
      loading(true);

      this.searchCategories(loading, keyword, this);
    },

    searchCategories: _.debounce((loading, keyword, vm) => {
      vm.getCategories('/categories?translations.name=' + keyword)
      loading(false);
    }, 350),

    loadBrands (keyword, loading) {
      loading(true);

      this.searchBrands(loading, keyword, this);
    },

    searchBrands: _.debounce((loading, keyword, vm) => {
      vm.getBrands('/brands?name=' + keyword)
      loading(false);
    }, 350),

    dropOptions () {
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
        init: function() {
          let thisDropzone = this;

          if (_this.$route.params.id) {
            fetch(decodeURIComponent(_this.$route.params.id) + '/images')
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

    uploaded (data) {
      let image = JSON.parse(data.xhr.response)

      Object.assign(image, {
        '@id': '/images/' + image.id,
        '@type': '"http://schema.org/MediaObject"'
      })

      this.item.images = this.item.images || []
      this.item.images.push(image)
      // this.item.images.push('/images/' + JSON.parse(data.xhr.response).id)
      // console.log('uploaded', this.item.images)
    },

    removed (data) {
      this.item.images = this.item.images || []
      this.item.images = this.item.images.filter(function(el) {
        return el.id !== JSON.parse(data.xhr.response).id
      });
      // console.log('removed data', data)
      // console.log('removed data', JSON.parse(data.xhr.response).id)
      // console.log('removed', this.item.images)
    }
  }
}
</script>
