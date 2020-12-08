<template>
  <div :class="[isInvalid ? 'is-invalid' : '']">
    <div v-if="isInvalid" class="inshop-errors">{{ errors[property] }}</div>

    <v-checkbox
      :input-value="item[property]"
      :label="$t(label)"
      outlined
      @click="$emit('formUpdated', property, !item[property])"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  name: 'FormCheckbox',
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
