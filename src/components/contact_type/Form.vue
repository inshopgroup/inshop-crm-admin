<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="contact_type_name" class="form-control-label">{{$t('contact_type.name')}}</label>
      <input
        id="contact_type_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'ContactType'" :path="'contact_type'"></item-edit-actions>
  </form>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import fetch from '../../utils/fetch'
import ItemEditActions from '../layout/ItemEditActions'

export default {
  components: {
    vueDropzone, ItemEditActions
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
    }
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
  }
}
</script>
