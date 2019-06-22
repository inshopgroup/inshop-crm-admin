<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="project" />
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">
            {{ $t('tabs_general') }}
          </h3>
        </div>
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
            property="description"
            label="description"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="type"
            option-store="projectType"
            label="type_name"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="status"
            option-store="projectStatus"
            label="status_name"
            @formUpdated="updateValue"
          />
          <form-select-autocomplete
            :item="item"
            :errors="errors"
            property="client"
            option-store="client"
            label="client_name"
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
      <item-edit-actions :item="item" entity="Project" path="project" />
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
      errors: 'project/errors'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'project/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('project/PROJECT_UPDATE_ITEM', { [property]: value })
    }
  }
}
</script>
