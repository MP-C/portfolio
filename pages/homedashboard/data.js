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