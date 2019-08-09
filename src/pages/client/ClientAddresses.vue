<template>
  <div class="table-responsive">
    <v-btn
        class="mx-1"
        small
        color="success"
        @click="create($event.target)"
    >
      {{ $t('address_add') }}
    </v-btn>
    <br />
    <br />
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">
            {{ $t('id') }}
          </th>
          <th>{{ $t('postCode') }}</th>
          <th>{{ $t('country_name') }}</th>
          <th>{{ $t('city_name') }}</th>
          <th>{{ $t('region') }}</th>
          <th>{{ $t('district') }}</th>
          <th>{{ $t('street') }}</th>
          <th>{{ $t('building') }}</th>
          <th>{{ $t('apartment') }}</th>
          <th>{{ $t('comment') }}</th>
          <th class="hidden-print" style="width: 100px;" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="address in addresses" :key="address.id">
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.id }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.postCode }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address.country"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.country.name }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address.city"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.city.name }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.region }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.district }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.street }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.building }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.apartment }}
            </router-link>
          </td>
          <td>
            <router-link
              v-if="address"
              :to="{ name: 'AddressShow', params: { id: address.id } }"
            >
              {{ address.comment }}
            </router-link>
          </td>
          <td class="hidden-print">
            <v-layout>
              <v-btn-toggle dark rounded small>
                <v-btn
                  @click="edit(address, $event.target)"
                  color="success"
                  small
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteItem(address)"
                  color="success"
                  small
                >
                  <v-icon small>delete_forever</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-layout>
          </td>
        </tr>
      </tbody>
    </table>
    <modal-address-form
      :callback="callback"
      :title="title"
      :item="item"
      :dialog="dialog"
      @dialog-close="dialog = false"
      @addressesChanged="$emit('changed')"
    />
  </div>
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
      dialog: false
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

          this.$emit('addressesChanged')
        })
      }
    },
    create() {
      this.$store.commit('address/ADDRESS_SET_ITEM', this.parent)

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
