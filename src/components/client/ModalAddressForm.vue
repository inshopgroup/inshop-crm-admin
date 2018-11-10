<template>
<div class="modal fade" id="modal-address-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">
        <div :class="[{ 'has-error': isInvalid('country') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.country.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="address_country"
                    v-model="modalEdit.item.country"
                    :options="countries"
                    :class="['form-control-select2', isInvalid('country') ? 'is-invalid' : '']"
                    label="name"
                    @input="getCities()"
            ></v-select>
            <span class="help-block">{{ violations.country }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('city') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.city.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="address_city"
                    v-model="modalEdit.item.city"
                    :options="cities"
                    :class="['form-control-select2', isInvalid('city') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.city }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('region') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.region')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_region"
                    v-model="modalEdit.item.region"
                    :class="['form-control', isInvalid('region') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.region }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('district') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.district')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_district"
                    v-model="modalEdit.item.district"
                    :class="['form-control', isInvalid('district') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.district }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('postCode') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.postCode')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_postCode"
                    v-model="modalEdit.item.postCode"
                    :class="['form-control', isInvalid('postCode') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.postCode }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('street') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.street')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_street"
                    v-model="modalEdit.item.street"
                    :class="['form-control', isInvalid('street') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.street }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('building') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.building')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_building"
                    v-model="modalEdit.item.building"
                    :class="['form-control', isInvalid('building') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.building }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('apartment') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.apartment')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_apartment"
                    v-model="modalEdit.item.apartment"
                    :class="['form-control', isInvalid('apartment') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.apartment }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('comment') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('address.comment')}}:</label>
          <div class="col-sm-10">
            <input
                    id="address_comment"
                    v-model="modalEdit.item.comment"
                    :class="['form-control', isInvalid('comment') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.comment }}</span>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
        <button type="submit" class="btn btn-primary" @click="save(modalEdit.item)">{{$t('save')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '../../interceptor'

export default {
  name: 'ModalAddressForm',
  data () {
    return {
      errors: {}
    }
  },
  props: {
    modalEdit: {
      title: '',
      item: {},
    },
  },

  computed: {
    violations () {
      return this.errors || {}
    },

    countries () {
      return this.$store.getters['country/list/items'] || []
    },

    cities () {
      return this.$store.getters['city/list/items'] || []
    },
  },

  mounted () {
    this.getCountries()
  },

  methods: {
    ...mapActions({
      getCountries: 'country/list/default',
      getCities: 'city/list/default',
    }),

    save (item) {
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('address.saved', {address: item.name}), this.$t('saved'))
          $('#modal-address-edit').modal('hide')
          this.$emit('addressCreated', item)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            let data = e.response.data

            if (data.violations) {
              const errors = {}

              data.violations.map(violation => {
                Object.assign(errors, { [violation.propertyPath]: violation.message })
              })

              this.errors = errors
            } else {
              this.$toastr.e(data['hydra:description'], data['hydra:title']);
            }
          } else {
            this.$toastr.e(e.message, this.$t('error_occurred'))
          }
        })
    },

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
  }
}
</script>
