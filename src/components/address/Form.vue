<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-select :item="item" :errors="errors" :property="'country'" :option-property="'country'" :label="'address.country.name'" @fieldUpdated="updateValue"></form-select>
    <form-select :item="item" :errors="errors" :property="'city'" :option-property="'city'" :label="'address.city.name'" @fieldUpdated="updateValue"></form-select>
    <form-input :item="item" :errors="errors" :property="'region'" :label="'address.region'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'district'" :label="'address.district'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'postCode'" :label="'address.postCode'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'street'" :label="'address.street'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'building'" :label="'address.building'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'apartment'" :label="'address.apartment'" @fieldUpdated="updateValue"></form-input>
    <form-textarea :item="item" :errors="errors" :property="'comment'" :label="'address.comment'" @fieldUpdated="updateValue"></form-textarea>

    <item-edit-actions :item="item" :entity="'Address'" :path="'address'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import FormSelect from "../layout/form/FormSelect";
import FormInput from "../layout/form/FormInput";
import FormTextarea from "../layout/form/FormTextarea";

export default {
  components: {
    FormTextarea,
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
    },
    errors: {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    updateValue(property, value) {
      this.$store.commit('address/ADDRESS_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
