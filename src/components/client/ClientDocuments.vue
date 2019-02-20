<template>
  <div class="table-responsive">
    <button class="btn btn-primary" @click="create($event.target)">{{$t('document.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('document.id')}}</th>
        <th>{{$t('document.name')}}</th>
        <th>{{$t('document.createdAt')}}</th>
        <th style="width: 100px;" />
      </tr>
      </thead>
      <tbody>
      <tr v-for="document in documents" :key="document.id">
        <td>
          <router-link v-if="document" :to="{name: 'DocumentShow', params: { id: document.id }}">
            {{ document.id }}
          </router-link>
        </td>
        <td>
          <router-link v-if="document" :to="{name: 'DocumentShow', params: { id: document.id }}">
            {{ document['name'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="document" :to="{name: 'DocumentShow', params: { id: document.id }}">
            {{ moment(document['createdAt']).format('DD-MM-YYYY HH:mm') }}
          </router-link>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-info" @click="edit(document, $event.target)">
              <span class="fa fa-pencil" aria-hidden="true" />
              <span class="sr-only">{{$t('edit')}}</span>
            </button>

            <button class="btn btn-info" @click="deleteItem(document)">
              <span class="fa fa-remove" aria-hidden="true" />
              <span class="sr-only">{{$t('delete')}}</span>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <modal-document-form :modal-edit="modalEdit" @documentCreated="reloadDocuments()" :projects="projects" :show-projects="showProjects"></modal-document-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalDocumentForm from './ModalDocumentForm'

  export default {
    name: 'ClientDocuments',
    components: {ModalDocumentForm},
    props: {
      showProjects: true,
      client: null,
      company: null,
      documents: {
        type: Array,
        default: function () {
          return []
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
        del: 'document/del/del',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s(this.$t('document.deleted', {document: item.name}), this.$t('deleted'))
            this.reloadDocuments()
          })
        }
      },
      create (button) {
        let clients = []
        let companies = []

        if (this.client) {
          clients.push(this.client)
        }

        if (this.company) {
          companies.push(this.company)
        }

        this.modalEdit = {
          title: this.$t('document.add'),
          item: {
            clients: clients,
            companies: companies,
            projects: this.projects,
          },
          url: process.env.API_URL + '/documents',
          method: 'post'
        }

        $('#modal-document-edit').modal('show')
      },
      edit (item, button) {
        let _projects = (item.projects) ? (item.projects) : this.projects
        let projects = []

        // remove nested data for project
        _projects.forEach(project => {
          projects.push({
            id: project.id,
            name: project.name
          })
        })

        item.projects = projects

        this.modalEdit = {
          title: this.$t('document.edit', {document: item.name}),
          item: Object.assign({}, item),
          url: process.env.API_URL + item.id,
          method: 'put'
        }

        $('#modal-document-edit').modal('show')
      },
      reloadDocuments () {
        this.$emit('reloadDocuments')
      }
    }
  }
</script>
