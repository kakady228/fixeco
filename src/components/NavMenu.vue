<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light shadow">
        <div class="container-fluid d-flex">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <router-link to="/" class="navbar-brand rectangle-nav align-middle lh-sm" href="#"><img src="../assets/free-icon-cogwheel.png" alt="Logo" class="me-2">FixEco</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                    <span> 
                        <img src="../assets/map-marker.svg" alt="marker"> 
                    </span> 
                    Автосервисы на карте
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="tel:89966931101">
                    <span> 
                        <img src="../assets/phone.svg" alt="marker"> 
                    </span> 
                    8 (996) 693-11-01
                </a>
              </li>
            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0 mr-0 ml-auto">
                <li class="nav-tem">
                    <router-link to="/" class="nav-link">Ремонт авто</router-link>
                </li>
                <li class="nav-tem">
                    <router-link to="/reviews" class="nav-link">Отзывы</router-link>
                </li>
                <li v-if="!user.id" class="nav-tem">
                    <router-link to="/login" class="nav-link">Войти</router-link>
                </li>
                <li v-else class="nav-tem">
                    <router-link to="/profile" class="btn btn-link"><img src="../assets/account_circle.svg" alt=""></router-link>
                </li>
            </ul>
          </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class NavMenu extends Vue {

  user: any = {
    id: '',
    name: '',
  };

  mounted() {
    // console.log('NavMenu', this.user);
    
    setInterval(() => {

      // console.log('NavMenu', document.cookie);

      let userName = document.cookie.match('(^|;) ?' + 'name' + '=([^;]*)(;|$)');
      let userId = document.cookie.match('(^|;) ?' + 'id' + '=([^;]*)(;|$)');

      if(userId) {
          this.user = {
          id: this.$store.getters.USER.id,
          name: this.$store.getters.USER.name
        }
      localStorage.setItem('userId', this.$store.getters.USER.id);
      }
      
      
    }, 5000);
    
  }

  logout() {
    let name = 'name';
    let value = this.user.name;
    let nameId = 'id';
    let id = this.user.id;

    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; path=/; max-age=-1";
    document.cookie = encodeURIComponent(nameId) + '=' + encodeURIComponent(id) + "; path=/; max-age=-1";

    window.localStorage.setItem('userId', 'undefined');

    window.location.reload();
  }

}
</script>

<style>

.btn-link {
    font-weight: 400;
    color: rgba(0,0,0,.55);
    text-decoration: none;
}

</style>