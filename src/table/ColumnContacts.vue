<template>
  <div>
    <div v-for="contact in data.contacts">
      <i class="fa fa-phone" aria-hidden="true" v-if="contact.contactType.id == 1"></i>
      <i class="fa fa-mobile" aria-hidden="true" v-if="contact.contactType.id == 2"></i>
      <i class="fa fa-fax" aria-hidden="true" v-if="contact.contactType.id == 3"></i>
      <i class="fa fa-envelope" aria-hidden="true" v-if="contact.contactType.id == 4"></i>
      <i class="fa fa-internet-explorer" aria-hidden="true" v-if="contact.contactType.id == 5"></i>

      {{contact.value}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
