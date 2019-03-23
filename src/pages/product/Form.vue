<template>
  <form @submit.prevent="handleSubmit">
    <section class="content">
      <item-errors :entity="'product'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li :class="{active: i === 0}" v-for="(language, i) in languages" :key="'header_' + language.id">
            <a :href="'#' + language.code" data-toggle="tab" aria-expanded="false">{{language.name}}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div :class="['tab-pane', {active: i === 0}]" :id="language.code" v-for="(language, i) in languages" :key="'content_' + language.id">
            <form-input :item="findItem(language)" :errors="errors" :property="'name'" :label="'product.name'" @fieldUpdated="(property, value) => {updateTranslatedValue(property, value, language)}"></form-input>
            <form-textarea :item="findItem(language)" :errors="errors" :property="'description'" :label="'product.description'" @fieldUpdated="(property, value) => {updateTranslatedValue(property, value, language)}"></form-textarea>
          </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-body">
          <form-select :item="item" :errors="errors" :property="'brand'" :option-property="'brand'" :label="'product.brand.name'" @fieldUpdated="updateValue"></form-select>
          <form-input :item="item" :errors="errors" :property="'ean'" :label="'product.ean'" @fieldUpdated="updateValue"></form-input>
          <form-select-autocomplete :item="item" :errors="errors" :property="'category'" :option-property="'category'" :label="'product.category.name'" @fieldUpdated="updateValue"></form-select-autocomplete>
          <form-input :item="item" :errors="errors" :property="'video'" :label="'product.video'" @fieldUpdated="updateValue"></form-input>
          <form-files :item="item" itemProperty="images" formProperty="image" route="images" :multiple="true" label="images"></form-files>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Product'" :path="'product'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormSelect from "../../components/layout/form/FormSelect";
  import FormInput from "../../components/layout/form/FormInput";
  import FormSelectAutocomplete from "../../components/layout/form/FormSelectAutocomplete";
  import FormTextarea from "../../components/layout/form/FormTextarea";
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import FormFiles from "../../components/layout/form/FormFiles";

  export default {
    components: {
      FormFiles,
      ItemErrors,
      FormTextarea,
      FormSelectAutocomplete,
      FormInput,
      FormSelect,
      ItemEditActions,
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
      updateTranslatedValue(property, value, language) {
        this.$store.commit('product/PRODUCT_UPDATE_ITEM_TRANSLATION', {
          property: property,
          value: value,
          language: language,
        })
      },
      ...mapActions({
        getLanguages: 'language/getItems',
      }),
    }
  }
</script>
