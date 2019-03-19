<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'task'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'task.name'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'description'" :label="'task.description'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'status'" :option-property="'task_status'" :label="'task.status.name'" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'assignee'" :option-property="'user'" :label="'task.assignee.name'" @fieldUpdated="updateValue"></form-select>
          <form-date-picker :item="item" :errors="errors" :property="'deadline'" :label="'task.deadline'" @fieldUpdated="updateValue"></form-date-picker>
          <form-select :item="item" :errors="errors" :property="'project'" :option-property="'project'" :label="'task.project.name'" @fieldUpdated="updateValue"></form-select>
          <form-number :item="item" :errors="errors" :property="'timeEstimated'" :label="'task.timeEstimated'" @fieldUpdated="updateValue"></form-number>
          <form-number :item="item" :errors="errors" :property="'timeSpent'" :label="'task.timeSpent'" @fieldUpdated="updateValue"></form-number>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Task'" :path="'task'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormInput from "../../components/layout/form/FormInput";
  import FormSelect from "../../components/layout/form/FormSelect";
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import FormNumber from "../../components/layout/form/FormNumber";
  import FormDatePicker from "../../components/layout/form/date/FormDatePicker";

  export default {
    components: {FormDatePicker, FormNumber, ItemErrors, FormSelect, FormInput, ItemEditActions},
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
