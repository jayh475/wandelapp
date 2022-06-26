const  gpsTracker = (coordinates: any) => {
    navigator.geolocation.watchPosition(
        data => {
            console.log(data)
            coordinates.push([data.coords.longitude, data.coords.latitude]);
            window.localStorage.setItem('coordinates', JSON.stringify(coordinates));
        },
        error => console.log(error),
        {
            enableHighAccuracy: true
        }
    )
} 

export default gpsTracker;

