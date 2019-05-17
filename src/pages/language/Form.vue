<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'language'"></item-errors>
      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'code'" label="code" @formUpdated="updateValue"></form-input>
        </div>
      </div>
      <item-edit-actions :item="item" :entity="'Language'" :path="'language'"></item-edit-actions>
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
      errors: 'language/errors'
    })
  },
  methods: {
    ...mapActions({
      reset: 'language/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('language/LANGUAGE_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
