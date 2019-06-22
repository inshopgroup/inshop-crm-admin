<template>
  <div>
    <div v-for="contact in data.contacts" :key="contact.id">
      <i
        v-if="contact.contactType.id == 1"
        class="fa fa-phone"
        aria-hidden="true"
      />
      <i
        v-if="contact.contactType.id == 2"
        class="fa fa-mobile"
        aria-hidden="true"
      />
      <i
        v-if="contact.contactType.id == 3"
        class="fa fa-fax"
        aria-hidden="true"
      />
      <i
        v-if="contact.contactType.id == 4"
        class="fa fa-envelope"
        aria-hidden="true"
      />
      <i
        v-if="contact.contactType.id == 5"
        class="fa fa-internet-explorer"
        aria-hidden="true"
      />

      {{ contact.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
