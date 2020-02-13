<template>
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
      <v-row justify="space-between" no-gutters>
        <v-col class="col-auto">
          <v-btn color="primary" @click="onSendForm">
            {{ $t('save') }}
          </v-btn>
        </v-col>
        <v-col class="col-auto">
          <v-btn color="error" @click="dialogClose">
            {{ $t('close') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
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
    }
  },
  methods: {
    ...mapActions({
      reset: 'contact/reset'
    }),
    onSendForm() {
      this.callback()
        .then(item => {
          this.$toastr.s(
            this.$t('contact_saved', { contact: item.value }),
            this.$t('saved')
          )
          this.$emit('contacts-changed', item)

          this.dialogClose()
          this.resetForm()
        })
        .catch()
    },
    dialogClose() {
      this.$emit('dialog-close')
    },
    resetForm() {
      this.reset()
      this.$emit('reset-form')
    }
  }
}
</script>
