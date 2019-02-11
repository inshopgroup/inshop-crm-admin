<template>
  <div :class="['form-group', isInvalid() ? 'has-error' : '']" style="width: 400px;">
    <label :for="property" class="form-control-label">{{$t(label)}}</label>

    <vue-password
        :id="property"
        :value="item[property]"
        :classes="['form-control', isInvalid() ? 'is-invalid' : '']"
        :user-inputs="[item.username]"
        @input="$emit('fieldUpdated', property, $event)"
    ></vue-password>

    <div v-if="isInvalid()" class="help-block">{{ errors[property] }}</div>
  </div>
</template>

<script>
  import VuePassword from 'vue-password'

  export default {
    name: 'FormPassword',
    components: {VuePassword},
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
