<template>
  <div :class="[isInvalid ? 'is-invalid' : '']">
    <div v-if="isInvalid" class="inshop-errors">{{ errors[property] }}</div>

    <v-text-field
      :value="item[property]"
      :label="$t(label)"
      :type="type"
      outlined
      dense
      @input="$emit('formUpdated', property, $event)"
    ></v-text-field>
  </div>
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
    isInvalid() {
      return Object.keys(this.errors).length > 0 && this.errors[this.property]
    }
  }
}
</script>
<style>
.inshop-errors {
  color: red;
}
.is-invalid fieldset {
  border: 1px solid red !important;
}
</style>
