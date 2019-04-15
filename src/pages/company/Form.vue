<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'company'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'company.name'" @fieldUpdated="updateValue"></form-input>
          <form-number :item="item" :errors="errors" :property="'code'" :label="'company.code'" @fieldUpdated="updateValue"></form-number>
          <form-input :item="item" :errors="errors" :property="'fullName'" :label="'company.fullName'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'contactPerson'" :label="'company.contactPerson'" @fieldUpdated="updateValue"></form-input>
          <form-textarea :item="item" :errors="errors" :property="'description'" :label="'company.description'" @fieldUpdated="updateValue"></form-textarea>
          <form-textarea :item="item" :errors="errors" :property="'comment'" :label="'company.comment'" @fieldUpdated="updateValue"></form-textarea>
          <form-input :item="item" :errors="errors" :property="'bankName'" :label="'company.bankName'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'bankAccountNumber'" :label="'company.bankAccountNumber'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'krs'" :label="'company.krs'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'nip'" :label="'company.nip'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'clients'" :option-property="'client'" :label="'company.clients'" :multiple="true" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'labels'" :option-property="'label'" :label="'company.labels.id'" :multiple="true" @fieldUpdated="updateValue"></form-select>
          <form-checkbox :item="item" :errors="errors" :property="'isVat'" :label="'company.isVat'" @fieldUpdated="updateValue"></form-checkbox>
          <form-textarea :item="item" :errors="errors" :property="'vatComment'" :label="'company.vatComment'" @fieldUpdated="updateValue"></form-textarea>
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
