<template>
  <div :class="['form-group', isInvalid() ? 'has-error' : '']">
    <label :for="path" class="form-control-label">{{$t(label)}}</label>

    <v-select
        :multiple="multiple"
        :id="path"
        :value="item[path]"
        :options="options"
        :class="['form-control-select2', isInvalid() ? 'is-invalid' : '']"
        label="name"
        @input="$emit('fieldUpdated', property, $event)"
    ></v-select>

    <div v-if="isInvalid()" class="help-block">{{ errors[path] }}</div>
  </div>
</template>

<script>
  import pluralize from "pluralize";

  export default {
    name: 'FormSelect',
    props: {
      multiple: {
        type: Boolean,
        default: () => false
      },
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
        required: true
      },
      optionProperty: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: null
      }
    },
    computed: {
      options() {
        return this.$store.getters[this.optionProperty + '/items'] || []
      },
      path() {
        return this.multiple ? pluralize(this.property) : this.property;
      }
    },
    mounted() {
      this.getOptions()
    },
    methods: {
      getOptions() {
        this.$store.dispatch(this.optionProperty + '/getItems')
      },
      isInvalid() {
        return Object.keys(this.errors).length > 0 && this.errors[this.path]
      }
    }
  }
</script>
