<template>
  <div>
    <!--Nav  -->
    <Nav/>

    <div id="layoutSidenav">
      <!--Sidebar  -->
      <Sidebar/>

      <div id="layoutSidenav_content">
        <!--Flash Message  -->
        <FlashMessage position="top"></FlashMessage>
        <!--Dynamic content slot  -->
        <slot/>
        <!--Footer  -->
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>

import Nav from '../partials/Nav.vue'
import Sidebar from '../partials/Sidebar.vue'
import Footer from '../partials/Footer.vue'

export default {
  name: 'Layout',
  components: {
    Nav,
    Sidebar,
    Footer
  },

  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },


}

</script>
