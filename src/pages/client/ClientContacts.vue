<template>
  <v-row>
    <v-col cols="12" class="mb-4">
      <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-1"
            color="success"
            large
            @click="create($event.target)"
          >
            {{ $t('contact_add') }}
          </v-btn>
        </template>

        <modal-contact-form
          :key="key"
          :callback="callback"
          :title="title"
          :item="item"
          @dialog-close="onCloseDialog"
          @reset-form="resetForm"
          @contacts-changed="$emit('changed')"
        />
      </v-dialog>
    </v-col>

    <v-col cols="12">
      <is-table
        :headers="headers"
        :items="contacts"
        :hide-default-footer="true"
      >
        <template v-slot:item.actions="{ item }">
          <v-row justify="end">
            <v-btn text small @click="goto(item, $event.target)">
              <v-icon color="primary">remove_red_eye</v-icon>
            </v-btn>
            <v-btn text small @click="edit(item, $event.target)">
              <v-icon color="primary">edit</v-icon>
            </v-btn>
            <v-btn text small @click="deleteItem(item)">
              <v-icon color="primary">delete_forever</v-icon>
            </v-btn>
          </v-row>
        </template>
      </is-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import ModalContactForm from './ModalContactForm'

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
        {
          text: this.$t('contactType_name'),
          value: 'contactType.name',
          type: 'object'
        },
        { text: '', value: 'actions', sortable: false }
      ],
      key: 1
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
      this.$store.commit('contact/CONTACT_UPDATE_ITEM', this.parent)

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
    },
    onCloseDialog() {
      this.dialog = false
    },
    resetForm() {
      this.key++
    }
  }
}
</script>
