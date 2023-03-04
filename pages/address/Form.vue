<template>
  <form @submit.prevent="handleSubmit(item)">
    <v-row>
      <item-errors entity="address"></item-errors>

      <v-col cols="12" md="6" sm="6">
        <form-select
          :item="item"
          :errors="errors"
          property="country"
          option-store="country"
          label="country"
          @formUpdated="updateValue"
        ></form-select>
        <form-input
          :item="item"
          :errors="errors"
          property="city"
          label="city"
          @formUpdated="updateValue"
        ></form-input>
        <form-input
          :item="item"
          :errors="errors"
          property="region"
          label="region"
          @formUpdated="updateValue"
        ></form-input>
        <form-input
          :item="item"
          :errors="errors"
          property="district"
          label="district"
          @formUpdated="updateValue"
        ></form-input>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <form-input
          :item="item"
          :errors="errors"
          property="postCode"
          label="postCode"
          @formUpdated="updateValue"
        ></form-input>
        <form-input
          :item="item"
          :errors="errors"
          property="street"
          label="street"
          @formUpdated="updateValue"
        ></form-input>
        <form-input
          :item="item"
          :errors="errors"
          property="building"
          label="building"
          @formUpdated="updateValue"
        ></form-input>
        <form-input
          :item="item"
          :errors="errors"
          property="apartment"
          label="apartment"
          @formUpdated="updateValue"
        ></form-input>
      </v-col>
      <v-col cols="12">
        <form-textarea
          :item="item"
          :errors="errors"
          property="comment"
          label="comment"
          @formUpdated="updateValue"
        ></form-textarea>
      </v-col>
      <v-col cols="12">
        <form-checkbox
          :item="item"
          :errors="errors"
          property="isActive"
          label="isActive"
          @formUpdated="updateValue"
        ></form-checkbox>
      </v-col>

      <v-col v-if="showActions" cols="12">
        <item-edit-actions
          :item="item"
          entity="Address"
          path="address"
        ></item-edit-actions>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ItemEditActions,
  },
  props: {
    handleSubmit: {
      type: Function,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    showActions: {
      type: Boolean,
      default() {
        return true
      },
    },
  },
  computed: {
    ...mapGetters({
      errors: 'address/errors',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'address/reset',
    }),
    updateValue(property, value) {
      this.$store.commit('address/ADDRESS_UPDATE_ITEM', { [property]: value })
    },
  },
}
</script>
