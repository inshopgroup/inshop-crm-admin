<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="currency_name" class="form-control-label">{{$t('currency.name')}}</label>
      <input
        id="currency_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>
    
    <div class="form-group">
      <label for="currency_code" class="form-control-label">{{$t('currency.code')}}</label>
      <input
        id="currency_code"
        v-model="item.code"
        :class="['form-control', isInvalid('code') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('code', $event.target.value)">
      <div v-if="isInvalid('code')" class="invalid-feedback">{{ violations.code }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'Currency'" :path="'currency'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'

export default {
  components: {
    ItemEditActions
  },

  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
