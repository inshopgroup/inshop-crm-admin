<template>
  <v-footer app>
    <v-layout align-center justify-space-between row mx-3>
      <section>
        {{ fecha.format(new Date(), 'YYYY') }},
        <a href="https://inshopcrm.com" target="_blank">Inshop CRM</a>, v1.6.0
      </section>
      <section>
        {{ $t('powered_by') }}
        <a href="https://inshopgroup.com" target="_blank">Inshop Group</a>
      </section>
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
