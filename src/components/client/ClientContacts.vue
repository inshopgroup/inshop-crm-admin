<template>
  <div class="table-responsive">
    <section class="content-header hidden show-print">
      <h1>{{$t('company.tabs.contacts')}}</h1>
    </section>

    <button class="btn btn-primary hidden-print" @click="create($event.target)">{{$t('contact.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">{{$t('contact.id')}}</th>
          <th>{{$t('contact.value')}}</th>
          <th>{{$t('contact.contactType.name')}}</th>
          <th class="hidden-print" style="width: 100px;" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <router-link v-if="contact" :to="{name: 'ClientShow', params: { id: contact.id }}">
              {{ contact.id }}
            </router-link>
          </td>
          <td>
            <router-link v-if="contact" :to="{name: 'ClientShow', params: { id: contact.id }}">
              {{ contact['value'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="contact.contactType" :to="{name: 'ClientShow', params: { id: contact.id }}">
              {{ contact['contactType']['name'] }}
            </router-link>
          </td>
          <td class="hidden-print">
            <div class="btn-group" role="group">
              <button class="btn btn-info" @click="edit(contact, $event.target)">
                <span class="fa fa-pencil" aria-hidden="true" />
                <span class="sr-only">{{$t('edit')}}</span>
              </button>

              <button class="btn btn-info" @click="deleteItem(contact)">
                <span class="fa fa-remove" aria-hidden="true" />
                <span class="sr-only">{{$t('delete')}}</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <modal-contact-form :modal-edit="modalEdit" @contactCreated="reloadContacts()"></modal-contact-form>
  </div>
</template>

<script>
  import ModalContactForm from './ModalContactForm'
  import { mapActions } from 'vuex'

  export default {
    name: 'ClientContacts',
    components: {ModalContactForm},
    props: {
      client: null,
      company: null,
      contacts: {
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
          // url: null,
          // method: null
        }
      }
    },
    methods: {
      ...mapActions({
        del: 'contact/remove',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s(
              this.$t('contact.deleted', {entity: item.value}),
              this.$t('deleted')
            )
            this.reloadContacts()
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
          title: this.$t('contact.add'),
          item: {
            clients: clients,
            companies: companies
          },
          // url: process.env.API_URL + '/contacts',
          // method: 'post'
        }

        $('#modal-contact-edit').modal('show')
      },
      edit (item, button) {
        this.modalEdit = {
          title: this.$t('contact.edit', {entity: item.value}),
          item: item,
          // url: process.env.API_URL + item.id,
          // method: 'put'
        }

        $('#modal-contact-edit').modal('show')
      },
      reloadContacts () {
        this.$emit('reloadContacts')
      }
    }
  }
</script>
