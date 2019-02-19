<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'order_line_status.name'" @fieldUpdated="updateValue"></form-input>

    <item-edit-actions :item="item" :entity="'OrderLineStatus'" :path="'order_line_status'"></item-edit-actions>
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
        this.$store.commit('order_line_status/ORDER_LINE_STATUS_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
