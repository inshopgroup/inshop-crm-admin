<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="project_status" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
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
      <item-edit-actions
        :item="item"
        entity="ProjectStatus"
        path="project_status"
      />
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
      errors: 'project_status/errors',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'project_status/reset',
    }),
    updateValue(property, value) {
      this.$store.commit('project_status/UPDATE_ITEM', {
        [property]: value,
      })
    },
  },
}
</script>
