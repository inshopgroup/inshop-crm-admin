<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="task_status" />
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
      <item-edit-actions :item="item" entity="TaskStatus" path="task_status" />
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
      errors: 'task_status/errors',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'task_status/reset',
    }),
    updateValue(property, value) {
      this.$store.commit('task_status/UPDATE_ITEM', {
        [property]: value,
      })
    },
  },
}
</script>
