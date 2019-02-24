<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'order_line_status'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'order_line_status.name'" @fieldUpdated="updateValue"></form-input>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'OrderLineStatus'" :path="'order_line_status'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import ItemErrors from "../layout/errors/ItemErrors";

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
        errors: 'order_line_status/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'order_line_status/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('order_line_status/ORDER_LINE_STATUS_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
