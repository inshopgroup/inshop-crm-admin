<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'channel'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'channel.name'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'currency'" :option-property="'currency'" :label="'channel.currency.name'" @fieldUpdated="updateValue"></form-select>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Channel'" :path="'channel'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import FormSelect from "../layout/form/FormSelect";
  import ItemErrors from "../layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormSelect,
      FormInput,
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
        errors: 'channel/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'channel/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('channel/CHANNEL_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
