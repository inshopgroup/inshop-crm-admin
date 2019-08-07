<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="text" />

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li
            v-for="(language, i) in languages"
            :key="'header_' + language.id"
            :class="{ active: i === 0 }"
          >
            <a
              :href="'#' + language.code"
              data-toggle="tab"
              aria-expanded="false"
              >{{ language.name }}</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div
            v-for="(language, i) in languages"
            :id="language.code"
            :key="'content_' + language.id"
            :class="['tab-pane', { active: i === 0 }]"
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
          </div>
        </div>
      </div>

      <item-edit-actions :item="item" entity="Text" path="text" />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

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
      reset: 'text/reset'
    }),
    findItem(language) {
      let translation = {
        language: language
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
        property: property,
        value: value,
        language: language
      })
    },
    ...mapActions({
      getLanguages: 'language/getItems'
    })
  }
}
</script>
