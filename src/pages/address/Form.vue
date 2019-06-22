<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="address" />
      <div class="box box-primary">
        <div class="box-body">
          <form-select
            :item="item"
            :errors="errors"
            property="country"
            option-store="country"
            label="country"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="city"
            option-store="city"
            label="city"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="region"
            label="region"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="district"
            label="district"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="postCode"
            label="postCode"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="street"
            label="street"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="building"
            label="building"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="apartment"
            label="apartment"
            @formUpdated="updateValue"
          />
          <form-textarea
            :item="item"
            :errors="errors"
            property="comment"
            label="comment"
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
      <item-edit-actions
        :item="item"
        entity="Address"
        path="address"
        v-if="showActions"
      />
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
