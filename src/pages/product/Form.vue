<template>
  <form @submit.prevent="handleSubmit">
    <section class="content">
      <item-errors :entity="'product'" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li
            :class="{active: i === 0}"
            v-for="(language, i) in languages"
            :key="'header_' + language.id"
          >
            <a
              :href="'#' + language.code"
              data-toggle="tab"
              aria-expanded="false"
            >{{ language.name }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div
            :class="['tab-pane', {active: i === 0}]"
            :id="language.code"
            v-for="(language, i) in languages"
            :key="'content_' + language.id"
          >
            <form-input
              :item="findItem(language)"
              :errors="errors"
              :property="'name'"
              label="name"
              @formUpdated="(property, value) => updateTranslatedValue(property, value, language)"
            />
            <form-textarea
              :item="findItem(language)"
              :errors="errors"
              :property="'description'"
              label="description"
              @formUpdated="(property, value) => updateTranslatedValue(property, value, language)"
            />
          </div>
        </div>
      </div>
      <div class="box box-primary">
        <div class="box-body">
          <form-select
            :item="item"
            :errors="errors"
            :property="'brand'"
            :option-store="'brand'"
            label="brand_name"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            :property="'ean'"
            label="ean"
            @formUpdated="updateValue"
          />
          <form-select-autocomplete
            :item="item"
            :errors="errors"
            :property="'category'"
            :option-store="'category'"
            label="category_name"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            :property="'video'"
            label="video"
            @formUpdated="updateValue"
          />
          <form-file
            :axios="axios"
            :errors="errors"
            :item="item"
            property="images"
            form-property="image"
            :route="route"
            :multiple="true"
            label="files"
            @formFileUploaded="formFileUploaded"
            @formFileDeleted="formFileDeleted"
          />
        </div>
      </div>
      <item-edit-actions
        :item="item"
        :entity="'Product'"
        :path="'product'"
      />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from "../../components/layout/errors/ItemErrors"
import axios from "../../interceptor"

export default {
  components: {
    ItemErrors,
    ItemEditActions
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
  data() {
    return {
      axios: axios,
      route: process.env.VUE_APP_API_URL + '/images'
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
    findItem(language) {
      let translation = {
        language: language
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
    updateTranslatedValue(property, value, language) {
      this.$store.commit('product/PRODUCT_UPDATE_ITEM_TRANSLATION', {
        property: property,
        value: value,
        language: language
      })
    },
    ...mapActions({
      getLanguages: 'language/getItems'
    }),
    formFileUploaded(file) {
      this.$store.commit('product/PRODUCT_ADD_FILE', file)
    },
    formFileDeleted(value) {
      this.$store.commit('product/PRODUCT_DELETE_FILE', value)
    }
  }
}
</script>
