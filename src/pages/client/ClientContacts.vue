<template>
  <v-layout wrap>
    <v-flex xs12 mb-4>
      <v-btn
          class="mx-1"
          color="success"
          @click="create($event.target)"
      >
        {{ $t('contact_add') }}
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <is-table :headers="headers" :items="contacts">
        <template v-slot:item.actions="{ item }">
          <v-layout justify-end>
            <v-btn text x-small @click="goto(item, $event.target)">
              <v-icon color="primary">remove_red_eye</v-icon>
            </v-btn>
            <v-btn text x-small @click="edit(item, $event.target)">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn text x-small @click="deleteItem(item)">
              <v-icon color="primary">delete_forever</v-icon>
            </v-btn>
          </v-layout>
        </template>
      </is-table>
    </v-flex>

    <modal-contact-form
      :callback="callback"
      :title="title"
      :item="item"
      :dialog="dialog"
      @dialog-close="dialog = false"
      @contactsChanged="$emit('changed')"
    />
  </v-layout>
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
      default: () => []
    }
  },
  data() {
    return {
      title: '',
      item: {},
      callback: () => ({}),
      dialog: false,
      headers: [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('contact_value'), value: 'value' },
        { text: this.$t('contactType_name'), value: 'contactType.name', type: 'object' },
        { text: '', value: 'actions', sortable: false }
      ]
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

          this.$emit('changed')
        })
      }
    },
    goto(item) {
      this.$router.push({ name: 'ContactShow', params: { id: item.id } })
    },
    create() {
      this.$store.commit('contact/CONTACT_SET_ITEM', this.parent)

      this.title = this.$t('contact_add')
      this.item = this.$store.getters['contact/item']
      this.callback = this.createItem

      this.dialog = true
    },
    edit(item) {
      this.$store.commit('contact/CONTACT_SET_ITEM', item)

      this.title = this.$t('contact_edit', { entity: item.value })
      this.item = this.$store.getters['contact/item']
      this.callback = this.updateItem

      this.dialog = true
    }
  }
}
</script>
