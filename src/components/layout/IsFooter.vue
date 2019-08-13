<template>
  <v-footer app color="primary" height="50">
    <v-layout align-center justify-space-between>
      <div class="white--text">
        {{ fecha.format(new Date(), 'YYYY') }},
        <a href="https://inshopcrm.com" class="white--text" target="_blank">
          Inshop CRM
        </a>, v1.6.0
      </div>
      <div class="white--text">
        {{ $t('powered_by') }}
        <a href="https://inshopgroup.com" class="white--text" target="_blank">
          Inshop Group
        </a>
      </div>
    </v-layout>
  </v-footer>
</template>

<script>
import fecha from 'fecha'
export default {
  name: 'FooterSlot',
  data() {
    return {
      fecha: fecha
    }
  }
}
</script>
