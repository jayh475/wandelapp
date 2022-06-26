<template>
    <div id="map"></div>
</template>

<script lang="ts">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
export default {
    props: {
        cordinatess: Array
    },
    setup(props: any) {
        console.log('Header Title: ' + props.cordinatess)
    onMounted(() => {
        mapboxgl.accessToken =
        "pk.eyJ1IjoibWFybG8tMTIzIiwiYSI6ImNsMTBrODViZjBjcXgzY21zd25kb2VhNXoifQ.jqoL1zCCza3GZtjq67707A";
        const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: props.cordinatess[0],
        zoom: 16
        });
        map.on('load', () => {
        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': props.cordinatess
                }
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 8
            }
            });
        });
    });
    }
}
</script>

<style>
#map {
  height: 100%;
}
</style>