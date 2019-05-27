<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="orderLineStatus" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
            @formUpdated="updateValue"
          />
        </div>
      </div>
      <item-edit-actions
        :item="item"
        entity="OrderLineStatus"
        path="orderLineStatus"
      />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from "../../components/layout/errors/ItemErrors"

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
      errors: 'orderLineStatus/errors'
    })
  },
  methods: {
    ...mapActions({
      reset: 'orderLineStatus/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('orderLineStatus/ORDER_LINE_STATUS_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
