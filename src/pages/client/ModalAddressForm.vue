<template>
  <div id="modal-address-edit" class="modal fade">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">
            {{ title }}
          </h4>
        </div>
        <div class="modal-body form-horizontal">
          <AddressForm
            :handle-submit="onSendForm"
            :item="item"
            :show-actions="false"
          />
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-primary pull-left"
            @click="onSendForm"
          >
            {{ $t('save') }}
          </button>
          <button
            type="button"
            class="btn btn-default pull-right"
            data-dismiss="modal"
          >
            {{ $t('close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressForm from '../address/Form'

export default {
  name: 'ModalAddressForm',
  components: { AddressForm },
  props: {
    title: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  methods: {
    onSendForm() {
      this.callback()
        .then(item => {
          this.$toastr.s(
            this.$t('address_saved', { address: item.value }),
            this.$t('saved')
          )
          this.$emit('addressesChanged', item)

          window.$('#modal-address-edit').modal('hide')
        })
        .catch()
    }
  }
}
</script>
