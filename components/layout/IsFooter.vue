<template>
  <v-footer :app="app" color="secondary" dark class="caption" min-height="32">
    <v-row no-gutters justify="space-between">
      <v-col cols="12" sm="auto" class="text-center">
        {{ fecha.format(new Date(), 'YYYY') }},
        <a href="https://inshopcrm.com" class="white--text" target="_blank">
          Inshop CRM </a
        >, v2.0.0
      </v-col>
      <v-col cols="12" sm="auto" class="text-center">
        {{ $t('powered_by') }}
        <a href="https://inshopgroup.com" class="white--text" target="_blank">
          Inshop Group
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import fecha from 'fecha'

export default {
  name: 'FooterSlot',
  props: {
    app: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fecha,
    }
  },
}
</script>
