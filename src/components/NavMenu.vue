<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light shadow">
        <div class="container-fluid d-flex">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <router-link to="/" class="navbar-brand align-middle" href="#"><img src="../assets/gear.svg" alt="Logo">FixEco</router-link>
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
                    <router-link to="/" class="nav-link">Отзывы</router-link>
                </li>
                <li class="nav-tem">
                    <router-link to="/login" class="nav-link">Войти</router-link>
                </li>
            </ul>
          </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class NavMenu extends Vue {}
</script>

<style>


</style>