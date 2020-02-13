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
          property="title"
          label="text_title"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
        <form-textarea
          :item="findItem(language)"
          :errors="errors"
          property="content"
          label="content"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
        <form-input
          :item="findItem(language)"
          :errors="errors"
          property="seoTitle"
          label="seoTitle"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
        <form-input
          :item="findItem(language)"
          :errors="errors"
          property="seoDescription"
          label="seoDescription"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
        <form-input
          :item="findItem(language)"
          :errors="errors"
          property="seoKeywords"
          label="seoKeywords"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
        <form-checkbox
          :item="findItem(language)"
          :errors="errors"
          property="isActive"
          label="isActive"
          @formUpdated="
            (property, value) =>
              updateTranslatedValue(property, value, language)
          "
        />
      </v-tab-item>
    </v-tabs-items>

    <item-edit-actions :item="item" entity="Text" path="text" />
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'

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
      tab: null
    }
  },
  computed: {
    ...mapGetters({
      errors: 'text/errors'
    }),
    languages() {
      return this.$store.getters['language/items'] || []
    }
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
  },
  created() {
    this.getLanguages()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'text/reset',
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
      this.$store.commit('text/TEXT_UPDATE_ITEM', { [property]: value })
    },
    updateTranslatedValue(property, value, language) {
      this.$store.commit('text/TEXT_UPDATE_ITEM_TRANSLATION', {
        property,
        value,
        language
      })
    }
  }
}
</script>
