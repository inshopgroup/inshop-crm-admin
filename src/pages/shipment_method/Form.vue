<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'shipment_method'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'shipment_method.name'" @fieldUpdated="updateValue"></form-input>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'ShipmentMethod'" :path="'shipment_method'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormInput from "../../components/layout/form/FormInput";
  import ItemErrors from "../../components/layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormInput,
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
        errors: 'shipment_status/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'shipment_status/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('shipment_status/SHIPMENT_STATUS_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
