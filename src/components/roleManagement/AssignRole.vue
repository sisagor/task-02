<template>

  <div>
    <b-modal id="assignRole" title="Assign Role" aria-disabled="true" hide-footer>
    <b-form @submit.prevent="assignRole" @reset="reset">
        <b-form-group id="user" label="User:" label-for="user">
          <b-form-select class="form-control" v-model="user" :options="users" required>
            <template #first>
              <b-form-select-option :value="null" disabled>Please select an user</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="role" label="Role:" label-for="role">
          <b-form-select class="form-control" v-model="role" :options="roles" required>
            <template #first>
              <b-form-select-option :value="null" disabled>Please select an role</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <div class="modal-footer">
          <b-button size="sm" type="submit" variant="success">
            Assign
          </b-button>
          <b-button size="sm" variant="danger" type="reset">
            Reset
          </b-button>
        </div>
    </b-form>
    </b-modal>
  </div>

</template>

<script>

import axios from "axios";

export default {
  name:'AssignRole',

  data(){
    return {
      users : null,
      roles : null,
      user: null,
      role: null,
    }

  },

  mounted() {
    this.getRoles();
    this.getUsers();
  },


  methods:{

    getUsers(){
      axios.get(window.config.baseUrl + 'users', {
        headers: {
          'Authorization': 'Bearer '+this.$session.get('token')
        }
      })
      .then(response => {
        this.users = response.data.data.map(user => ({
          value:user.id, text: user.name + ' | ' + user.email
        }));

      }).catch(error => {
        this.falshMessage.error({
          title : 'Error',
          message : error.message,
        });
      })
    },

    getRoles() {
      axios.get(window.config.baseUrl + 'roles',
        {
          headers: {
            'Authorization': 'Bearer ' + this.$session.get('token')
          }
        })
        .then(response => {
          this.roles = response.data.data.map(role => ({
            value:role.id, text: role.name + ' | ' + role.level
          }));
        })
        .catch(error => {
          console.log(error);
        })
    },

    assignRole(){

      axios.post(window.config.baseUrl + 'user/role/assign',
          {
            user_id:this.user, role_id:this.role
          },
          { headers: {
                'Authorization': 'Bearer ' + this.$session.get('token')
              }
          }
      )
      .then(response => {

        if (response.data.status){
          window.flash.success(this, 'Assign Success.', 'Role Assigned successfully');
          window.functions.hideModal(this,'assignRole')
          window.functions.lazyReload();
        }
        else
        {
          this.flashMessage.error({
            title: 'assign Failed.',
            message: response.data.data.message,
          });
        }

      })
      .catch(error => {
          window.flash.error(this, 'Assign Failed.', error.message);
      })
    },


    reset(event) {
      event.preventDefault()
      this.role = ''
      this.user = null
      window.functions.hideModal(this,'assignRole')
    },

  }

}

</script>
