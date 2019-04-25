<template>
  <div :class="['inshop-form', isInvalid ? 'is-invalid' : '']">
    <label :for="fieldId"><span v-if="required">* </span>{{ label }}</label>

    <field-select
        :id="fieldId"
        :item="item"
        :property="property"
        :options="options"
        :label="optionLabel"
        :multiple="multiple"
        @fieldUpdated="(property, event) => {$emit('formUpdated', property, event)}"
        @loadOptions="loadOptions"
    ></field-select>

    <div v-if="isInvalid" class="inshop-errors">{{ errors[property] }}</div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce'
  // import FieldSelect from "../field/FieldSelect";
  // import "../../sass/styles.scss"

  export default {
    name: 'FormSelectAutocomplete',
    // components: {FieldSelect},
    props: {
      id: {
        type: String,
        default: null
      },
      item: {
        type: Object,
        required: true
      },
      property: {
        type: String,
        required: true
      },
      optionLabel: {
        type: String,
        default: 'name'
      },
      optionStore: {
        type: String,
        required: true
      },
      searchField: {
        type: String,
        default: 'name'
      },
      multiple: {
        type: Boolean,
        default: false
      },
      errors: {
        type: Object,
        default: () => {}
      },
      label: {
        type: String,
        default: null
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      options() {
        if (this.$store) {
          return this.$store.getters[this.optionStore + '/items'] || []
        }

        return []
      },
      fieldId() {
        return this.id || this.property
      },
      isInvalid() {
        return Object.keys(this.errors).length > 0 && this.errors[this.property]
      }
    },
    methods: {
      loadOptions(keyword, loading) {
        loading(true);
        this.search(loading, keyword, this);
      },
      search: debounce((loading, keyword, vm) => {
        vm.$store.dispatch('general/loadingAllow', false)
        vm.$store.dispatch(vm.storePath + '/getItems', {
          [vm.searchField]: keyword
        })
        loading(false);
      }, 800),
    }
  }
</script>