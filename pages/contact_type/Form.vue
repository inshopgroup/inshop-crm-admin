<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="contactType"></item-errors>
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
            @formUpdated="updateValue"
          ></form-input>
          <form-checkbox
            :item="item"
            :errors="errors"
            property="isActive"
            label="isActive"
            @formUpdated="updateValue"
          ></form-checkbox>
        </div>
      </div>
      <item-edit-actions
        :item="item"
        entity="ContactType"
        path="contact_type"
      ></item-edit-actions>
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
  computed: {
    ...mapGetters({
      errors: 'contactType/errors',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'contactType/reset',
    }),
    updateValue(property, value) {
      this.$store.commit('contactType/CONTACT_TYPE_UPDATE_ITEM', {
        [property]: value,
      })
    },
  },
}
</script>
