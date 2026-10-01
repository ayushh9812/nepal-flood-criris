// DATA STRUCTURE: INFRASTRUCTURE MATRIX
const infrastructureData = [
    {
        id: "INF-01",
        title: "Rasuwagadhi Miteri Friendship Bridge & Dry Port",
        category: "p1",
        horizon: "Priority 1 (0-30 Days)",
        desc: "Complete washing away of international border bridge and customs infrastructure connecting Nepal & China. Re-establishing emergency bailey bridge for international trade.",
        estCost: "NPR 12.5 Billion",
        status: "Emergency Tender Issued"
    },
    {
        id: "INF-02",
        title: "Trishuli 3A & 3B Hydro Substation Restoration",
        category: "p1",
        horizon: "Priority 1 (0-30 Days)",
        desc: "Severe debris burial of transmission lines and sub-station transformers. Essential to clear 1,100 MW power shortage before winter dry season.",
        estCost: "NPR 28.4 Billion",
        status: "Debris Excavation Underway"
    },
    {
        id: "INF-03",
        title: "Pasang Lhamu Highway (Syabrubesi-Rasuwagadhi)",
        category: "p1",
        horizon: "Priority 1 (0-30 Days)",
        desc: "24 km total road track washed out into Bhotekoshi river. Isolates upper Rasuwa communities from essential food and emergency medical supplies.",
        estCost: "NPR 18.2 Billion",
        status: "Nepal Army Track Clearing"
    },
    {
        id: "INF-04",
        title: "Upper Trishuli-1 Hydropower Headworks & Tunnel Adit 3",
        category: "p2",
        horizon: "Priority 2 (30-90 Days)",
        desc: "Restoration of flooded adit tunnels, heavy mud clearing, and heavy equipment extraction following 204 missing worker emergency search.",
        estCost: "NPR 45.0 Billion",
        status: "Search & Clearance Phase"
    },
    {
        id: "INF-05",
        title: "18 Destroyed Public Schools Across 5 Districts",
        category: "p2",
        horizon: "Priority 2 (30-90 Days)",
        desc: "Construction of temporary learning centers (TLCs) and permanent earthquake-resistant educational structures for over 12,000 displaced children.",
        estCost: "NPR 4.23 Billion",
        status: "Site Assessment"
    },
    {
        id: "INF-06",
        title: "Nepal Telecom & Ncell 198 Damaged Tower Matrix",
        category: "p3",
        horizon: "Priority 3 (90-365 Days)",
        desc: "Long-term microwave transmission backbone rebuilding and fiber optical replacement along northern trade corridors.",
        estCost: "NPR 88.51 Billion",
        status: "Planning & Sourcing"
    }
];

// DATA STRUCTURE: MISSING PERSONS DIRECTORY
const missingPersonsData = [
    { id: "MP-9081", name: "Lhakpa Norbu Sherpa", nationality: "Nepali", location: "Timure Customs Point", status: "Missing", dna: "DNA-R2026-089" },
    { id: "MP-9082", name: "Wang Wei", nationality: "Chinese", location: "Upper Trishuli-1 Adit 3 Tunnel", status: "Missing", dna: "DNA-R2026-112" },
    { id: "MP-9083", name: "Pasang Tamang", nationality: "Nepali", location: "Syabrubesi Bus Station", status: "Missing", dna: "DNA-R2026-145" },
    { id: "MP-9084", name: "Pierre Dubois", nationality: "French", location: "Langtang Trekking Route / Lirung", status: "Missing", dna: "DNA-R2026-204" },
    { id: "MP-9085", name: "Sita Devi Ghale", nationality: "Nepali", location: "Rasuwa Mailung Bazaar", status: "Recovered / Identified", dna: "Matched (Handed over)" }
];

// HANDLE DIRECT GOVERNMENT EMAIL DISPATCH
function handleGovMail(e) {
    e.preventDefault();
    
    const recipient = document.getElementById('recipientEmail').value;
    const name = document.getElementById('senderName').value;
    const senderEmail = document.getElementById('senderEmail').value;
    const phone = document.getElementById('senderPhone').value;
    const category = document.getElementById('mailCategory').value;
    const subject = document.getElementById('mailSubject').value;
    const message = document.getElementById('mailMessage').value;

    const fullSubject = encodeURIComponent(`[${category}] ${subject} - From: ${name}`);
    const fullBody = encodeURIComponent(
        `OFFICIAL DISPATCH VIA NEPAL FLOOD RECOVERY PORTAL\n` +
        `--------------------------------------------------\n` +
        `SENDER NAME: ${name}\n` +
        `SENDER EMAIL: ${senderEmail}\n` +
        `CONTACT PHONE: ${phone}\n` +
        `CATEGORY: ${category}\n` +
        `RECIPIENT DEPARTMENT: ${recipient}\n` +
        `--------------------------------------------------\n\n` +
        `MESSAGE / PROPOSAL:\n${message}\n\n` +
        `--------------------------------------------------\n` +
        `Timestamp: ${new Date().toLocaleString()}\n` +
        `Nepal Disaster Reconstruction Secretariat`
    );

    // Launch Native Mail Client
    window.location.href = `mailto:${recipient}?subject=${fullSubject}&body=${fullBody}`;
    
    alert(`Redirecting to your default email application to complete sending to ${recipient}.`);
}

