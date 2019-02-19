<template>
  <form @submit.prevent="handleSubmit(item)">
    <form-input :item="item" :errors="errors" :property="'name'" :label="'task.name'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'description'" :label="'task.description'" @fieldUpdated="updateValue"></form-input>
    <form-select :item="item" :errors="errors" :property="'status'" :option-property="'task_status'" :label="'task.status.name'" @fieldUpdated="updateValue"></form-select>
    <form-select :item="item" :errors="errors" :property="'assignee'" :option-property="'user'" :label="'task.assignee.name'" @fieldUpdated="updateValue"></form-select>
    <form-datepicker :item="item" :errors="errors" :property="'deadline'" :label="'task.deadline'" @fieldUpdated="updateValue"></form-datepicker>
    <form-select :item="item" :errors="errors" :property="'project'" :option-property="'project'" :label="'task.project.name'" @fieldUpdated="updateValue"></form-select>
    <form-input :item="item" :errors="errors" :property="'timeEstimated'" :label="'task.timeEstimated'" @fieldUpdated="updateValue"></form-input>
    <form-input :item="item" :errors="errors" :property="'timeSpent'" :label="'task.timeSpent'" @fieldUpdated="updateValue"></form-input>

    <item-edit-actions :item="item" :entity="'Task'" :path="'task'"></item-edit-actions>
  </form>
</template>

<script>
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormSelect from "../layout/form/FormSelect";
  import FormDatepicker from "../layout/form/FormDatepicker";

  export default {
    components: {FormDatepicker, FormSelect, FormInput, ItemEditActions},
    props: {
      handleSubmit: {
        type: Function,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      errors: {
        type: Object,
        default: () => {}
      },
    },
    methods: {
      updateValue(property, value) {
        this.$store.commit('task/TASK_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
