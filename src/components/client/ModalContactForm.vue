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
        <ContactForm
            :handle-submit="onSendForm"
            :item="modalEdit.item"
            :errors="errors"
        />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
        <button type="submit" class="btn btn-primary" @click="onSendForm">{{$t('save')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormInput from "../layout/form/FormInput";
import FormSelect from "../layout/form/FormSelect";
import ContactForm from "../contact/Form";

export default {
  name: 'ModalContactForm',
  components: {FormSelect, FormInput, ContactForm},
  props: {
    modalEdit: {
      title: '',
      item: {},
    },
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      errors: 'contact/errors'
    })
  },
  methods: {
    ...mapActions({
      update: 'contact/update',
      create: 'contact/create',
    }),
    onSendForm () {
      this.create().then(item => {
        this.$toastr.s(this.$t('contact.saved', {contact: item.value}), this.$t('saved'))
        $('#modal-contact-edit').modal('hide')
        this.$emit('contactCreated', item)
      }).catch(e => {})
    }
  }
}
</script>
