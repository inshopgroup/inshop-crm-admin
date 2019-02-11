<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="vat_name" class="form-control-label">{{$t('vat.name')}}</label>
      <input
        id="vat_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label for="vat_value" class="form-control-label">{{$t('vat.value')}}</label>
      <input
        id="vat_value"
        v-model.number="item.value"
        :class="['form-control', isInvalid('value') ? 'is-invalid' : '']"
        type="number"
        step="0.1"
        placeholder=""
      >
      <div v-if="isInvalid('value')" class="invalid-feedback">{{ violations.value }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'Vat'" :path="'vat'"></item-edit-actions>
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



    item: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },


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
