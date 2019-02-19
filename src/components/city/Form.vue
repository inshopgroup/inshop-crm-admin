<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'city.name'" @fieldUpdated="updateValue"></form-input>
    <form-select-autocomplete :item="item" :errors="errors" :property="'country'" :option-property="'country'" :label="'city.country.name'" @fieldUpdated="updateValue"></form-select-autocomplete>

    <item-edit-actions :item="item" :entity="'City'" :path="'city'"></item-edit-actions>
  </form>
</template>

<script>
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormSelectAutocomplete from "../layout/form/FormSelectAutocomplete";

  export default {
    components: {
      FormSelectAutocomplete,
      FormInput,
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
      },
    },
    methods: {
      updateValue(property, value) {
        this.$store.commit('city/CITY_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
