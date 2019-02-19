<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'user.name'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'username'" :label="'user.email'" @fieldUpdated="updateValue"></form-input>
    <form-password :item="item" :errors="errors" :property="'plainPassword'" :label="'user.password'" @fieldUpdated="updateValue"></form-password>
    <form-select :item="item" :errors="errors" :property="'groups'" :option-property="'group'" :label="'user.groups.name'" :multiple="true" @fieldUpdated="updateValue"></form-select>
    <form-checkbox :item="item" :errors="errors" :property="'isActive'" :label="'user.isActive'" @fieldUpdated="updateValue"></form-checkbox>
    <form-select :item="item" :errors="errors" :property="'language'" :option-property="'language'" :label="'user.language.name'" @fieldUpdated="updateValue"></form-select>

    <item-edit-actions :item="item" :entity="'User'" :path="'user'"></item-edit-actions>
  </form>
</template>

<script>
  import ItemEditActions from '../layout/ItemEditActions'
  import VuePassword from 'vue-password'
  import FormInput from "../layout/form/FormInput";
  import FormPassword from "../layout/form/FormPassword";
  import FormSelect from "../layout/form/FormSelect";
  import FormCheckbox from "../layout/form/FormCheckbox";

  export default {
    components: {FormCheckbox, FormSelect, FormPassword, FormInput, VuePassword, ItemEditActions},
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
        this.$store.commit('user/USER_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
