<template>
  <form @submit.prevent="handleSubmit(item)">
    <v-layout wrap>
      <v-flex xs12 px-2>
        <item-errors entity="contact" />
      </v-flex>

      <v-flex xs12 px-2>
        <form-input
          :item="item"
          :errors="errors"
          property="value"
          label="value"
          @formUpdated="updateValue"
        />
        <form-select
          :item="item"
          :errors="errors"
          property="contactType"
          option-store="contactType"
          label="contactType_name"
          @formUpdated="updateValue"
        />
        <form-checkbox
          :item="item"
          :errors="errors"
          property="isActive"
          label="isActive"
          @formUpdated="updateValue"
        />
      </v-flex>

      <item-edit-actions
        v-if="showActions"
        :item="item"
        entity="Contact"
        path="contact"
      />
    </v-layout>
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
      default() {
        return true
      }
    }
  },
  computed: {
    ...mapGetters({
      errors: 'contact/errors'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'contact/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('contact/CONTACT_UPDATE_ITEM', { [property]: value })
    }
  }
}
</script>
