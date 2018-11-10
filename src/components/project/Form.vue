<template>
  <form @submit.prevent="handleSubmit(item)">

    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('project.tabs.general')}}</h3>
        </div>
        <div class="box-body">

          <div class="form-group">
            <label
              for="project_name"
              class="form-control-label">{{$t('project.name')}}</label>
            <input
              id="project_name"
              v-model="item.name"
              :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('name', $event.target.value)">
            <div
              v-if="isInvalid('name')"
              class="invalid-feedback">{{ violations.name }}</div>
          </div>

          <div class="form-group">
            <label
              for="project_description"
              class="form-control-label">{{$t('project.description')}}</label>
            <input
              id="project_description"
              v-model="item.description"
              :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('description', $event.target.value)">
            <div
              v-if="isInvalid('description')"
              class="invalid-feedback">{{ violations.description }}</div>
          </div>

          <div class="form-group">
            <label for="project_status" class="form-control-label">{{$t('project.type.name')}}</label>

            <v-select
                    id="project_type"
                    v-model="item.type"
                    :options="projectTypes"
                    :class="['form-control-select2', isInvalid('type') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>

            <div v-if="isInvalid('type')" class="invalid-feedback">{{ violations.type}}</div>
          </div>

          <div class="form-group">
            <label for="project_status" class="form-control-label">{{$t('project.status.name')}}</label>

            <v-select
                    id="project_status"
                    v-model="item.status"
                    :options="projectStatuses"
                    :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>

            <div v-if="isInvalid('status')" class="invalid-feedback">{{ violations.status }}</div>
          </div>

          <div class="form-group">
            <label
                    for="project_client"
                    class="form-control-label">{{$t('project.client.name')}}</label>

            <v-select
                    id="project_client"
                    v-model="item.client"
                    :options="clients"
                    :class="['form-control-select2', isInvalid('client') ? 'is-invalid' : '']"
                    label="name"
                    @search="loadClients"
            ></v-select>

            <div v-if="isInvalid('client')" class="invalid-feedback">{{ violations.client }}</div>
          </div>


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
                <input
                        id="task_name"
                        v-model="task.name"
                        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                        type="text">
                <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
              </td>
              <td>

                <v-select
                        id="task_status"
                        v-model="task.status"
                        :options="taskStatuses"
                        :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>

                <div v-if="isInvalid('status')" class="invalid-feedback">{{ violations.status }}</div>
              </td>
              <td>

                <datepicker
                        id="task_deadline"
                        v-model="task.deadline"
                        name="deadline"
                        monday-first
                ></datepicker>

                <div v-if="isInvalid('deadline')" class="invalid-feedback">{{ violations.deadline }}</div>
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
    </section>

    <item-edit-actions :item="item" :entity="'Project'" :path="'project'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker';

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
    this.getProjectStatuses()
    this.getProjectTypes()
  },

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    projectStatuses () {
      return this.$store.getters['project_status/list/items'] || []
    },

    projectTypes () {
      return this.$store.getters['project_type/list/items'] || []
    },


    taskStatuses () {
      return this.$store.getters['task_status/list/items'] || []
    },

    ...mapGetters({
      clients: 'client/list/items',
    })
  },

  mounted () {
    this.getTaskStatuses()
  },

  methods: {
    addTask () {
      this.item.tasks.push({uuid: Date.now()})
    },
    removeTask (task) {
      this.item.tasks = this.item.tasks.filter(function(el) {
        if (!task.id) {
          task.id = task.uuid
        }

        return task.id !== el.id;
      })
    },

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    ...mapActions({
      getTaskStatuses: 'task_status/list/default',
      getProjectStatuses: 'project_status/list/default',
      getProjectTypes: 'project_type/list/default',
      getClients: 'client/list/default'
    }),

    loadClients (keyword, loading) {
      loading(true);

      this.search(loading, keyword, this);
    },

    search: _.debounce((loading, keyword, vm) => {
      vm.getClients('/clients?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>
