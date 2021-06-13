<template>
  <div>
    <b-form @submit.prevent="updateAssign" @reset="reset">
      <b-form-group id="user" label="User:" label-for="user">
        <b-form-select class="form-control" v-model="user" :options="users" required>
          <!-- <template #first>
            <b-form-select-option :value="item.id" aria-selected="true" >{{ item.name + ' | ' + item.email }}</b-form-select-option>
          </template>-->
        </b-form-select>
      </b-form-group>

      <b-form-group id="role" label="Role:" label-for="role">
        <b-form-select class="form-control" v-model="role" :options="roles" required>
        <!--<template #first>
            <b-form-select-option id="selectedRole" :value="item.role_id" aria-selected="true">{{ item.role_name + ' | ' + item.role_level }}</b-form-select-option>
        </template>-->
        </b-form-select>
      </b-form-group>

      <div class="modal-footer">
        <b-button size="sm" type="submit" variant="success">
          create
        </b-button>
        <b-button size="sm" variant="danger" type="reset">
          Reset
        </b-button>
      </div>

    </b-form>

  </div>

</template>

<script>

import axios from "axios";

export default {
  name:'EditAssign',
  props: ['item'],


  data(){
    return {
      users : [],
      roles : [],
      user: this.item.id,
      role: this.item.role_id
    }

  },


  created() {
    this.getUsers();
    this.getRoles();
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

    updateAssign(){

      axios.post(window.config.baseUrl + 'user/role/assign',
          {
            user_id : this.user, role_id : this.role
          },
          { headers: {
                'Authorization': 'Bearer ' + this.$session.get('token')
              }
          }
      )
      .then(response => {
        if (response.data.status){
          window.flash.success(this, 'Update success', 'Role assign updated successfully')
          window.functions.hideModal(this, 'editAssign')
          window.functions.lazyReload()
        }
        else
        {
          window.flash.warning(this, 'Update success', response.data.data.message)
        }

      })
      .catch(error => {
        window.flash.error(this, 'Update success', error.message)
      })
    },


    reset(event) {
      event.preventDefault()
      this.role = null
      this.user = null
      window.functions.hideModal(this, 'editAssign')
    },
  }

}




</script>

