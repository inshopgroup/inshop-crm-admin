<template>
  <div :class="[isInvalid ? 'is-invalid' : '']">
    <div v-if="isInvalid" class="inshop-errors">{{ errors[property] }}</div>
    <v-menu
      :close-on-content-click="true"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="value"
          :label="$t(label)"
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
  </div>
</template>

<script>
import fecha from 'fecha'

export default {
  name: 'FormDatePicker',
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
    },
    value() {
      return this.crmDateFormat(this.item[this.property], 'YYYY-MM-DD')
    }
  },
  methods: {
    updateValue(value) {
      const date = fecha.format(fecha.parse(value, 'YYYY-MM-DD'), 'YYYY-MM-DDTHH:mm:ss')
      this.$emit('formUpdated', this.property, date)
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
