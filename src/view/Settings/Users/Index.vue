<template>
  <v-data-table
      :headers="headers"
      :items="users"
      :options.sync="pagination"
      :server-items-length="total"
      :loading="loading"
      :search="searchText"
  >
    <template v-slot:item="{item}">
      <tr>
        <td>{{ item.email }}</td>
        <td>{{ item.role }}</td>
        <td>{{ item.createdAt }}</td>
        <td>
          <v-btn icon class="ma-0" @click="onEditBtnClick(item)">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template v-slot:no-results>
      <v-alert :value="true" color="error" icon="warning">
        Your search for "{{ searchText }}" found no results.
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
  import actions from '@/store/actions'
  import { mapState } from 'vuex'

  export default {
    name: 'SettingsUsersHome',
    data () {
      return {
        searchText: '',
        loading: false,
        pagination: {
          page: 1,
          itemsPerPage: 5
        },
        headers: [
          {
            text: 'Email',
            align: 'left',
            sortable: true,
            value: 'email'
          },
          {text: 'Role', value: 'role'},
          {text: 'Created At', value: 'createdAt'},
          {text: '', value: ''}
        ]
      }
    },
    mounted () {
      this.$emit('onConfigNav', {
        navs: [
          {
            text: 'Users'
          }
        ],
        showAddBtn: true
      })
      this.load()
    },
    computed: {
      ...mapState({
        users: state => state.users.items,
        total: state => state.users.total
      })
    },
    watch: {
      pagination () {
        this.load()
      }
    },
    methods: {
      load () {
        this.loading = true
        const { page, itemsPerPage } = this.pagination
        this.$store.dispatch(actions.users.listAll, {page: page, size: itemsPerPage})
          .then(() => {
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
          })
      },

      onAddBtnClick () {
        this.$router.push('/settings/users/new')
      },

      onEditBtnClick (user) {
        this.$router.push({
          name: 'SettingsUsersEdit',
          params: {
            userObj: user
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
