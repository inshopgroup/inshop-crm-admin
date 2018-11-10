<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="address_country" class="form-control-label">{{$t('address.country.name')}}</label>

      <v-select
              id="address_country"
              v-model="item.country"
              :options="countries"
              :class="['form-control-select2', isInvalid('country') ? 'is-invalid' : '']"
              label="name"
              @search="loadCountries"
      ></v-select>

      <div v-if="isInvalid('country')" class="invalid-feedback">{{ violations.country }}</div>
    </div>


    <div class="form-group">
      <label for="address_city" class="form-control-label">{{$t('address.city.name')}}</label>

      <v-select
              id="address_city"
              v-model="item.city"
              :options="cities"
              :class="['form-control-select2', isInvalid('city') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('city')" class="invalid-feedback">{{ violations.city }}</div>
    </div>


    <div class="form-group">
      <label for="address_region" class="form-control-label">{{$t('address.region')}}</label>
      <input
              id="address_region"
              v-model="item.region"
              :class="['form-control', isInvalid('region') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('region', $event.target.value)">
      <div v-if="isInvalid('region')" class="invalid-feedback">{{ violations.region }}</div>
    </div>

    <div class="form-group">
      <label for="address_district" class="form-control-label">{{$t('address.district')}}</label>
      <input
              id="address_district"
              v-model="item.district"
              :class="['form-control', isInvalid('district') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('district', $event.target.value)">
      <div v-if="isInvalid('district')" class="invalid-feedback">{{ violations.district }}</div>
    </div>

    <div class="form-group">
      <label for="address_postCode" class="form-control-label">{{$t('address.postCode')}}</label>
      <input
              id="address_postCode"
              v-model="item.postCode"
              :class="['form-control', isInvalid('postCode') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('postCode', $event.target.value)">
      <div v-if="isInvalid('postCode')" class="invalid-feedback">{{ violations.postCode }}</div>
    </div>

    <div class="form-group">
      <label for="address_street" class="form-control-label">{{$t('address.street')}}</label>
      <input
              id="address_street"
              v-model="item.street"
              :class="['form-control', isInvalid('street') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('street', $event.target.value)">
      <div v-if="isInvalid('street')" class="invalid-feedback">{{ violations.street }}</div>
    </div>

    <div class="form-group">
      <label for="address_building" class="form-control-label">{{$t('address.building')}}</label>
      <input
              id="address_building"
              v-model="item.building"
              :class="['form-control', isInvalid('building') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('building', $event.target.value)">
      <div v-if="isInvalid('building')" class="invalid-feedback">{{ violations.building }}</div>
    </div>

    <div class="form-group">
      <label for="address_apartment" class="form-control-label">{{$t('address.apartment')}}</label>
      <input
              id="address_apartment"
              v-model="item.apartment"
              :class="['form-control', isInvalid('apartment') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('apartment', $event.target.value)">
      <div v-if="isInvalid('apartment')" class="invalid-feedback">{{ violations.apartment }}</div>
    </div>

    <div class="form-group">
      <label for="address_comment" class="form-control-label">{{$t('address.comment')}}</label>
      <textarea
              id="address_comment"
              v-model="item.comment"
              :class="['form-control', isInvalid('comment') ? 'is-invalid' : '']"
              placeholder=""
              @input="handleUpdateField('comment', $event.target.value)">
      </textarea>
      <div v-if="isInvalid('comment')" class="invalid-feedback">{{ violations.comment }}</div>
    </div>
    

    <item-edit-actions :item="item" :entity="'Address'" :path="'address'"></item-edit-actions>
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
    cities () {
      if (this.item && this.item.country) {
        return this.item.country.cities
      }

      return []
    },

    countries () {
      return this.$store.getters['country/list/items'] || []
    },

    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
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
      vm.item.city = null
      loading(false);
    }, 350)
  }
}
</script>
