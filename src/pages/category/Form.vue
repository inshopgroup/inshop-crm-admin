<template>
  <form @submit.prevent="updateTranslations">
    <section class="content">
      <item-errors :entity="'category'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li :class="{active: i === 0}" v-for="(translation, i) in translations" :key="translation.language.id">
            <a :href="'#' + translation.language.code" data-toggle="tab" aria-expanded="false">{{translation.language.name}}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div :class="['tab-pane', {active: i === 0}]" :id="translation.language.code" v-for="(translation, i) in translations" :key="translation.language.id">
            <form-input :item="translation" :errors="errors" :property="'name'" :label="'category.name'" @fieldUpdated="updateValue"></form-input>
            <form-input :item="translation" :errors="errors" :property="'description'" :label="'category.description'" @fieldUpdated="updateValue"></form-input>
          </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-body">
          <form-select :item="item" :errors="errors" :property="'parent'" :option-property="'category'" :label="'category.parent.name'" @fieldUpdated="updateValue"></form-select>
          <form-number :item="item" :errors="errors" :property="'position'" :label="'category.position'" @fieldUpdated="updateValue"></form-number>
          <form-checkbox :item="item" :errors="errors" :property="'isActive'" :label="'category.isActive'" @fieldUpdated="updateValue"></form-checkbox>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Category'" :path="'category'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import {mapActions, mapGetters} from 'vuex'
  import FormSelect from "../../components/layout/form/FormSelect";
  import FormInput from "../../components/layout/form/FormInput";
  import FormCheckbox from "../../components/layout/form/FormCheckbox";
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import FormNumber from "../../components/layout/form/FormNumber";

  export default {
    components: {
      FormNumber,
      ItemErrors,
      FormCheckbox,
      FormInput,
      FormSelect,
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
        errors: 'category/errors',
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
    },
    created() {
      this.getLanguages()
    },
    methods: {
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
        this.$store.commit('category/CATEGORY_UPDATE_ITEM', {[property]: value})
      },
      ...mapActions({
        getLanguages: 'language/getItems',
      }),
    }
  }
</script>
