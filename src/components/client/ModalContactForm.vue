<template>
<div class="modal fade" id="modal-contact-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">

        <div :class="[{ 'has-error': isInvalid('value') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('contact.value')}}:</label>
          <div class="col-sm-10">
            <input
                    id="contact_value"
                    v-model="modalEdit.item.value"
                    :class="['form-control', isInvalid('value') ? 'is-invalid' : '']"
                    type="text">
            <span class="help-block">{{ violations.value }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('contactType') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('contact.contactType.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="contact_contactType"
                    v-model="modalEdit.item.contactType"
                    :options="contactTypes"
                    :class="['form-control-select2', isInvalid('contactType') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.contactType }}</span>
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
  name: 'ModalContactForm',
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

    contactTypes () {
      return this.$store.getters['contact_type/list/items'] || []
    },
  },

  mounted () {
    this.getContactTypes()
  },

  methods: {
    ...mapActions({
      getContactTypes: 'contact_type/list/default',
    }),

    save (item) {
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('contact.saved', {contact: item.value}), this.$t('saved'))
          $('#modal-contact-edit').modal('hide')
          this.$emit('contactCreated', item)
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
