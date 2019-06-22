<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="user" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="username"
            label="email"
            @formUpdated="updateValue"
          />
          <form-password
            :item="item"
            :errors="errors"
            property="plainPassword"
            label="password"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="groups"
            option-store="group"
            label="groups_name"
            :multiple="true"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="language"
            option-store="language"
            label="language_name"
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
      <item-edit-actions :item="item" entity="User" path="user" />
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
    }
  },
  computed: {
    ...mapGetters({
      errors: 'user/errors'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'user/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('user/USER_UPDATE_ITEM', { [property]: value })
    }
  }
}
</script>
