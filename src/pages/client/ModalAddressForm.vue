<template>
  <v-layout justify-center>
    <v-dialog :value="dialog" max-width="800">
      <v-card>
        <v-card-title class="headline">
          {{ title }}
          <v-spacer></v-spacer>
          <v-icon class="mr-2" @click="dialogClose">
            close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <AddressForm
            :handle-submit="onSendForm"
            :item="item"
            :show-actions="false"
          />
        </v-card-text>
        <v-card-actions>
          <v-layout justify-space-between>
            <v-btn
                color="primary"
                @click="onSendForm"
            >
              {{ $t('save') }}
            </v-btn>
            <v-btn
                color="error"
                @click="dialogClose"
            >
              {{ $t('close') }}
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import AddressForm from '../address/Form'
import { mapActions } from 'vuex'

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
    },
    dialog: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    ...mapActions({
      reset: 'address/reset',
    }),
    onSendForm() {
      this.callback()
        .then(item => {
          this.$toastr.s(
            this.$t('address_saved', { address: item.value }),
            this.$t('saved')
          )
          this.$emit('addressesChanged', item)

          this.dialogClose()
        })
        .catch()
    },
    dialogClose() {
      this.$emit('dialog-close')
      this.reset()
    },
  }
}
</script>
