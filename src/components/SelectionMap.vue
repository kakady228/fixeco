<template>
    <div class="form-wrapper">
        <form @submit.prevent>
            <div class="form-group">
                <label for="inputAddress">Карта</label>
                <div id="map">

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

import GoogleMapLoader from '@/components/GoogleMapLoader.vue';


@Options({

    components: {
        GoogleMapLoader,
    },

    props: {
        modelsList: {
            type: Object,
            required: true,
        }
    }
})

export default class Map extends Vue {

    modelsList!: SelectionModel;

    created() {        
    }

    mounted() {
    }


    getCurrentMarker() {
        let marker = localStorage.getItem("currentMarker");
        console.log(marker);        
    }

}
</script>

<style lang="css">
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