<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'address'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-select :item="item" :errors="errors" :property="'country'" :option-property="'country'" :label="'address.country.name'" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'city'" :option-property="'city'" :label="'address.city.name'" @fieldUpdated="updateValue"></form-select>
          <form-input :item="item" :errors="errors" :property="'region'" :label="'address.region'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'district'" :label="'address.district'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'postCode'" :label="'address.postCode'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'street'" :label="'address.street'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'building'" :label="'address.building'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'apartment'" :label="'address.apartment'" @fieldUpdated="updateValue"></form-input>
          <form-textarea :item="item" :errors="errors" :property="'comment'" :label="'address.comment'" @fieldUpdated="updateValue"></form-textarea>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Address'" :path="'address'" v-if="showActions"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormSelect from "../../components/layout/form/FormSelect";
  import ItemErrors from "../../components/layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormSelect,
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
      showActions: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'address/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'address/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('address/ADDRESS_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
