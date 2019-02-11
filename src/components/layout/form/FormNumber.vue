<template>
  <div :class="['form-group', isInvalid() ? 'has-error' : '']">
    <label :for="property" class="form-control-label">{{$t(label)}}</label>
    <input
        :id="property"
        :value="item[property]"
        type="number"
        :class="['form-control', isInvalid() ? 'is-invalid' : '']"
        @input="$emit('fieldUpdated', property, parseFloat($event.target.value))"
    />
    <div v-if="isInvalid()" class="help-block">{{ errors[property] }}</div>
  </div>
</template>

<script>
  export default {
    name: 'FormNumber',
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
