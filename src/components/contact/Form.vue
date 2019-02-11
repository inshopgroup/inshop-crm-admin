<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="contact_value" class="form-control-label">{{$t('contact.value')}}</label>
      <input
        id="contact_value"
        v-model="item.value"
        :class="['form-control', isInvalid('value') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('value', $event.target.value)">
      <div v-if="isInvalid('value')" class="invalid-feedback">{{ violations.value }}</div>
    </div>


    <div class="form-group">
      <label for="contact_contactType" class="form-control-label">{{$t('address.contactType.name')}}</label>

      <v-select
              id="contact_contactType"
              v-model="item.contactType"
              :options="contactTypes"
              :class="['form-control-select2', isInvalid('contactType') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('contactType')" class="invalid-feedback">{{ violations.contactType }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'Contact'" :path="'contact'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions } from 'vuex'

export default {
  components: {
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

    errors: {
      type: Object,
      default: () => {}
    },


  },

  computed: {
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    contactTypes () {
      return this.$store.getters['contact_type/list/items'] || []
    }
  },

  mounted () {
    this.getContactTypes()
  },

  methods: {
    ...mapActions({
      getContactTypes: 'contact_type/list/default',
    }),

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
  }
}
</script>
