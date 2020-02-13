<template>
  <form @submit.prevent="handleSubmit">
    <v-tabs v-model="tab" background-color="transparent">
      <v-tab
        v-for="language in languages"
        :key="language.id"
        :href="'#tab-' + language.id"
        >{{ $t(language.name) }}</v-tab
      >
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="language in languages"
        :key="language.id"
        class="my-4"
        :value="'tab-' + language.id"
      >
        <form-input
          :item="findItem(language)"
          :errors="errors"
          property="name"
          label="name"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
        <form-textarea
          :item="findItem(language)"
          :errors="errors"
          property="description"
          label="description"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
      </v-tab-item>
    </v-tabs-items>

    <div>
      <form-select
        :item="item"
        :errors="errors"
        property="brand"
        option-store="brand"
        label="brand_name"
        @formUpdated="updateValue"
      />
      <form-input
        :item="item"
        :errors="errors"
        property="ean"
        label="ean"
        @formUpdated="updateValue"
      />
      <form-select-autocomplete
        :item="item"
        :errors="errors"
        property="category"
        option-store="category"
        label="category_name"
        @formUpdated="updateValue"
      />
      <form-input
        :item="item"
        :errors="errors"
        property="video"
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
      <form-checkbox
        :item="item"
        :errors="errors"
        property="isActive"
        label="isActive"
        @formUpdated="updateValue"
      />
    </div>

    <item-edit-actions :item="item" entity="Product" path="product" />
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import axios from '../../interceptor'

export default {
  components: {
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
      axios,
      route: `${process.env.VUE_APP_API_URL}/images`,
      tab: null
    }
  },
  computed: {
    ...mapGetters({
      errors: 'product/errors'
    }),
    languages() {
      return this.$store.getters['language/items'] || []
    },
    // translations: {
    //   get() {
    //     let translations = []
    //
    //     this.languages.forEach(language => {
    //       translations.push(this.findItem(language))
    //     })
    //
    //     return translations
    //   }
    // },
    authHeader() {
      return `Bearer ${this.$store.state.auth.token}`
    }
  },
  created() {
    this.getLanguages()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'product/reset',
      getLanguages: 'language/getItems'
    }),
    findItem(language) {
      let translation = {
        language
      }
      this.item.translations.some(element => {
        if (element.language.code === language.code) {
          translation = element
        }
      })
      return translation
    },
    updateValue(property, value) {
      this.$store.commit('product/PRODUCT_UPDATE_ITEM', { [property]: value })
    },
    updateTranslatedValue(property, value, language) {
      this.$store.commit('product/PRODUCT_UPDATE_ITEM_TRANSLATION', {
        property,
        value,
        language
      })
    },
    formFileUploaded(file) {
      this.$store.commit('product/PRODUCT_ADD_FILE', file)
    },
    formFileDeleted(value) {
      this.$store.commit('product/PRODUCT_DELETE_FILE', value)
    }
  }
}
</script>
