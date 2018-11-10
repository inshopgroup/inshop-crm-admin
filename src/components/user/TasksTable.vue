<template>
  <div class="table-responsive">
    <button class="btn btn-primary" @click="create($event.target)">{{$t('task.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">{{$t('task.id')}}</th>
          <th>{{$t('task.name')}}</th>
          <th v-if="showProject">{{$t('task.project.name')}}</th>
          <th>{{$t('task.assignee.name')}}</th>
          <th>{{$t('task.status.name')}}</th>
          <th>{{$t('task.deadline')}}</th>
          <th>{{$t('task.timeEstimated')}}</th>
          <th>{{$t('task.timeSpent')}}</th>
          <th>{{$t('task.createdAt')}}</th>
          <th style="width: 100px;" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task['@id']">
          <td>
            <router-link v-if="task" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ task['id'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ task['name'] }}
            </router-link>
          </td>
          <td v-if="showProject">
            <router-link v-if="task['project']" :to="{name: 'ProjectShow', params: { id: task['project']['@id'] }}">
              {{ task['project']['name'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task['assignee']" :to="{name: 'UserShow', params: { id: task['assignee']['@id'] }}">
              {{ task['assignee']['name'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task['status']" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ task['status']['name'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ moment(task['deadline']).format('DD-MM-YYYY') }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ task['timeEstimated'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ task['timeSpent'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="task" :to="{name: 'TaskShow', params: { id: task['@id'] }}">
              {{ moment(task['createdAt']).format('DD-MM-YYYY HH:mm') }}
            </router-link>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button class="btn btn-info" @click="edit(task, $event.target)">
                <span class="fa fa-pencil" aria-hidden="true" />
                <span class="sr-only">{{$t('edit')}}</span>
              </button>

              <button class="btn btn-info" @click="deleteItem(task)">
                <span class="fa fa-remove" aria-hidden="true" />
                <span class="sr-only">{{$t('task.delete')}}</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="col-xs-6">
      <div class="table-responsive">
        <table class="table">
          <tbody>
          <tr>
            <th style="width:50%">{{$t('task.timeEstimated')}}:</th>
            <td>{{totalTimeEstimated}}</td>
          </tr>
          <tr>
            <th>{{$t('task.timeSpent')}}:</th>
            <td>{{totalTimeSpent}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal-task-form :modal-edit="modalEdit" @taskCreated="reloadProject()" :projects="projects"></modal-task-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalTaskForm from '../client/ModalTaskForm'

  export default {
    name: 'ProjectTasksTable',
    components: {ModalTaskForm},
    props: {
      projects: {
        type: Array,
        default: function () {
          return []
        }
      },
      tasks: {
        type: Array,
        default: function () {
          return []
        }
      },
      showProject: false
    },
    data () {
      return {
        modalEdit: {
          title: null,
          item: {},
          url: null,
          method: null
        }
      }
    },
    computed: {
      totalTimeEstimated () {
        let total = 0;

        this.tasks.forEach(task => {
          total += task.timeEstimated
        })

        return total;
      },
      totalTimeSpent() {
        let total = 0;

        this.tasks.forEach(task => {
          total += task.timeSpent
        })

        return total;
      }
    },
    methods: {
      ...mapActions({
        del: 'task/del/del',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s('Task "' + item.name + '" successfully deleted', this.$t('deleted'))
            this.reloadProject()
          })
        }
      },
      create (button) {
        this.modalEdit = {
          title: `Add task`,
          item: {
            project: this.projects[0]
          },
          url: process.env.API_URL + '/tasks',
          method: 'post'
        }

        $('#modal-task-edit').modal('show')
      },
      edit (item, button) {
        let _project = (item.project) ? (item.project) : this.projects[0]

        // remove nested data for project
        item.project = {
          id: _project.id,
          name: _project.name
        }

        this.modalEdit = {
          title: `Edit task : ${item.name}`,
          item: item,
          url: process.env.API_URL + item['@id'],
          method: 'put'
        }

        $('#modal-task-edit').modal('show')
      },
      reloadProject () {
        this.$emit('reloadProject')
      }
    }
  }
</script>
