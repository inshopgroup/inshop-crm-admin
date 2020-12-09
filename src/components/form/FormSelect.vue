<template>
  <v-select
    :value="item[property]"
    :label="$t(label)"
    :items="options"
    :item-text="optionLabel"
    :multiple="multiple"
    :error-messages="error"
    return-object
    outlined
    dense
    @input="$emit('formUpdated', property, $event)"
  ></v-select>
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
    error() {
      return Object.keys(this.errors).length > 0 ? this.errors[this.property] : ''
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
