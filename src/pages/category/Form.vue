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
        property="parent"
        option-store="category"
        label="parent_name"
        @formUpdated="updateValue"
      />
      <form-number
        :item="item"
        :errors="errors"
        property="position"
        label="position"
        @formUpdated="updateValue"
      />
      <form-checkbox
        :item="item"
        :errors="errors"
        property="isActive"
        label="isActive"
        @formUpdated="updateValue"
      />
    </div>

    <item-edit-actions :item="item" entity="Category" path="category" />
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
      errors: 'category/errors'
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
    // }
  },
  created() {
    this.getLanguages()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'category/reset',
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
      this.$store.commit('category/CATEGORY_UPDATE_ITEM', { [property]: value })
    },
    updateTranslatedValue(property, value, language) {
      this.$store.commit('category/CATEGORY_UPDATE_ITEM_TRANSLATION', {
        property,
        value,
        language
      })
    }
  }
}
</script>
