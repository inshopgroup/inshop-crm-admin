<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'vat.name'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'value'" :label="'vat.value'" @fieldUpdated="updateValue"></form-input>

    <item-edit-actions :item="item" :entity="'Vat'" :path="'vat'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import FormInput from "../layout/form/FormInput";

export default {
  components: {
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
      this.$store.commit('vat/VAT_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
