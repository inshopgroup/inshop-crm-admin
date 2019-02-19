<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'value'" :label="'contact.value'" @fieldUpdated="updateValue"></form-input>
    <form-select :item="item" :errors="errors" :property="'contactType'" :option-property="'contact_type'" :label="'address.contactType.name'" @fieldUpdated="updateValue"></form-select>

    <item-edit-actions :item="item" :entity="'Contact'" :path="'contact'"></item-edit-actions>
  </form>
</template>

<script>
  import ItemEditActions from '../layout/ItemEditActions'
  import FormSelect from "../layout/form/FormSelect";
  import FormInput from "../layout/form/FormInput";

  export default {
    components: {
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
        this.$store.commit('contact/CONTACT_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
