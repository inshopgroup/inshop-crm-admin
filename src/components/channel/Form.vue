<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="channel_name" class="form-control-label">{{$t('channel.name')}}</label>
      <input
        id="channel_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label for="channel_currency" class="form-control-label">{{$t('channel.currency.name')}}</label>

      <v-select
              id="channel_currency"
              v-model="item.currency"
              :options="currencies"
              :class="['form-control-select2', isInvalid('currency') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('currency')" class="invalid-feedback">{{ violations.currency }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'Channel'" :path="'channel'"></item-edit-actions>
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

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    currencies () {
      return this.$store.getters['currency/list/items'] || []
    },
  },

  created () {
    this.getCurrencies()
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    ...mapActions({
      getCurrencies: 'currency/list/default',
    }),
  }
}
</script>
