<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="city_name" class="form-control-label">{{$t('city.name')}}</label>
      <input
        id="city_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label for="city_country" class="form-control-label">{{$t('city.country.name')}}</label>

      <v-select
              id="city_country"
              v-model="item.country"
              :options="countries"
              :class="['form-control-select2', isInvalid('country') ? 'is-invalid' : '']"
              label="name"
              @search="loadCountries"
      ></v-select>

      <div v-if="isInvalid('country')" class="invalid-feedback">{{ violations.country }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'City'" :path="'city'"></item-edit-actions>
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

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    countries () {
      return this.$store.getters['country/list/items'] || []
    },
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
    ...mapActions({
      getCountries: 'country/list/default',
    }),

    loadCountries (keyword, loading) {
      loading(true);

      this.search(loading, keyword, this);
    },

    search: _.debounce((loading, keyword, vm) => {
      vm.getCountries('/countries?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>
