document.addEventListener('DOMContentLoaded', function() {
    const endpoint = 'https://restcountries.com/v3.1/all';
    

    // Hacer la solicitud GET a la API
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de la API obtenidos correctamente:', data); // Verifica que los datos se obtengan correctamente
            const countries = data.slice(0, 20); // Tomar los primeros 20 países

            const select = document.getElementById('countrySelect');
            const countryInfoDiv = document.getElementById('countryInfo');

            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.translations.spa.common;
                select.appendChild(option);

                // Preparar la información detallada
                const countryDetails = `
                    <h2>${country.translations.spa.common}</h2>
                    <p><strong>Capital:</strong> ${country.capital[0]}</p>
                    <p><strong>Bandera:</strong> <img src="${country.flags.svg}" alt="Bandera de ${country.translations.spa.common}" style="width: 100px;"></p>
                    <p><strong>Ubicación:</strong> <a href="https://www.google.com/maps/place/${country.latlng[0]},${country.latlng[1]}" target="_blank">Ver en Google Maps</a></p>
                `;

                // Evento al seleccionar un país
                option.addEventListener('click', function() {
                    countryInfoDiv.innerHTML = countryDetails;
                });
            });
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
});