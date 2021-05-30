<template>
    <div class="form-wrapper">
        <form @submit.prevent>
            <div class="form-group">
                <label for="inputAddress" class="mb-3">Выберите нужный автосервис</label>
                <div id="map" class="mb-3">

                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="getCurrentMarker">Продолжить</button>
            
        </form>


    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

//Emitter
import SelectionModel from '@/Models/SelectionModel';
import { useGeolocation } from '@/useGeolocation';
import { computed, ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAZ4949DA7kyuOft-8dQ-vLRauqbAdXx-0';

@Options({

    components: {
    },
})

export default class Map extends Vue {

    currPos: any = {
        value: {
            lat: 0,
            lng: 0
        }
    };
    mapDiv: any;


    created() {
        const { coords } = useGeolocation();

        console.log("COORDS", coords);
        
        
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude,
        }));

        console.log('currPos: ', currPos);

        onMounted(async () => {
        
            this.mapDiv = ref(null);

            const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });

            await loader.load();

            setTimeout(() => {
                var map = new google.maps.Map(document.getElementById("map"), {
                    center: currPos.value,
                    zoom: 14
                });

                
                var coordinates = {lat: 56.8703515, lng: 53.1751202};
                var goodAutoCoords = {lat: 56.87103881526579, lng: 53.192616399510186};
                var castrolServiceCoords = {lat: 56.82480855872474, lng: 53.20691362307319};
                
                var currentMarker = '1';

                // Marker 1
                var marker1 = new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    animation: google.maps.Animation.DROP ,
                    title: 'Заголовок'
                });
                marker1.addListener('click', function () {
                    marker1.info.open(map, marker1);
                    currentMarker = '0';
                    localStorage.setItem("currentMarker", currentMarker);
                });
                marker1.info = new google.maps.InfoWindow({
                    content: 'Add some info here Marker 1',
                });
                // End Marker 1

                // goodAutoMarker 
                var goodAutoMarker = new google.maps.Marker({
                    position: goodAutoCoords,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: 'Заголовок1'
                });
                goodAutoMarker.addListener('click', function () {
                    goodAutoMarker.info.open(map, goodAutoMarker);
                    currentMarker = '1';
                    localStorage.setItem("currentMarker", currentMarker);
                });
                goodAutoMarker.info = new google.maps.InfoWindow({
                    content: 'goodAutoMarker',
                });
                // End goodAutoMarker

                // Marker 3
                var castrolServiceMarker = new google.maps.Marker({
                    position: castrolServiceCoords,
                    map: map,
                    animation: google.maps.Animation.DROP ,
                    title: 'Заголовок2'
                });
                castrolServiceMarker.addListener('click', function () {
                    castrolServiceMarker.info.open(map, castrolServiceMarker);
                    currentMarker = '2';
                    localStorage.setItem("currentMarker", currentMarker);
                });
                castrolServiceMarker.info = new google.maps.InfoWindow({
                    content: 'castrolServiceMarker',
                });
                // End Marker 3

                this.currPos = coords;
                console.log('Sadasdsadsadasdasd: ', this.currPos);
            }, 1000);
        })

    }

    mounted() {
    }


    getCurrentMarker() {
        let marker = localStorage.getItem("currentMarker");
        console.log(marker);        
    }

}
</script>

<style lang="css" scoped>

    #map{
          height: 400px;
          width: 100%;
    }

    .form-wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        border-radius: .5em;
        margin-top: 1rem;
        padding: 2rem;
        -webkit-box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
    }

</style>