<template>
  <v-autocomplete
    :value="item[property]"
    :label="$t(label)"
    :items="options"
    :search-input.sync="search"
    :loading="isLoading"
    :item-text="optionLabel"
    :multiple="multiple"
    :error-messages="error"
    return-object
    outlined
    dense
    @input="$emit('formUpdated', property, $event)"
  ></v-autocomplete>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'FormSelectAutocomplete',
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
    optionLabel: {
      type: String,
      default: 'name',
    },
    optionStore: {
      type: String,
      required: true,
    },
    searchField: {
      type: String,
      default: 'name',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      search: null,
    }
  },
  computed: {
    error() {
      return Object.keys(this.errors).length > 0
        ? this.errors[this.property]
        : ''
    },
    options() {
      return this.$store.getters[this.optionStore + '/items'] || []
    },
  },
  watch: {
    search(keyword) {
      this.isLoading = true
      this.load(keyword, this)
    },
  },
  methods: {
    load: debounce((keyword, vm) => {
      vm.$store.dispatch('general/loadingAllow', false)
      vm.$store
        .dispatch(vm.optionStore + '/getItems', {
          [vm.searchField]: keyword,
        })
        .finally(() => {
          vm.isLoading = false
        })
    }, 200),
  },
}
</script>
