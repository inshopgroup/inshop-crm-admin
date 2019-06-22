<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      {{ fecha.format(new Date(), 'YYYY') }},
      <a
        href="https://inshopcrm.com"
        target="_blank"
      >Inshop CRM, v1.4.0</a>
    </div>
    {{ $t('powered_by') }}
    <a
      href="https://inshopgroup.com"
      target="_blank"
    >Inshop Group</a>
  </footer>
</template>

<script>
import fecha from 'fecha'
export default {
  name: 'FooterSlot',
  data () {
    return {
      fecha: fecha
    }
  }
}
</script>
