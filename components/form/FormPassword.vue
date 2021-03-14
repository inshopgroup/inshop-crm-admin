<template>
  <v-text-field
    :value="item[property]"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    :error-messages="$t(error)"
    :placeholder="placeholder"
    dense
    :label="$t(label)"
    outlined
    autocomplete="new-password"
    @click:append="show = !show"
    @input="$emit('formUpdated', property, $event)"
  >
  </v-text-field>
</template>

<script>
export default {
  name: 'FormPassword',
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
    placeholder: {
      type: String,
      default: null,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      show: false,
    }
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
