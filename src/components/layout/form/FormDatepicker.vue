<template>
  <div :class="['form-group', isInvalid() ? 'has-error' : '']">
    <label :for="property" class="form-control-label">{{$t(label)}}</label>

    <datepicker
        :id="property"
        :value="item[property]"
        :class="[isInvalid() ? 'is-invalid' : '']"
        monday-first
        @input="$emit('fieldUpdated', property, $event)"
    ></datepicker>

    <div v-if="isInvalid()" class="help-block">{{ errors[property] }}</div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: 'FormDatepicker',
    components: {Datepicker},
    props: {
      item: {
        type: Object,
        default: () => {}
      },
      errors: {
        type: Object,
        default: () => {}
      },
      property: {
        type: String,
        default: null
      },
      label: {
        type: String,
        default: null
      }
    },
    methods: {
      isInvalid() {
        return Object.keys(this.errors).length > 0 && this.errors[this.property]
      }
    }
  }
</script>
