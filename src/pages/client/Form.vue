<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'client'"></item-errors>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('client.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'client.name'" @fieldUpdated="updateValue"></form-input>
          <form-textarea :item="item" :errors="errors" :property="'description'" :label="'client.description'" @fieldUpdated="updateValue"></form-textarea>
          <form-select :item="item" :errors="errors" :property="'clients'" :option-property="'client'" :label="'client.clients'" :multiple="true" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'companies'" :option-property="'company'" :label="'client.companies'" :multiple="true" @fieldUpdated="updateValue"></form-select>
        </div>
      </div>

      <!--<div class="box box-primary">-->
        <!--<div class="box-header with-border">-->
          <!--<h3 class="box-title">{{$t('client.tabs.contacts')}}</h3>-->
        <!--</div>-->
        <!--<div class="box-body">-->

          <!--<button class="btn btn-info" @click.prevent="addContact()">-->
            <!--<span class="fa fa-plus" aria-hidden="true" />-->
            <!--<span>{{$t('contact.add')}}</span>-->
          <!--</button>-->

          <!--<table class="table table-striped">-->
            <!--<thead>-->
              <!--<tr>-->
                <!--<th>{{$t('contact.value')}}</th>-->
                <!--<th>{{$t('contact.contactType.name')}}</th>-->
                <!--<th width="60px;"></th>-->
              <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
              <!--<tr v-for="contact in item.contacts" :key="contact.id">-->
                <!--<td>-->
                  <!--<form-input :item="contact" :errors="errors" :property="'value'" :label="'contact.value'" @fieldUpdated="updateValue"></form-input>-->
                <!--</td>-->
                <!--<td>-->
                  <!--<form-select :item="contact" :errors="errors" :property="'contactType'" :option-property="'contactType'" :label="'contact.contactType'" @fieldUpdated="updateValue"></form-select>-->
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
          <!--<h3 class="box-title">{{$t('client.tabs.projects')}}</h3>-->
        <!--</div>-->
        <!--<div class="box-body">-->

          <!--<button class="btn btn-info" @click.prevent="addProject()">-->
            <!--<span class="fa fa-plus" aria-hidden="true" />-->
            <!--<span>{{$t('project.add')}}</span>-->
          <!--</button>-->

          <!--<table class="table table-striped">-->
            <!--<thead>-->
              <!--<tr>-->
                <!--<th>{{$t('project.name')}}</th>-->
                <!--<th>{{$t('project.type.name')}}</th>-->
                <!--<th>{{$t('project.status.name')}}</th>-->
                <!--<th width="60px;"></th>-->
              <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
              <!--<tr v-for="project in item.projects" :key="project.id">-->
                <!--<td>-->
                  <!--<form-input :item="project" :errors="errors" :property="'name'" :label="'project.name'" @fieldUpdated="updateValue"></form-input>-->
                <!--</td>-->
                <!--<td>-->
                  <!--<form-select :item="project" :errors="errors" :property="'type'" :option-property="'project_type'" :label="'project.type'" @fieldUpdated="updateValue"></form-select>-->
                <!--</td>-->
                <!--<td>-->
                  <!--<form-select :item="project" :errors="errors" :property="'status'" :option-property="'project_status'" :label="'project.status'" @fieldUpdated="updateValue"></form-select>-->
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

      <item-edit-actions :item="item" :entity="'Client'" :path="'client'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
import FormSelect from "../../components/layout/form/FormSelect";
import ItemErrors from "../../components/layout/errors/ItemErrors";

export default {
  components: {
    ItemErrors,
    FormSelect,
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
  beforeDestroy () {
    this.reset()
  },
  computed: {
    ...mapGetters({
      errors: 'client/errors'
    })
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
      this.$store.commit('client/CLIENT_UPDATE_ITEM', {[property]: value})
    },
  }
}
</script>
