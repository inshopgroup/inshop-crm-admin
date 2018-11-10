<template>
  <form @submit.prevent="updateTranslations">
    <div class="form-group">
      <label for="category_parent" class="form-control-label">{{$t('category.parent.name')}}</label>

      <v-select
              id="category_parent"
              v-model="item.parent"
              :options="parents"
              :class="['form-control-select2', isInvalid('parent') ? 'is-invalid' : '']"
              label="name"
              @search="loadParents"
      ></v-select>

      <div v-if="isInvalid('parent')" class="invalid-feedback">{{ violations.parent }}</div>
    </div>


    <div class="form-check" style="margin-bottom: 20px;">
      <input
              id="category_isActive"
              v-model="item.isActive"
              :class="['form-check-input', isInvalid('isActive') ? 'is-invalid' : '']"
              type="checkbox"
              placeholder=""
              @input="handleUpdateField('isActive', $event.target.value)">

      <label for="category_isActive" class="form-check-label">{{$t('category.isActive')}}</label>

      <div
              v-if="isInvalid('isActive')"
              class="invalid-feedback">{{ violations.isActive }}</div>
    </div>

    <div class="form-group">
      <label for="category_position" class="form-control-label">{{$t('category.position')}}</label>
      <input
              id="category_position"
              v-model.number="item.position"
              :class="['form-control', isInvalid('position') ? 'is-invalid' : '']"
              type="number"
              step="1">
      <div v-if="isInvalid('position')" class="invalid-feedback">{{ violations.position }}</div>
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
            <label for="category_name" class="form-control-label">{{$t('category.name')}}</label>
            <input
                    id="category_name"
                    v-model="translation.name"
                    :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                    type="text"
            >
            <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
          </div>

          <div class="form-group">
            <label for="category_description" class="form-control-label">{{$t('category.description')}}</label>
            <textarea
                    id="category_description"
                    v-model="translation.description"
                    :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
            ></textarea>
            <div v-if="isInvalid('description')" class="invalid-feedback">{{ violations.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <item-edit-actions :item="item" :entity="'Category'" :path="'category'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions } from 'vuex'

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

    parents () {
      return (this.$store.getters['category/list/items'] || []).filter(category => {
        return category.id !== this.item.id
      })
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
      getLanguages: 'language/list/default',
    }),

    loadParents (keyword, loading) {
      loading(true);

      this.search(loading, keyword, this);
    },

    search: _.debounce((loading, keyword, vm) => {
      vm.getCategories('/categories?translations.name=' + keyword)
      vm.item.city = null
      loading(false);
    }, 350)
  }
}
</script>
