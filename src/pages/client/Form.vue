<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="client" />
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">
            {{ $t('tabs_general') }}
          </h3>
        </div>
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="username"
            label="email"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="name"
            label="name"
            @formUpdated="updateValue"
          />
          <form-textarea
            :item="item"
            :errors="errors"
            property="description"
            label="description"
            @formUpdated="updateValue"
          />
          <form-select
            :item="item"
            :errors="errors"
            property="labels"
            option-store="label"
            label="labels_id"
            :multiple="true"
            @formUpdated="updateValue"
          />
          <form-checkbox
            :item="item"
            :errors="errors"
            property="isActive"
            label="isActive"
            @formUpdated="updateValue"
          />
        </div>
      </div>
      <!--<div class="box box-primary">-->
      <!--<div class="box-header with-border">-->
      <!--<h3 class="box-title">{{$t('tabs_contacts')}}</h3>-->
      <!--</div>-->
      <!--<div class="box-body">-->

      <!--<button class="btn btn-info" @click.prevent="addContact()">-->
      <!--<span class="fa fa-plus" aria-hidden="true" />-->
      <!--<span>{{$t('contact_add')}}</span>-->
      <!--</button>-->

      <!--<table class="table table-striped">-->
      <!--<thead>-->
      <!--<tr>-->
      <!--<th>{{$t('contact_value')}}</th>-->
      <!--<th>{{$t('contactType_name')}}</th>-->
      <!--<th width="60px;"></th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody>-->
      <!--<tr v-for="contact in item.contacts" :key="contact.id">-->
      <!--<td>-->
      <!--<form-input :item="contact" :errors="errors" property="value" label="contact.value" @formUpdated="updateValue"></form-input>-->
      <!--</td>-->
      <!--<td>-->
      <!--<form-select :item="contact" :errors="errors" property="contactType" option-store="contactType'" :label="contact.contactType" @formUpdated="updateValue"></form-select>-->
      <!--</td>-->
      <!--<td>-->
      <!--<button class="btn btn-info" @click.prevent="removeContact(contact)">-->
      <!--<span class="fa fa-remove" aria-hidden="true" />-->
      <!--<span class="sr-only">{{$t('delete')}}</span>-->
      <!--</button>-->
      <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--</table>-->
      <!--</div>-->
      <!--</div>-->

      <!--<div class="box box-primary">-->
      <!--<div class="box-header with-border">-->
      <!--<h3 class="box-title">{{$t('tabs_projects')}}</h3>-->
      <!--</div>-->
      <!--<div class="box-body">-->

      <!--<button class="btn btn-info" @click.prevent="addProject()">-->
      <!--<span class="fa fa-plus" aria-hidden="true" />-->
      <!--<span>{{$t('project_add')}}</span>-->
      <!--</button>-->

      <!--<table class="table table-striped">-->
      <!--<thead>-->
      <!--<tr>-->
      <!--<th>{{$t('name')}}</th>-->
      <!--<th>{{$t('type_name')}}</th>-->
      <!--<th>{{$t('status_name')}}</th>-->
      <!--<th width="60px;"></th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody>-->
      <!--<tr v-for="project in item.projects" :key="project.id">-->
      <!--<td>-->
      <!--<form-input :item="project" :errors="errors" property="name" label="project.name" @formUpdated="updateValue"></form-input>-->
      <!--</td>-->
      <!--<td>-->
      <!--<form-select :item="project" :errors="errors" property="type" option-store="projectType" label="project.type" @formUpdated="updateValue"></form-select>-->
      <!--</td>-->
      <!--<td>-->
      <!--<form-select :item="project" :errors="errors" property="status" option-store="projectStatus" label="project.status" @formUpdated="updateValue"></form-select>-->
      <!--</td>-->
      <!--<td>-->
      <!--<button class="btn btn-info" @click.prevent="removeProject(project)">-->
      <!--<span class="fa fa-remove" aria-hidden="true" />-->
      <!--<span class="sr-only">{{$t('delete')}}</span>-->
      <!--</button>-->
      <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--</table>-->
      <!--</div>-->
      <!--</div>-->
      <item-edit-actions :item="item" entity="Client" path="client" />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ItemEditActions
  },
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
  computed: {
    ...mapGetters({
      errors: 'client/errors'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'client/reset'
    }),
    // addContact () {
    //   this.item.contacts.push({
    //     uuid: Date.now(),
    //   })
    // },
    // removeContact (contact) {
    //   this.item.contacts = this.item.contacts.filter(function(el) {
    //     if (!contact.id) {
    //       contact.id = contact.uuid
    //     }
    //
    //     return contact.id !== el.id;
    //   })
    // },
    //
    // addProject () {
    //   this.item.projects.push({uuid: Date.now()})
    // },
    // removeProject (project) {
    //   this.item.projects = this.item.projects.filter(function(el) {
    //     if (!project.id) {
    //       project.id = project.uuid
    //     }
    //
    //     return project.id !== el.id;
    //   })
    // },
    updateValue(property, value) {
      this.$store.commit('client/CLIENT_UPDATE_ITEM', { [property]: value })
    }
  }
}
</script>
