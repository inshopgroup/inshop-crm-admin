<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'channel.name'" @fieldUpdated="updateValue"></form-input>
    <form-select :item="item" :errors="errors" :property="'currency'" :option-property="'currency'" :label="'channel.currency.name'" @fieldUpdated="updateValue"></form-select>

    <item-edit-actions :item="item" :entity="'Channel'" :path="'channel'"></item-edit-actions>
  </form>
</template>

<script>
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormSelect from "../layout/form/FormSelect";

  export default {
    components: {
      FormSelect,
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
        this.$store.commit('channel/CHANNEL_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
