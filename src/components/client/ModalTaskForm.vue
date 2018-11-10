<template>
<div class="modal fade" id="modal-task-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">

        <div :class="[{ 'has-error': isInvalid('name') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.name')}}:</label>
          <div class="col-sm-10">
            <input
                    id="task_name"
                    v-model="modalEdit.item.name"
                    :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('description') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.description')}}:</label>
          <div class="col-sm-10">
            <input
                    id="task_description"
                    v-model="modalEdit.item.description"
                    :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('status') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.status.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="task_status"
                    v-model="modalEdit.item.status"
                    :options="taskStatuses"
                    :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>

            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('assignee') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.assignee.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="task_assignee"
                    v-model="modalEdit.item.assignee"
                    :options="users"
                    :class="['form-control-select2', isInvalid('assignee') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>

            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('deadline') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.deadline')}}:</label>
          <div :class="[isInvalid('deadline') ? 'has-error col-sm-10' : 'col-sm-10']">
            <datepicker
                    id="task_deadline"
                    v-model="modalEdit.item.deadline"
                    name="deadline"
                    monday-first
            ></datepicker>

            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('project') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.project.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="task_project"
                    v-model="modalEdit.item.project"
                    :options="projects"
                    :class="['form-control-select2', isInvalid('project') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>

            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('timeEstimated') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.timeEstimated')}}:</label>
          <div class="col-sm-10">
            <input
                    id="task_timeEstimated"
                    v-model.number="modalEdit.item.timeEstimated"
                    :class="['form-control', isInvalid('timeEstimated') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.timeEstimated }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('timeSpent') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('task.timeSpent')}}:</label>
          <div class="col-sm-10">
            <input
                    id="task_timeSpent"
                    v-model.number="modalEdit.item.timeSpent"
                    :class="['form-control', isInvalid('timeSpent') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.timeSpent }}</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
        <button type="submit" class="btn btn-primary" @click.prevent.stop="save(modalEdit.item)">{{$t('save')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '../../interceptor'
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'ModalTaskForm',
  components: {Datepicker},
  data () {
    return {
      errors: {}
    }
  },
  props: {
    modalEdit: {
      title: '',
      item: {},
    },
    projects: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  computed: {
    violations () {
      return this.errors || {}
    },

    taskStatuses () {
      return this.$store.getters['task_status/list/items'] || []
    },

    users () {
      return this.$store.getters['user/list/items'] || []
    },
  },

  mounted () {
    this.getTaskStatuses()
    this.getUsers()
  },

  methods: {
    ...mapActions({
      getTaskStatuses: 'task_status/list/default',
      getUsers: 'user/list/default',
    }),

    save (item) {
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('task.saved', {task: item.value}), this.$t('saved'))
          $('#modal-task-edit').modal('hide')
          this.$emit('taskCreated', item)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            let data = e.response.data

            if (data.violations) {
              const errors = {}

              data.violations.map(violation => {
                Object.assign(errors, { [violation.propertyPath]: violation.message })
              })

              this.errors = errors
            } else {
              this.$toastr.e(data['hydra:description'], data['hydra:title']);
            }
          } else {
            this.$toastr.e(e.message, this.$t('error_occurred'))
          }
        })
    },

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
  }
}
</script>
