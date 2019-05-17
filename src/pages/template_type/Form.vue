<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'template_type'"></item-errors>
      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
        </div>
      </div>
      <item-edit-actions :item="item" :entity="'TemplateType'" :path="'template_type'"></item-edit-actions>
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
      errors: 'template_type/errors'
    })
  },
  methods: {
    ...mapActions({
      reset: 'template_type/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('template_type/TEMPLATE_TYPE_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
