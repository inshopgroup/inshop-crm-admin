<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('client.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <div class="form-group">
            <label for="client_name" class="form-control-label">{{$t('client.name')}}</label>
            <input
              id="client_name"
              v-model="item.name"
              :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
              type="text">
            <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
          </div>

          <div class="form-group">
            <label for="client_description" class="form-control-label">{{$t('client.description')}}</label>
            <input
              id="client_description"
              v-model="item.description"
              :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
              type="text">
            <div v-if="isInvalid('description')" class="invalid-feedback">{{ violations.description }}</div>
          </div>

          <div class="form-group">
            <label for="client_clients" class="form-control-label">{{$t('client.clients')}}</label>

            <v-select
              multiple
              id="client_clients"
              v-model="item.clients"
              :options="clients"
              label="name"
              @search="loadClients"
            ></v-select>

            <div v-if="isInvalid('clients')" class="invalid-feedback">{{ violations.clients }}</div>
          </div>

          <div class="form-group">
            <label for="client_companies" class="form-control-label">{{$t('client.companies')}}</label>

            <v-select
              multiple
              id="client_companies"
              v-model="item.companies"
              :options="companies"
              label="name"
              @search="loadCompanies"
            ></v-select>

            <div v-if="isInvalid('companies')" class="invalid-feedback">{{ violations.companies }}</div>
          </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('client.tabs.contacts')}}</h3>
        </div>
        <div class="box-body">

          <button class="btn btn-info" @click.prevent="addContact()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{$t('contact.add')}}</span>
          </button>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>{{$t('contact.value')}}</th>
                <th>{{$t('contact.contactType.name')}}</th>
                <th width="60px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contact in item.contacts" :key="contact.id">
                <td>
                  <input
                          id="contact_value"
                          v-model="contact.value"
                          :class="['form-control', isInvalid('value') ? 'is-invalid' : '']"
                          type="text">
                  <div v-if="isInvalid('value')" class="invalid-feedback">{{ violations.value }}</div>
                </td>
                <td>
                  <v-select
                          id="contact_contactType"
                          v-model="contact.contactType"
                          :options="contactTypes"
                          :class="['form-control-select2', isInvalid('contactType') ? 'is-invalid' : '']"
                          label="name"
                  ></v-select>
                  <div v-if="isInvalid('contactType')" class="invalid-feedback">{{ violations.contactType }}</div>
                </td>
                <td>
                  <button class="btn btn-info" @click.prevent="removeContact(contact)">
                    <span class="fa fa-remove" aria-hidden="true" />
                    <span class="sr-only">{{$t('delete')}}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('client.tabs.projects')}}</h3>
        </div>
        <div class="box-body">

          <button class="btn btn-info" @click.prevent="addProject()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{$t('project.add')}}</span>
          </button>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>{{$t('project.name')}}</th>
                <th>{{$t('project.type.name')}}</th>
                <th>{{$t('project.status.name')}}</th>
                <th width="60px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in item.projects" :key="project.id">
                <td>
                  <input
                          id="project_name"
                          v-model="project.name"
                          :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                          type="text">
                  <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
                </td>
                <td>

                  <v-select
                          id="project_type"
                          v-model="project.type"
                          :options="projectTypes"
                          :class="['form-control-select2', isInvalid('type') ? 'is-invalid' : '']"
                          label="name"
                  ></v-select>

                  <div v-if="isInvalid('type')" class="invalid-feedback">{{ violations.type}}</div>
                </td>
                <td>
                  <v-select
                          id="project_status"
                          v-model="project.status"
                          :options="projectStatuses"
                          :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                          label="name"
                  ></v-select>

                  <div v-if="isInvalid('status')" class="invalid-feedback">{{ violations.status }}</div>
                </td>
                <td>
                  <button class="btn btn-info" @click.prevent="removeProject(project)">
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

    <item-edit-actions :item="item" :entity="'Client'" :path="'client'"></item-edit-actions>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../layout/ItemEditActions'
import lodash from 'lodash'

export default {
  components: { ItemEditActions },
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

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    ...mapGetters({
      clients: 'client/list/items',
      companies: 'company/list/items'
    }),

    contactTypes () {
      return this.$store.getters['contact_type/list/items'] || []
    },

    projectTypes () {
      return this.$store.getters['project_type/list/items'] || []
    },

    projectStatuses () {
      return this.$store.getters['project_status/list/items'] || []
    },
  },

  mounted () {
    this.getContactTypes()
    this.getProjectTypes()
    this.getProjectStatuses()
  },

  methods: {
    addContact () {
      this.item.contacts.push({
        uuid: Date.now(),
      })
    },
    removeContact (contact) {
      this.item.contacts = this.item.contacts.filter(function(el) {
        if (!contact.id) {
          contact.id = contact.uuid
        }

        return contact.id !== el.id;
      })
    },

    addProject () {
      this.item.projects.push({uuid: Date.now()})
    },
    removeProject (project) {
      this.item.projects = this.item.projects.filter(function(el) {
        if (!project.id) {
          project.id = project.uuid
        }

        return project.id !== el.id;
      })
    },

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
    ...mapActions({
      getContactTypes: 'contact_type/list/default',
      getProjectTypes: 'project_type/list/default',
      getProjectStatuses: 'project_status/list/default',
      getClients: 'client/list/default',
      getCompanies: 'company/list/default'
    }),

    loadClients (keyword, loading) {
      loading(true);

      this.searchClients(loading, keyword, this);
    },

    loadCompanies (keyword, loading) {
      loading(true);

      this.searchCompanies(loading, keyword, this);
    },

    searchClients: _.debounce((loading, keyword, vm) => {
      vm.getClients('/clients?name=' + keyword)
      loading(false);
    }, 350),

    searchCompanies: _.debounce((loading, keyword, vm) => {
      vm.getCompanies('/companies?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>
