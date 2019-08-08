<template>
  <v-layout justify-center>
    <v-dialog :value="dialog" max-width="1200">
      <v-card>
        <v-card-title class="headline">
          {{ title }}
          <v-spacer></v-spacer>
          <v-icon class="mr-2" @click="dialogClose">
            close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <ContactForm
              :handle-submit="onSendForm"
              :item="item"
              :show-actions="false"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onSendForm">{{ $t('save') }}</v-btn>
          <v-btn color="green darken-1" text @click="dialogClose">{{ $t('close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

<!--  <div id="modal-contact-edit" class="modal fade">-->
<!--    <div class="modal-dialog modal-lg">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header">-->
<!--          <button-->
<!--            type="button"-->
<!--            class="close"-->
<!--            data-dismiss="modal"-->
<!--            aria-label="Close"-->
<!--          >-->
<!--            <span aria-hidden="true">&times;</span>-->
<!--          </button>-->
<!--          <h4 class="modal-title">-->
<!--            {{ title }}-->
<!--          </h4>-->
<!--        </div>-->
<!--        <div class="modal-body form-horizontal">-->
<!--          <ContactForm-->
<!--            :handle-submit="onSendForm"-->
<!--            :item="item"-->
<!--            :show-actions="false"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="modal-footer">-->
<!--          <button-->
<!--            type="submit"-->
<!--            class="btn btn-primary pull-left"-->
<!--            @click="onSendForm"-->
<!--          >-->
<!--            {{ $t('save') }}-->
<!--          </button>-->
<!--          <button-->
<!--            type="button"-->
<!--            class="btn btn-default pull-right"-->
<!--            data-dismiss="modal"-->
<!--          >-->
<!--            {{ $t('close') }}-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import ContactForm from '../contact/Form'

export default {
  name: 'ModalContactForm',
  components: { ContactForm },
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
    onSendForm() {
      this.callback()
        .then(item => {
          this.$toastr.s(
            this.$t('contact_saved', { contact: item.value }),
            this.$t('saved')
          )
          this.$emit('contactsChanged', item)

          this.dialogClose()
        })
        .catch()
    },
    dialogClose() {
      this.$emit('dialog-close')
    },
  }
}
</script>
