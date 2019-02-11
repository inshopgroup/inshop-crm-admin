<template>
  <div :class="['form-group', isInvalid() ? 'has-error' : '']">
    <label :for="path" class="form-control-label">{{$t(label)}}</label>

    <v-select
        :multiple="multiple"
        :id="path"
        :value="item[path]"
        :options="options"
        :class="['form-control-select2', isInvalid() ? 'is-invalid' : '']"
        :label="labelField"
        @search="loadOptions"
        @input="$emit('fieldUpdated', property, $event)"
    ></v-select>

    <div v-if="isInvalid()" class="help-block">{{ errors[path] }}</div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import pluralize from "pluralize";

  export default {
    name: 'FormSelectAutocomplete',
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
      searchField: {
        type: String,
        default: 'name'
      },
      labelField: {
        type: String,
        default: 'name'
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
        return this.$store.getters[this.property + '/items'] || []
      },
      path() {
        return this.multiple ? pluralize(this.property) : this.property;
      }
    },
    methods: {
      loadOptions(keyword, loading) {
        loading(true);
        this.search(loading, keyword, this);
      },
      search: _.debounce((loading, keyword, vm) => {
        vm.$store.dispatch('general/loadingAllow', false)
        vm.$store.dispatch(vm.property + '/getItems', '/' + pluralize(vm.optionProperty) + '?' + vm.searchField + '=' + keyword)
        loading(false);
      }, 800),
      isInvalid() {
        return Object.keys(this.errors).length > 0 && this.errors[this.path]
      }
    }
  }
</script>
