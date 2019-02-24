<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'project'"></item-errors>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('project.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'project.name'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'description'" :label="'project.description'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'type'" :option-property="'project_type'" :label="'project.type.name'" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'status'" :option-property="'project_status'" :label="'project.status.name'" @fieldUpdated="updateValue"></form-select>
          <form-select-autocomplete :item="item" :errors="errors" :property="'client'" :option-property="'client'" :label="'project.client.name'" @fieldUpdated="updateValue"></form-select-autocomplete>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('project.tabs.tasks')}}</h3>
        </div>
        <div class="box-body">

          <button class="btn btn-info" @click.prevent="addTask()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{$t('task.add')}}</span>
          </button>

          <table class="table table-striped">
            <thead>
            <tr>
              <th>{{$t('task.name')}}</th>
              <th>{{$t('task.status.name')}}</th>
              <th>{{$t('task.deadline')}}</th>
              <th width="60px;"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in item.tasks" :key="task.id">
              <td>
                <form-input :item="task" :errors="errors" :property="'name'" :label="'task.name'" @fieldUpdated="updateValue"></form-input>
              </td>
              <td>
                <form-select :item="task" :errors="errors" :property="'status'" :option-property="'task_status'" :label="'task.status.name'" @fieldUpdated="updateValue"></form-select>
              </td>
              <td>
                <form-datepicker :item="task" :errors="errors" :property="'deadline'" :label="'task.deadline'" @fieldUpdated="updateValue"></form-datepicker>
              </td>
              <td>
                <button class="btn btn-info" @click.prevent="removeTask(task)">
                  <span class="fa fa-remove" aria-hidden="true" />
                  <span class="sr-only">{{$t('delete')}}</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Project'" :path="'project'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormSelect from "../layout/form/FormSelect";
  import FormSelectAutocomplete from "../layout/form/FormSelectAutocomplete";
  import FormDatepicker from "../layout/form/FormDatepicker";
  import ItemErrors from "../layout/errors/ItemErrors";

  export default {
    components: {ItemErrors, FormDatepicker, FormSelectAutocomplete, FormSelect, FormInput, ItemEditActions},
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
        errors: 'project/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'project/reset'
      }),
      addTask() {
        this.item.tasks.push({uuid: Date.now()})
      },
      removeTask(task) {
        this.item.tasks = this.item.tasks.filter(function (el) {
          if (!task.id) {
            task.id = task.uuid
          }

          return task.id !== el.id;
        })
      },
      updateValue(property, value) {
        this.$store.commit('project/PROJECT_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
