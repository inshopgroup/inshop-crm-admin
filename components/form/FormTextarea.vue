<template>
  <v-textarea
    :value="item[property]"
    :label="$t(label)"
    :error-messages="error"
    outlined
    dense
    @input="$emit('formUpdated', property, $event)"
  ></v-textarea>
</template>

<script>
export default {
  name: 'FormTextarea',
  props: {
    item: {
      type: Object,
      required: true,
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
