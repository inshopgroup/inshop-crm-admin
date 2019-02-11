<template>
  <div :class="['form-group', isInvalid() ? 'has-error' : '']">
    <label :for="property" class="form-control-label">{{$t(label)}}</label>
    <textarea
        :id="property"
        :value="item[property]"
        :class="['form-control', isInvalid() ? 'is-invalid' : '']"
        rows="5"
        @input="$emit('fieldUpdated', property, $event.target.value)"
    ></textarea>
    <div v-if="isInvalid()" class="help-block">{{ errors[property] }}</div>
  </div>
</template>

<script>
  export default {
    name: 'FormTextarea',
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
