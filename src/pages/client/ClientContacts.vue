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
            <router-link v-if="contact" :to="{name: 'ContactShow', params: { id: contact.id }}">
              {{ contact.id }}
            </router-link>
          </td>
          <td>
            <router-link v-if="contact" :to="{name: 'ContactShow', params: { id: contact.id }}">
              {{ contact['value'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="contact.contactType" :to="{name: 'ContactShow', params: { id: contact.id }}">
              {{ contact.contactType.name }}
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

    <modal-contact-form :callback="callback" :title="title" :item="item" @contactsChanged="$emit('contactsChanged')"></modal-contact-form>
  </div>
</template>

<script>
  import ModalContactForm from './ModalContactForm'
  import { mapActions } from 'vuex'

  export default {
    components: {ModalContactForm},
    props: {
      parent: {
        type: Object,
        required: true
      },
      contacts: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        title: '',
        item: {},
        callback: () => {}
      }
    },
    methods: {
      ...mapActions({
        remove: 'contact/remove',
        updateItem: 'contact/update',
        createItem: 'contact/create',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.remove(item).then(() => {
            this.$toastr.s(
              this.$t('contact.deleted', {entity: item.value}),
              this.$t('deleted')
            )

            this.$emit('contactsChanged')
          })
        }
      },
      create (button) {
        this.$store.commit('contact/CONTACT_SET_ITEM', this.parent)

        this.title = this.$t('contact.add')
        this.item = this.$store.getters['contact/item']
        this.callback = this.createItem

        $('#modal-contact-edit').modal('show')
      },
      edit (item, button) {
        this.$store.commit('contact/CONTACT_SET_ITEM', item)

        this.title = this.$t('contact.edit', {entity: item.value})
        this.item = this.$store.getters['contact/item']
        this.callback = this.updateItem

        $('#modal-contact-edit').modal('show')
      },
    }
  }
</script>
