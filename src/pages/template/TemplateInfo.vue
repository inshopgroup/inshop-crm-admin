<template>
  <div
    v-if="item"
    class="table-responsive"
  >
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th width="20%">
            {{ $t('field') }}
          </th>
          <th>{{ $t('value') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ $t('name') }}</td>
          <td>{{ item.name }}</td>
        </tr>
        <tr>
          <td>{{ $t('type_name') }}</td>
          <td>
            <div v-if="item.type">
              {{ item.type.name }}
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t('createdAt') }}</td>
          <td>{{ crmDateFormat(item.createdAt) }}</td>
        </tr>
        <tr>
          <td>{{ $t('updatedAt') }}</td>
          <td>{{ crmDateFormat(item.updatedAt) }}</td>
        </tr>
        <tr>
          <td>{{ $t('updatedBy') }}</td>
          <td>{{ item.updatedBy }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TemplateInfo',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
