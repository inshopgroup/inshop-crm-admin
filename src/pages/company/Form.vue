<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'company'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'fullName'" label="fullName" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'contactPerson'" label="contactPerson" @formUpdated="updateValue"></form-input>
          <form-textarea :item="item" :errors="errors" :property="'description'" label="description" @formUpdated="updateValue"></form-textarea>
          <form-input :item="item" :errors="errors" :property="'bankName'" label="bankName" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'bankAccountNumber'" label="bankAccountNumber" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'krs'" label="krs" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'nip'" label="nip" @formUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'labels'" :option-store="'label'" label="labels_id" :multiple="true" @formUpdated="updateValue"></form-select>
          <form-checkbox :item="item" :errors="errors" :property="'isVat'" label="isVat" @formUpdated="updateValue"></form-checkbox>
          <form-textarea :item="item" :errors="errors" :property="'vatComment'" label="vatComment" @formUpdated="updateValue"></form-textarea>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Company'" :path="'company'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import ItemErrors from "../../components/layout/errors/ItemErrors";

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
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'company/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'company/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('company/COMPANY_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
