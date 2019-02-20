<template>
  <div class="table-responsive">
    <button class="btn btn-primary" @click="create($event.target)">{{$t('project.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">{{$t('project.id')}}</th>
          <th>{{$t('project.name')}}</th>
          <th>{{$t('project.description')}}</th>
          <th>{{$t('project.status.name')}}</th>
          <th>{{$t('project.type.name')}}</th>
          <th>{{$t('project.createdAt')}}</th>
          <th style="width: 100px;" />
        </tr>
      </thead>
      <tbody>
        <template v-for="project in projects">
          <tr :key="project['id']">
            <td>
              <router-link v-if="project" :to="{name: 'ProjectShow', params: { id: project['id'] }}">
                {{ project['id'] }}
              </router-link>
            </td>
            <td>
              <router-link v-if="project" :to="{name: 'ProjectShow', params: { id: project['id'] }}">
                {{ project['name'] }}
              </router-link>
            </td>
            <td>
              <router-link v-if="project" :to="{name: 'ProjectShow', params: { id: project['id'] }}">
                {{ project['description'] }}
              </router-link>
            </td>
            <td>
              <router-link v-if="project && project['status']" :to="{name: 'ProjectShow', params: { id: project['id'] }}">
                {{ project['status']['name'] }}
              </router-link>
            </td>
            <td>
              <router-link v-if="project && project['type']" :to="{name: 'ProjectShow', params: { id: project['id'] }}">
                {{ project['type']['name'] }}
              </router-link>
            </td>
            <td>
              <router-link v-if="project" :to="{name: 'ProjectShow', params: { id: project['id'] }}">
                {{ moment(project['createdAt']).format('DD-MM-YYYY HH:mm') }}
              </router-link>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button class="btn btn-info" @click="edit(project, $event.target)">
                  <span class="fa fa-pencil" aria-hidden="true" />
                  <span class="sr-only">{{$t('edit')}}</span>
                </button>

                <button class="btn btn-info" @click="deleteItem(project)">
                  <span class="fa fa-remove" aria-hidden="true" />
                  <span class="sr-only">{{$t('delete')}}</span>
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <modal-project-form :modal-edit="modalEdit" @projectCreated="reloadProjects()"></modal-project-form>

  </div>
</template>

<script>
  import ModalProjectForm from './ModalProjectForm'
  import { mapActions } from 'vuex'

  export default {
    components: {ModalProjectForm},
    name: 'ClientProjects',
    props: {
      client: {
        type: Object,
        default: function () {
          return {}
        }
      },
      projects: {
        type: Array,
        default: function () {
          return []
        }
      }
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
    methods: {
      ...mapActions({
        del: 'project/del/del',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s(this.$t('project.deleted', {project: item.name}), this.$t('deleted'))
            this.reloadProjects()
          })
        }
      },
      create (button) {
        this.modalEdit = {
          title: this.$t('project.add'),
          item: {
            client: this.client
          },
          url: process.env.API_URL + '/projects',
          method: 'post'
        }

        $('#modal-project-edit').modal('show')
      },
      edit (item, button) {
        // remove nested data for project
        item.tasks.forEach((task, index) => {
          task.project = {
            id: task.project.id,
            name: task.project.name
          }
        })

        this.modalEdit = {
          title: this.$t('project.edit', {project: item.name}),
          item: item,
          url: process.env.API_URL + item.id,
          method: 'put'
        }

        $('#modal-project-edit').modal('show')
      },
      reloadProjects () {
        this.$emit('reloadProjects')
      }
    }
  }
</script>
