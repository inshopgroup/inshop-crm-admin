<template>
    <!--<footer class="footer">-->
        <!--<div class="container-fluid">-->
          <!--<span class="text-muted">{{$t('powered_by')}} <a href="https://inshopgroup.com" target="_blank">Inshop Group</a></span>-->
        <!--</div>-->
    <!--</footer>-->
    <!-- Main Footer -->
    <footer class="main-footer">
      <!-- To the right -->
      <div class="pull-right hidden-xs">
        {{moment().format('YYYY')}}, <a href="https://inshopcrm.com" target="_blank">Inshop CRM, v1.3.0</a>
      </div>
      <!-- Default to the left -->
      {{$t('powered_by')}} <a href="https://inshopgroup.com" target="_blank">Inshop Group</a>
    </footer>
</template>

<script>
export default {
  name: 'FooterSlot',
  data () {
    return {
    }
  }
}
</script>
