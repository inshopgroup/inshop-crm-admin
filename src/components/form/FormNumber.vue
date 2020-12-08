<template>
  <form-input
    type="number"
    :item="item"
    :property="property"
    :label="label"
    :errors="errors"
    @formUpdated="formUpdated"
  ></form-input>
</template>

<script>
export default {
  name: 'FormNumber',
  props: {
    item: {
      type: Object,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    formUpdated(property, value) {
      this.$emit('formUpdated', property, parseFloat(value))
    }
  }
}
</script>
