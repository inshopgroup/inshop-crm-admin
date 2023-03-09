<template>
  <is-main-template
    title="label_edit"
    :title-params="{ entity: item && item.name }"
  >
    <label-form :handle-submit="onSendForm" :item="item"></label-form>
  </is-main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import LabelForm from '../Form.vue'

import type { ILabel } from '~/store/label'

export default Vue.extend({
  components: {
    LabelForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'label/item',
    }),
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'label/getItem',
      update: 'label/update',
      reset: 'label/reset',
    }),
    onSendForm() {
      this.update()
        .then((item: ILabel) => {
          this.$router.push({
            name: 'label-id-show___en',
            params: { id: item.id.toString() },
          })
        })
        .catch()
    },
  },
})
</script>