// RENDER INFRASTRUCTURE CARDS
function renderInfrastructure(items) {
    const grid = document.getElementById('infraGrid');
    grid.innerHTML = '';

    items.forEach(item => {
        const badgeClass = item.category === 'p1' ? 'badge-p1' : (item.category === 'p2' ? 'badge-p2' : 'badge-p3');
        const card = document.createElement('div');
        card.className = 'infra-card';
        card.innerHTML = `
            <div>
                <div class="infra-header">
                    <span class="${badgeClass}">${item.horizon}</span>
                    <small style="color: var(--text-muted);">${item.id}</small>
                </div>
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
            <div class="infra-meta">
                <span>Est. Cost: <strong>${item.estCost}</strong></span>
                <span>Status: <strong style="color:#60a5fa;">${item.status}</strong></span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// RENDER MISSING PERSONS TABLE
function renderMissingPersons(items) {
    const tbody = document.getElementById('missingTableBody');
    tbody.innerHTML = '';

    items.forEach(person => {
        const tr = document.createElement('tr');
        const statusColor = person.status.includes('Recovered') ? '#4ade80' : '#f87171';
        tr.innerHTML = `
            <td><strong>${person.id}</strong></td>
            <td>${person.name}</td>
            <td>${person.nationality}</td>
            <td>${person.location}</td>
            <td style="color: ${statusColor}; font-weight:600;">${person.status}</td>
            <td><code>${person.dna}</code></td>
        `;
        tbody.appendChild(tr);
    });
}

// FILTER INFRASTRUCTURE BY SEARCH
function filterInfra() {
    const query = document.getElementById('infraSearch').value.toLowerCase();
    const filtered = infrastructureData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
    );
    renderInfrastructure(filtered);
}

// FILTER INFRASTRUCTURE BY CATEGORY
function filterCategory(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (cat === 'all') {
        renderInfrastructure(infrastructureData);
    } else {
        const filtered = infrastructureData.filter(item => item.category === cat);
        renderInfrastructure(filtered);
    }
}

// SEARCH MISSING PERSONS
function searchMissing() {
    const query = document.getElementById('missingSearch').value.toLowerCase();
    const filtered = missingPersonsData.filter(person => 
        person.name.toLowerCase().includes(query) || 
        person.location.toLowerCase().includes(query) ||
        person.nationality.toLowerCase().includes(query) ||
        person.id.toLowerCase().includes(query)
    );
    renderMissingPersons(filtered);
}

// TAB SWITCHER
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// COPY UTILITY
function copyText(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard: ' + text);
}

// LANGUAGE TOGGLE (EN / NEP)
let currentLang = 'en';
function toggleLanguage() {
    if (currentLang === 'en') {
        document.getElementById('txt-title').innerText = "नेपाल सरकार";
        document.getElementById('txt-subtitle').innerText = "प्रधानमन्त्री दैवी प्रकोप उद्धार तथा पुनर्निर्माण कोष";
        document.getElementById('hero-heading').innerText = "भोटेकोशी तथा रसुवा विपद् पुनर्निर्माण र उद्धार पोर्टल";
        document.getElementById('hero-desc').innerText = "२०८३ भदौ १० (२६ अगस्ट २०२६) मा लामटाङ लिरुङ हिमशिखरबाट गएको लेदो र पहिरोका कारण भएको क्षति पश्चात् नेपाल सरकारद्वारा राहत तथा पुनर्निर्माण कार्य तीव्र पारिएको छ।";
        document.getElementById('lang-btn-text').innerText = "English";
        currentLang = 'ne';
    } else {
        document.getElementById('txt-title').innerText = "Government of Nepal";
        document.getElementById('txt-subtitle').innerText = "Prime Minister's Disaster Relief & Reconstruction Secretariat";
        document.getElementById('hero-heading').innerText = "Bhotekoshi & Rasuwa Catastrophic Flood Reconstruction & Relief Portal";
        document.getElementById('hero-desc').innerText = "Following the glacial collapse and rock-ice avalanche from the Langtang Lirung massif on August 26, 2026, the Government of Nepal is coordinating immediate emergency relief, search operations, and critical infrastructure reconstruction across all affected river corridors.";
        document.getElementById('lang-btn-text').innerText = "नेपाली";
        currentLang = 'en';
    }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderInfrastructure(infrastructureData);
    renderMissingPersons(missingPersonsData);
});