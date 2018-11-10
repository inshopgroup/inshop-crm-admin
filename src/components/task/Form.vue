<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="task_name" class="form-control-label">{{$t('task.name')}}</label>
      <input
        id="task_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label for="task_description" class="form-control-label">{{$t('task.description')}}</label>
      <input
        id="task_description"
        v-model="item.description"
        :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('description', $event.target.value)">
      <div v-if="isInvalid('description')" class="invalid-feedback">{{ violations.description }}</div>
    </div>

    <div class="form-group">
      <label for="task_status" class="form-control-label">{{$t('task.status.name')}}</label>

      <v-select
              id="task_status"
              v-model="item.status"
              :options="taskStatuses"
              :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('status')" class="invalid-feedback">{{ violations.status }}</div>
    </div>

    <div class="form-group">
      <label for="task_assignee" class="form-control-label">{{$t('task.assignee.name')}}</label>

      <v-select
              id="task_assignee"
              v-model="item.assignee"
              :options="users"
              :class="['form-control-select2', isInvalid('assignee') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('assignee')" class="invalid-feedback">{{ violations.assignee }}</div>
    </div>

    <div class="form-group" :class="[isInvalid('deadline') ? 'has-error' : '']">
      <label for="task_deadline" class="form-control-label">{{$t('task.deadline')}}</label>

      <datepicker
          id="task_deadline"
          v-model="item.deadline"
          name="deadline"
          monday-first
      ></datepicker>

      <div v-if="isInvalid('deadline')" class="invalid-feedback">{{ violations.deadline }}</div>
    </div>

    <div class="form-group">
      <label for="task_project" class="form-control-label">{{$t('task.project.name')}}</label>

      <v-select
              id="task_project"
              v-model="item.project"
              :options="projects"
              :class="['form-control-select2', isInvalid('project') ? 'is-invalid' : '']"
              label="name"
              @search="loadProjects"
      ></v-select>

      <div v-if="isInvalid('project')" class="invalid-feedback">{{ violations.project }}</div>
    </div>

    <div class="form-group">
      <label for="event_timeEstimated" class="form-control-label">{{$t('event.timeEstimated')}}</label>

      <input
              id="event_timeEstimated"
              v-model.number="item.timeEstimated"
              :class="['form-control', isInvalid('timeEstimated') ? 'is-invalid' : '']"
              type="text"
      >

      <div v-if="isInvalid('timeEstimated')" class="invalid-feedback">{{ violations.timeEstimated}}</div>
    </div>

    <div class="form-group">
      <label for="event_timeSpent" class="form-control-label">{{$t('event.timeSpent')}}</label>

      <input
              id="event_timeSpent"
              v-model.number="item.timeSpent"
              :class="['form-control', isInvalid('timeSpent') ? 'is-invalid' : '']"
              type="text"
      >

      <div v-if="isInvalid('timeSpent')" class="invalid-feedback">{{ violations.timeSpent}}</div>
    </div>

    <item-edit-actions :item="item" :entity="'Task'" :path="'task'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker';
import lodash from 'lodash'

export default {
  components: { ItemEditActions, Datepicker },
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  created () {
    this.getTaskStatuses()
    this.getUsers()
  },

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    taskStatuses () {
      return this.$store.getters['task_status/list/items'] || []
    },

    users () {
      return this.$store.getters['user/list/items'] || []
    },

    ...mapGetters({
      projects: 'project/list/items',
    }),
  },

  methods: {
    ...mapActions({
      getTaskStatuses: 'task_status/list/default',
      getUsers: 'user/list/default',
      getProjects: 'project/list/default'
    }),
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
    loadProjects (keyword, loading) {
      loading(true);

      this.search(loading, keyword, this);
    },

    search: _.debounce((loading, keyword, vm) => {
      vm.getProjects('/projects?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>
