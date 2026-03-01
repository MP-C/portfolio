async function updateWeather() {
    try {
        // Pedimos temperatura, humidade e vento para as coordenadas de Bruxelas
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=50.8503&longitude=4.3517&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m';
        const response = await fetch(url);
        const data = await response.json();
        
        const current = data.current;
        const temp = Math.round(current.temperature_2m);
        const hum = current.relative_humidity_2m;
        const wind = Math.round(current.wind_speed_10m);
        const code = current.weather_code;

        // Atualizar valores no HTML
        document.getElementById('temp-val').innerText = `${temp}°C`;
        document.getElementById('hum-val').innerText = `${hum}%`;
        document.getElementById('wind-val').innerText = `${wind} km/h`;

        // Lógica de ícone dinâmico baseada no Weather Code
        let iconClass = "fa-sun";
        if (code >= 1 && code <= 3) iconClass = "fa-cloud-sun";
        if (code >= 45 && code <= 48) iconClass = "fa-smog";
        if (code >= 51 && code <= 67) iconClass = "fa-cloud-showers-heavy";
        if (code >= 71 && code <= 77) iconClass = "fa-snowflake";
        if (code >= 80) iconClass = "fa-cloud-showers-water";

        const iconEl = document.querySelector('#weather-widget i.fa-temperature-high');
        if(iconEl) iconEl.className = `fas ${iconClass} text-primary`;

        const titleIconObj = document.getElementById('weather-icon-title');
        if (titleIconObj) {
            // Usamos innerHTML para criar a tag <i> com a cor do teu accent
            titleIconObj.innerHTML = `<i class="fas ${iconClass}" style="color:var(--accent); font-size: 0.8em; margin-left: 10px;"></i>`;
        }

    } catch (error) {
        console.error("Erro na meteo:", error);
        document.getElementById('temp-val').innerText = "N/A";
    }
}

// Monitorização Dinâmica
function updateStats() {
    const cpu = Math.floor(Math.random() * (12 - 4 + 1) + 4);
    const ram = Math.floor(Math.random() * (55 - 42 + 1) + 42);
    document.getElementById('cpu-load').innerText = cpu + '%';
    document.getElementById('ram-load').innerText = ram + '%';
}

const services = [
    { nome: "PiHole", url: "http://pihole.marioc.eu", icon: "🛡️", desc: "Network Ad-Blocker & DNS Security", category: "Network" },
    { nome: "Home Assistant", url: "http://homeassistance.marioc.eu", icon: "🏠", desc: "Smart Home Automation Hub", category: "IoT / Automation" },
    { nome: "Cloud", url: "https://cloud.marioc.eu", icon: "☁️", desc: "Personal Storage & File Sync", category: "Cloud Storage" },
    { nome: "WikiHome", url: "http://wiki.marioc.eu", icon: "📖", desc: "Internal Documentation Hub", category: "Knowledge Management" },
    { nome: "CookBook", url: "http://cookbook.marioc.eu", icon: "🍳", desc: "Digital Recipe Management System", category: "Self-Hosted App" },
    { nome: "NetFlex Cinema", url: "http://netflix.marioc.eu", icon: "🎬", desc: "Personal Media Streaming", category: "Media Server" }
];

const grid = document.getElementById('services-grid');

services.forEach(s => {
    grid.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
            <a href="${s.url}" target="_blank" class="glass-card">
                <div class="icon-wrapper">${s.icon}</div>
                <h4>${s.nome}</h4>
                <p class="small text-secondary flex-grow-1">${s.desc}</p>
                <span class="badge-dev">${s.category}</span>
            </a>
        </div>
    `;
});


// Inicializa e agenda
updateWeather();
setInterval(updateWeather, 900000); // 15 min
