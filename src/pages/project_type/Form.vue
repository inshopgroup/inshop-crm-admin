<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'project_type'"></item-errors>
      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
        </div>
      </div>
      <item-edit-actions :item="item" :entity="'ProjectType'" :path="'project_type'"></item-edit-actions>
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
      errors: 'project_type/errors'
    })
  },
  methods: {
    ...mapActions({
      reset: 'project_type/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('project_type/PROJECT_TYPE_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
