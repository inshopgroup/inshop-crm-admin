<template>
  <div>
    <div v-if="item" class="table-responsive">
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
            <td>{{ $t('code') }}</td>
            <td>{{ item.code }}</td>
          </tr>
          <tr>
            <td>{{ $t('name') }}</td>
            <td>{{ item.name }}</td>
          </tr>
          <tr>
            <td>{{ $t('fullName') }}</td>
            <td>{{ item.fullName }}</td>
          </tr>
          <tr>
            <td>{{ $t('contactPerson') }}</td>
            <td>{{ item.contactPerson }}</td>
          </tr>
          <tr>
            <td>{{ $t('description') }}</td>
            <td>{{ item.description }}</td>
          </tr>
          <tr>
            <td>{{ $t('comment') }}</td>
            <td>{{ item.comment }}</td>
          </tr>
          <tr>
            <td>{{ $t('bankName') }}</td>
            <td>{{ item.bankName }}</td>
          </tr>
          <tr>
            <td>{{ $t('bankAccountNumber') }}</td>
            <td>{{ item.bankAccountNumber }}</td>
          </tr>
          <tr>
            <td>{{ $t('krs') }}</td>
            <td>{{ item.krs }}</td>
          </tr>
          <tr>
            <td>{{ $t('nip') }}</td>
            <td>{{ item.nip }}</td>
          </tr>
          <tr>
            <td>{{ $t('isVat') }}</td>
            <td>{{ item.isVat }}</td>
          </tr>
          <tr>
            <td>{{ $t('labels_id') }}</td>
            <td>
              <div v-for="label in item.labels" :key="label.id">
                <span class="label label-primary">
                  {{ label.name }}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>{{ $t('vatComment') }}</td>
            <td>{{ item.vatComment }}</td>
          </tr>

          <show-row-is-active :item="item" />
          <show-row-created-at :item="item" />
          <show-row-updated-at :item="item" />
          <show-row-updated-by :item="item" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ShowRowIsActive from '../../components/Show/ShowRowIsActive'
import ShowRowCreatedAt from '../../components/Show/ShowRowCreatedAt'
import ShowRowUpdatedAt from '../../components/Show/ShowRowUpdatedAt'
import ShowRowUpdatedBy from '../../components/Show/ShowRowUpdatedBy'
export default {
  name: 'CompanyInfo',
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
