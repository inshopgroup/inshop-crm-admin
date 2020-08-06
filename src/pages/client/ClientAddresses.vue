<template>
  <v-row>
    <v-col cols="12" class="mb-4">
      <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-1"
            color="success"
            large
            @click="create($event.target)"
          >
            {{ $t('address_add') }}
          </v-btn>
        </template>

        <modal-address-form
          :key="key"
          :callback="callback"
          :title="title"
          :item="item"
          @dialog-close="onCloseDialog"
          @reset-form="resetForm"
          @addresses-changed="$emit('changed')"
        />
      </v-dialog>
    </v-col>

    <v-col cols="12">
      <is-table
        :headers="headers"
        :items="addresses"
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
import ModalAddressForm from './ModalAddressForm'

export default {
  components: { ModalAddressForm },
  props: {
    parent: {
      type: Object,
      required: true
    },
    addresses: {
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
        { text: this.$t('postCode'), value: 'postCode' },
        {
          text: this.$t('country_name'),
          value: 'country.name',
          type: 'object'
        },
        { text: this.$t('city_name'), value: 'city' },
        { text: this.$t('region'), value: 'region' },
        { text: this.$t('district'), value: 'district' },
        { text: this.$t('street'), value: 'street' },
        { text: this.$t('building'), value: 'building' },
        { text: this.$t('apartment'), value: 'apartment' },
        { text: this.$t('comment'), value: 'comment' },
        { text: '', value: 'actions', sortable: false }
      ],
      key: 1
    }
  },
  methods: {
    ...mapActions({
      remove: 'address/remove',
      updateItem: 'address/update',
      createItem: 'address/create'
    }),
    deleteItem(item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.remove(item).then(() => {
          this.$toastr.s(
            this.$t('address_deleted', { entity: item.value }),
            this.$t('deleted')
          )

          this.$emit('changed')
        })
      }
    },
    goto(item) {
      this.$router.push({ name: 'AddressShow', params: { id: item.id } })
    },
    create() {
      this.$store.commit('address/ADDRESS_UPDATE_ITEM', this.parent)

      this.title = this.$t('address_add')

      this.item = this.$store.getters['address/item']
      this.callback = this.createItem

      this.dialog = true
    },
    edit(item) {
      this.$store.commit('address/ADDRESS_SET_ITEM', item)

      this.title = this.$t('address_edit', { entity: item.id })
      this.item = this.$store.getters['address/item']
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
