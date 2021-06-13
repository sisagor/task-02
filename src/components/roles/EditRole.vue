<template>
  <div>
    <b-form @submit.prevent="createRole" @reset="reset">
        <b-form-group id="name" label="Name:" label-for="name">
          <b-form-input
              id="name"
              label="Name:"
              v-model="name"
              type="text"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="description" label="Description:" label-for="description">
          <b-form-input
              id="description"
              v-model="description"
              placeholder="Enter description"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="level" label="Level:" label-for="level">
          <b-form-input
              id="level"
              v-model="level"
              placeholder="Enter Level"
              required
          ></b-form-input>
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
  name:'EditRole',
  props: ['item'],

  data(){
    return {
      name : this.item.name,
      description : this.item.description,
      level : this.item.level,
    }

  },


  methods:{

    createRole(){

      axios.post(window.config.baseUrl + 'role/update/' + this.item.id,
          {
            name:this.name, description:this.description, level:this.level,
          },
          { headers: {
                'Authorization': 'Bearer ' + this.$session.get('token')
              }
          }
      )
      .then(response => {

        if (response.data.status){
          window.flash.success(this, 'Update success', 'Role updated successfully.')
          window.functions.hideModal(this, 'editRole');
          window.functions.lazyReload()
        }
        else
        {
          window.flash.error(this, 'Update failed', 'Role update failed.')
        }

      })
      .catch(error => {
        window.flash.error(this, 'Failed', error.message)
      })
    },

    reset(event) {
      event.preventDefault()
      this.name = ''
      this.description = null
      this.level = null
      window.functions.hideModal(this, 'editRole');
    },

  }

}

</script>

