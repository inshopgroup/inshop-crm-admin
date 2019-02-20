<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'vat.name'" @fieldUpdated="updateValue"></form-input>
    <form-number :item="item" :errors="errors" :property="'value'" :label="'vat.value'" @fieldUpdated="updateValue"></form-number>

    <item-edit-actions :item="item" :entity="'Vat'" :path="'vat'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import FormInput from "../layout/form/FormInput";
import FormNumber from "../layout/form/FormNumber";

export default {
  components: {
    FormNumber,
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
