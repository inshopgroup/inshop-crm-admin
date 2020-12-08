<template>
  <div :class="[isInvalid ? 'is-invalid' : '']">
    <div v-if="isInvalid" class="inshop-errors">{{ errors[property] }}</div>

    <v-select
      :value="item[property]"
      :label="$t(label)"
      :items="options"
      :item-text="optionLabel"
      :multiple="multiple"
      return-object
      outlined
      dense
      @input="$emit('formUpdated', property, $event)"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
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
    },
    optionLabel: {
      type: String,
      default: 'name'
    },
    optionStore: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    isInvalid() {
      return Object.keys(this.errors).length > 0 && this.errors[this.property]
    },
    options() {
      if (this.$store) {
        return this.$store.getters[this.optionStore + '/items'] || []
      }

      return []
    },
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      if (this.$store) {
        this.$store.dispatch(this.optionStore + '/getItems')
      }
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
