<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'company.name'" @fieldUpdated="updateValue"></form-input>
    <form-number :item="item" :errors="errors" :property="'code'" :label="'company.code'" @fieldUpdated="updateValue"></form-number>
    <form-input :item="item" :errors="errors" :property="'fullName'" :label="'company.fullName'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'contactPerson'" :label="'company.contactPerson'" @fieldUpdated="updateValue"></form-input>
    <form-textarea :item="item" :errors="errors" :property="'description'" :label="'company.description'" @fieldUpdated="updateValue"></form-textarea>
    <form-textarea :item="item" :errors="errors" :property="'comment'" :label="'company.comment'" @fieldUpdated="updateValue"></form-textarea>
    <form-input :item="item" :errors="errors" :property="'bankName'" :label="'company.bankName'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'bankAccountNumber'" :label="'company.bankAccountNumber'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'krs'" :label="'company.krs'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'nip'" :label="'company.nip'" @fieldUpdated="updateValue"></form-input>
    <form-select :item="item" :errors="errors" :property="'clients'" :option-property="'client'" :label="'company.clients'" :multiple="true" @fieldUpdated="updateValue"></form-select>
    <form-select :item="item" :errors="errors" :property="'labels'" :option-property="'label'" :label="'company.labels'" :multiple="true" @fieldUpdated="updateValue"></form-select>
    <form-checkbox :item="item" :errors="errors" :property="'isVat'" :label="'company.isVat'" @fieldUpdated="updateValue"></form-checkbox>
    <form-textarea :item="item" :errors="errors" :property="'vatComment'" :label="'company.vatComment'" @fieldUpdated="updateValue"></form-textarea>

    <item-edit-actions :item="item" :entity="'Company'" :path="'company'"></item-edit-actions>
  </form>
</template>

<script>
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormNumber from "../layout/form/FormNumber";
  import FormTextarea from "../layout/form/FormTextarea";
  import FormSelect from "../layout/form/FormSelect";
  import FormCheckbox from "../layout/form/FormCheckbox";

  export default {
    components: {FormCheckbox, FormSelect, FormTextarea, FormNumber, FormInput, ItemEditActions},
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
        this.$store.commit('company/COMPANY_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
