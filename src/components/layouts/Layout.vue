<template>
  <div>
    <Nav/>
    <div id="layoutSidenav">
      <Sidebar/>
      <div id="layoutSidenav_content">

        <slot/>

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
  name: 'Main',
  components: {
    Nav,
    Sidebar,
    Footer
  }
}

</script>
