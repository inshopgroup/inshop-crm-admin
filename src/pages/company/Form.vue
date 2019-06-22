<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="company" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="fullName"
            label="fullName"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="contactPerson"
            label="contactPerson"
            @formUpdated="updateValue"
          />
          <form-textarea
            :item="item"
            :errors="errors"
            property="description"
            label="description"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="bankName"
            label="bankName"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="bankAccountNumber"
            label="bankAccountNumber"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="krs"
            label="krs"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="nip"
            label="nip"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="labels"
            option-store="label"
            label="labels_id"
            :multiple="true"
            @formUpdated="updateValue"
          />
          <form-checkbox
            :item="item"
            :errors="errors"
            property="isVat"
            label="isVat"
            @formUpdated="updateValue"
          />
          <form-textarea
            :item="item"
            :errors="errors"
            property="vatComment"
            label="vatComment"
            @formUpdated="updateValue"
          />
          <form-checkbox
            :item="item"
            :errors="errors"
            property="isActive"
            label="isActive"
            @formUpdated="updateValue"
          />
        </div>
      </div>
      <item-edit-actions :item="item" entity="Company" path="company" />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
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
    }
  },
  computed: {
    ...mapGetters({
      errors: 'company/errors'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'company/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('company/COMPANY_UPDATE_ITEM', { [property]: value })
    }
  }
}
</script>
