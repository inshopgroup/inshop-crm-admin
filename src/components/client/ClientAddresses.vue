<template>
  <div class="table-responsive">

    <section class="content-header hidden show-print">
      <h1>{{$t('company.tabs.addresses')}}</h1>
    </section>

    <button class="btn btn-primary hidden-print" @click="create($event.target)">{{$t('address.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">{{$t('address.id')}}</th>
          <th>{{$t('address.postCode')}}</th>
          <th>{{$t('address.country.name')}}</th>
          <th>{{$t('address.city.name')}}</th>
          <th>{{$t('address.region')}}</th>
          <th>{{$t('address.district')}}</th>
          <th>{{$t('address.street')}}</th>
          <th>{{$t('address.building')}}</th>
          <th>{{$t('address.apartment')}}</th>
          <th>{{$t('address.comment')}}</th>
          <th class="hidden-print" style="width: 100px;" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="address in addresses" :key="address['@id']">
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['id'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['postCode'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['country']['name'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['city']['name'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['region'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['district'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['street'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['building'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['apartment'] }}
            </router-link>
          </td>
          <td>
            <router-link v-if="address" :to="{name: 'AddressShow', params: { id: address['@id'] }}">
              {{ address['comment'] }}
            </router-link>
          </td>
          <td class="hidden-print">
            <div class="btn-group" role="group">
              <button class="btn btn-info" @click="edit(address, $event.target)">
                <span class="fa fa-pencil" aria-hidden="true" />
                <span class="sr-only">{{$t('edit')}}</span>
              </button>

              <button class="btn btn-info" @click="deleteItem(address)">
                <span class="fa fa-remove" aria-hidden="true" />
                <span class="sr-only">{{$t('delete')}}</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <modal-address-form :modal-edit="modalEdit" @addressCreated="reloadAddresses()"></modal-address-form>
  </div>
</template>

<script>
  import ModalAddressForm from './ModalAddressForm'
  import { mapActions } from 'vuex'

  export default {
    name: 'ClientAddress',
    components: {ModalAddressForm},
    props: {
      client: null,
      company: null,
      addresses: {
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
          url: null,
          method: null
        }
      }
    },
    methods: {
      ...mapActions({
        del: 'address/del/del',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s(
              this.$t('address.deleted', {entity: item.value}),
              this.$t('deleted')
            )
            this.reloadAddresses()
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
          title: this.$t('address.add'),
          item: {
            clients: clients,
            companies: companies
          },
          url: process.env.API_URL + '/addresses',
          method: 'post'
        }

        $('#modal-address-edit').modal('show')
      },
      edit (item, button) {
        this.modalEdit = {
          title: this.$t('address.edit', {entity: item.value}),
          item: item,
          url: process.env.API_URL + item['@id'],
          method: 'put'
        }

        $('#modal-address-edit').modal('show')
      },
      reloadAddresses () {
        this.$emit('reloadAddresses')
      }
    }
  }
</script>
