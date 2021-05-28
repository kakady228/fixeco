<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import GoogleMapsApiLoader from 'google-maps-api-loader';

export default class GoogleMapLoader extends Vue {

mapConfig!: Object;
apiKey!: String;


google: any = null;
map: any = null;

    async mounted() {
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: this.apiKey
        })

        this.google = googleMapApi
    this.initializeMap()
    };


    initializeMap() {
        const mapContainer = this.$refs.googleMap
        this.map = new this.google.maps.Map(
            mapContainer, this.mapConfig
        )
    }
  
}

</script>