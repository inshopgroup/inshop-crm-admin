<template>
  <v-checkbox
    :input-value="item[property]"
    :label="$t(label)"
    :error-messages="error"
    outlined
    :hide-details="hideDetails"
    @click="$emit('formUpdated', property, !item[property])"
  ></v-checkbox>
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: {
    item: {
      type: Object,
      required: true,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    property: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    error() {
      return Object.keys(this.errors).length > 0
        ? this.errors[this.property]
        : ''
    },
  },
}
</script>
