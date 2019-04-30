<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'task'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="$t('name')" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'description'" :label="$t('description')" @formUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'status'" :option-store="'task_status'" :label="$t('status_name')" @formUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'assignee'" :option-store="'user'" :label="$t('assignee_name')" @formUpdated="updateValue"></form-select>
          <form-date-picker :item="item" :errors="errors" :property="'deadline'" :label="$t('deadline')" @formUpdated="updateValue"></form-date-picker>
          <form-select :item="item" :errors="errors" :property="'project'" :option-store="'project'" :label="$t('project_name')" @formUpdated="updateValue"></form-select>
          <form-number :item="item" :errors="errors" :property="'timeEstimated'" :label="$t('timeEstimated')" @formUpdated="updateValue"></form-number>
          <form-number :item="item" :errors="errors" :property="'timeSpent'" :label="$t('timeSpent')" @formUpdated="updateValue"></form-number>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Task'" :path="'task'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import ItemErrors from "../../components/layout/errors/ItemErrors";

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
        errors: 'task/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'task/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('task/TASK_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
