<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="text" />
      <div class="box box-primary">
        <div class="box-body">
          <form-input
            :item="item"
            :errors="errors"
            property="title"
            label="text_title"
            @formUpdated="updateValue"
          />
          <form-textarea
            :item="item"
            :errors="errors"
            property="content"
            label="content"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="seoTitle"
            label="seoTitle"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="seoDescription"
            label="seoDescription"
            @formUpdated="updateValue"
          />
          <form-input
            :item="item"
            :errors="errors"
            property="seoKeywords"
            label="seoKeywords"
            @formUpdated="updateValue"
          />
        </div>
      </div>
      <item-edit-actions
        :item="item"
        entity="Text"
        path="text"
      />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ItemEditActions
  },
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  beforeDestroy () {
    this.reset()
  },
  computed: {
    ...mapGetters({
      errors: 'text/errors'
    })
  },
  methods: {
    ...mapActions({
      reset: 'text/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('text/TEXT_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
