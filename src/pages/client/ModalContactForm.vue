<template>
  <div class="modal fade" id="modal-contact-edit">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body form-horizontal">
          <ContactForm :handle-submit="onSendForm" :item="item" :show-actions="false" />
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary pull-left" @click="onSendForm">{{ $t('save') }}</button>
          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">{{ $t('close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from "../contact/Form"

export default {
  name: 'ModalContactForm',
  components: { ContactForm },
  props: {
    title: {
      type: String,
      required :true
    },
    item: {
      type: Object,
      required :true
    },
    callback: {
      type: Function,
      required :true
    }
  },
  methods: {
    onSendForm() {
      this.callback().then(item => {
        this.$toastr.s(this.$t('contact_saved', {contact: item.value}), this.$t('saved'))
        this.$emit('contactsChanged', item)

        $('#modal-contact-edit').modal('hide')
      }).catch(e => {})
    }
  }
}
</script>
