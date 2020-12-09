<template>
  <v-text-field
    :value="item[property]"
    :label="$t(label)"
    :type="type"
    :error-messages="error"
    outlined
    dense
    @input="$emit('formUpdated', property, $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: 'FormInput',
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
  computed: {
    error() {
      return Object.keys(this.errors).length > 0 ? this.errors[this.property] : ''
    }
  }
}
</script>
