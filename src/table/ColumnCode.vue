<template>
<div>
  <router-link v-if="isGranted('ROLE_COMPANY_SHOW')" :to="{name: 'CompanyShow', params: { id: data['@id'] }}">
    {{data.code}}
  </router-link>
</div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
