<template>
  <div class="table-responsive">
    <section class="content-header hidden show-print">
      <h1>{{ $t('tabs_contacts') }}</h1>
    </section>
    <button class="btn btn-primary hidden-print" @click="create($event.target)">
      {{ $t('contact_add') }}
    </button>
    <br />
    <br />
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">
            {{ $t('id') }}
          </th>
          <th>{{ $t('contact_value') }}</th>
          <th>{{ $t('contactType_name') }}</th>
          <th class="hidden-print" style="width: 100px;" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <router-link
              v-if="contact"
              :to="{ name: 'ContactShow', params: { id: contact.id } }"
            >
              {{ contact.id }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="contact"
              :to="{ name: 'ContactShow', params: { id: contact.id } }"
            >
              {{ contact.value }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="contact.contactType"
              :to="{ name: 'ContactShow', params: { id: contact.id } }"
            >
              {{ contact.contactType.name }}
            </router-link>
          </td>
          <td class="hidden-print">
            <div class="btn-group" role="group">
              <button
                class="btn btn-info"
                @click="edit(contact, $event.target)"
              >
                <span class="fa fa-pencil" aria-hidden="true" />
                <span class="sr-only">{{ $t('edit') }}</span>
              </button>
              <button class="btn btn-info" @click="deleteItem(contact)">
                <span class="fa fa-remove" aria-hidden="true" />
                <span class="sr-only">{{ $t('delete') }}</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal-contact-form
      :callback="callback"
      :title="title"
      :item="item"
      @contactsChanged="$emit('contactsChanged')"
    />
  </div>
</template>

<script>
import ModalContactForm from './ModalContactForm'
import { mapActions } from 'vuex'

export default {
  components: { ModalContactForm },
  props: {
    parent: {
      type: Object,
      required: true
    },
    contacts: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
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
      createItem: 'contact/create'
    }),
    deleteItem(item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.remove(item).then(() => {
          this.$toastr.s(
            this.$t('contact_deleted', { entity: item.value }),
            this.$t('deleted')
          )

          this.$emit('contactsChanged')
        })
      }
    },
    create() {
      this.$store.commit('contact/CONTACT_SET_ITEM', this.parent)

      this.title = this.$t('contact_add')
      this.item = this.$store.getters['contact/item']
      this.callback = this.createItem

      window.$('#modal-contact-edit').modal('show')
    },
    edit(item) {
      this.$store.commit('contact/CONTACT_SET_ITEM', item)

      this.title = this.$t('contact_edit', { entity: item.value })
      this.item = this.$store.getters['contact/item']
      this.callback = this.updateItem

      window.$('#modal-contact-edit').modal('show')
    }
  }
}
</script>
