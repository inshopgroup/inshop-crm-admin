<template>
  <div :class="['form-check', isInvalid() ? 'has-error' : '']" style="margin-bottom: 20px;">
    <input
        :id="property"
        :checked="item[property]"
        :class="['form-check-input', isInvalid('isActive') ? 'is-invalid' : '']"
        type="checkbox"
        @input="$emit('fieldUpdated', property, $event.target.checked)"
    />
    <label :for="property" class="form-control-label">{{$t(label)}}</label>
    <div v-if="isInvalid()" class="help-block">{{ errors[property] }}</div>
  </div>
</template>

<script>
  export default {
    name: 'FormCheckbox',
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
