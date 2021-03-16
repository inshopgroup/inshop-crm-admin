<template>
  <v-menu
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="value"
        :label="$t(label)"
        :error-messages="error"
        prepend-icon="mdi-calendar"
        readonly
        outlined
        dense
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="value"
      no-title
      scrollable
      @input="updateValue"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'FormDatePicker',
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
    value() {
      return this.crmDateFormat(this.item[this.property], 'YYYY-MM-DD')
    },
    error() {
      return Object.keys(this.errors).length > 0
        ? this.errors[this.property]
        : ''
    },
  },
  methods: {
    updateValue(value) {
      const date = this.$date(value).format('YYYY-MM-DDTHH:mm:ss')
      this.$emit('formUpdated', this.property, date)
    },
  },
}
</script>
