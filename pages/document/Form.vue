<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="document" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="client"
            option-store="client"
            label="client"
            :multiple="false"
            @formUpdated="updateValue"
          />
          <form-file
            :axios="$axios"
            :errors="errors"
            :item="item"
            property="files"
            form-property="file"
            :route="route"
            :multiple="true"
            label="files"
            @formFileUploaded="formFileUploaded"
            @formFileDeleted="formFileDeleted"
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
      <item-edit-actions :item="item" entity="Document" path="document" />
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
  },
  data() {
    return {
      route: `${process.env.NUXT_ENV_API_URL}/files`,
    }
  },
  computed: {
    ...mapGetters({
      errors: 'document/errors',
    }),
    authHeader() {
      return `Bearer ${this.$store.state.auth.token}`
    },
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'document/reset',
    }),
    updateValue(property, value) {
      this.$store.commit('document/UPDATE_ITEM', { [property]: value })
    },
    formFileUploaded(file) {
      this.$store.commit('document/ADD_FILE', file)
    },
    formFileDeleted(value) {
      this.$store.commit('document/DELETE_FILE', value)
    },
  },
}
</script>
