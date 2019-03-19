<template>
  <div :class="['form-group', isInvalid ? 'has-error' : '']">
    <label :for="property" class="form-control-label">{{ $t(label) }}</label>

    <vue-ctk-date-time-picker
        :class="[{'is-invalid': isInvalid}]"
        :value="item[property]"
        @input="$emit('fieldUpdated', property, $event)"
        :only-time="true"
        format="HH:mm"
        formatted="HH:mm"
    ></vue-ctk-date-time-picker>

    <div v-if="isInvalid" class="help-block">{{ errors[property] }}</div>
  </div>
</template>

<script>
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

  export default {
    components: {
      VueCtkDateTimePicker,
    },
    name: 'FormTimePicker',
    props: {
      item: {
        type: Object,
        required: true
      },
      property: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: null
      },
      errors: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      isInvalid () {
        return Object.keys(this.errors).length > 0 && this.errors[this.property]
      }
    }
  }
</script>
