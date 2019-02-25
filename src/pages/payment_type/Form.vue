<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'payment_type'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'payment_type.name'" @fieldUpdated="updateValue"></form-input>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'PaymentType'" :path="'payment_type'"></item-edit-actions>
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
      errors: 'payment_type/errors'
    })
  },
  methods: {
    ...mapActions({
      reset: 'payment_type/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('payment_type/PAYMENT_TYPE_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
