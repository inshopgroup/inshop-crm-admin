<template>
  <v-layout wrap>
    <v-flex xs12 mb-4>
      <v-btn
          class="mx-1"
          color="success"
          @click="create($event.target)"
          large
      >
        {{ $t('address_add') }}
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <is-table :headers="headers" :items="addresses">
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

    <modal-address-form
      :callback="callback"
      :title="title"
      :item="item"
      :dialog="dialog"
      @dialog-close="dialog = false"
      @addressesChanged="$emit('changed')"
    />
  </v-layout>
</template>

<script>
import ModalAddressForm from './ModalAddressForm'
import { mapActions } from 'vuex'

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
        { text: this.$t('country_name'), value: 'country.name', type: 'object' },
        { text: this.$t('city_name'), value: 'city.name', type: 'object' },
        { text: this.$t('region'), value: 'region' },
        { text: this.$t('district'), value: 'district' },
        { text: this.$t('street'), value: 'street' },
        { text: this.$t('building'), value: 'building' },
        { text: this.$t('apartment'), value: 'apartment' },
        { text: this.$t('comment'), value: 'comment' },
        { text: '', value: 'actions', sortable: false }
      ]
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
    }
  }
}
</script>
