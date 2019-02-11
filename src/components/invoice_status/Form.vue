<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="invoice_status_name" class="form-control-label">{{$t('invoice_status.name')}}</label>
      <input
        id="invoice_status_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'InvoiceStatus'" :path="'invoice_status'"></item-edit-actions>
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
