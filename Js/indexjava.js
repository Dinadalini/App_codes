let map, directionsService, directionsRenderer;

        function initMap() {
            const insper = { lat: -23.597, lng: -46.685 };

            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: insper,
            });

            new google.maps.Marker({
                position: insper,
                map: map,
            });

            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            const params = new URLSearchParams(window.location.search);
            const rota = params.get("rota");

            if (rota === "pinheiros") {
                calcularRota([
                    { lat: -23.597, lng: -46.685 },
                    "Rua dos Pinheiros, São Paulo"
                ]);
            } else if (rota === "dona_rosa") {
                calcularRota([
                    { lat: -23.597, lng: -46.685 },
                    "Pizzaria Dona Rosa, São Paulo",
                    "Rua dos Pinheiros, São Paulo"
                ]);
            }
        }

        function calcularRota(pontos) {
            const waypoints = pontos.slice(1, -1).map(endereco => ({
                location: endereco,
                stopover: true
            }));

            directionsService.route(
                {
                    origin: pontos[0],
                    destination: pontos[pontos.length - 1],
                    waypoints,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(response);

                        const legs = response.routes[0].legs;
                        let totalDist = 0;
                        let totalTime = 0;

                        legs.forEach((leg) => {
                            totalDist += leg.distance.value;
                            totalTime += leg.duration.value;
                        });

                        const distancia = (totalDist / 1000).toFixed(1) + " km";
                        const duracao = Math.floor(totalTime / 60) + " min";

                        const infoBox = document.createElement("div");
                        infoBox.className = "info-box";
                        infoBox.innerText = `Tempo estimado: ${duracao} • Distância: ${distancia}`;
                        document.body.appendChild(infoBox);
                    } else {
                        alert("Erro ao calcular rota: " + status);
                    }
                }
            );
        }

        window.initMap = initMap;