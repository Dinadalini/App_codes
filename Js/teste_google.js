function inicializarMapa() {
    const centro = { lat: -23.561684, lng: -46.655981 }; // Exemplo: Insper

    const mapa = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 15,
        center: centro,
        mapTypeId: 'roadmap'
    });

    new google.maps.Marker({
        position: centro,
        map: mapa,
        title: "Insper"
    });
}
 