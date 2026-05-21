const BESTIARY_DATA = [
    { id: 'JS', 
        name: 'James Sunderland', 
        type: 'Human', 
        image: 'James_Sunderland.webp', 
        desc: 'The protagonist. James Sunderland is a grief-stricken widower who enters the town after receiving a letter from his deceased wife, Mary. Driven by a desperate need for closure, his journey is a descent into his own subconscious' },
    { id: 'PH', 
        name: 'Pyramid Head', 
        type: 'Executioner', 
        image: 'Red_pyramid.webp', 
        desc: 'Pyramid Head is a silent, hulking executioner defined by the rusted, angular metal helmet that obscures his face. A physical manifestation of James Sunderland’s repressed guilt and desire for punishment, he relentlessly stalks his victim with a massive "Great Knife," serving as an immortal judge who only vanishes once the truth of one\'s sins is fully accepted.' },
    { id: 'MA', 
        name: 'Maria', 
        type: 'Desire', 
        image: 'Maria_SH_2.webp', 
        desc: 'Maria is a provocative, more vibrant doppelgänger of James’s late wife, Mary. Created by the town to tease and torment him, she embodies James’s idealized desires' },
    { id: 'BN', 
        name: 'Bubble Head Nurse', 
        type: 'Stalker', 
        image: 'nurse.webp', 
        desc: 'The Bubble Head Nurses are twitching, sexualized figures with obscured, bloated faces. They represent James’s repressed sexual frustration and the cold, clinical horror of his wife’s longterm hospitalization.' },
    { id: 'AD', 
        name: 'Abstract Daddy', 
        type: 'Boss', 
        image: 'Abstractsh2.webp', 
        desc: 'The Abstract Daddy is a disturbing manifestation of Angela Orosco’s past trauma, appearing as two figures fused onto a bed-like frame draped in fleshy skin. It represents the domestic claustrophobia and horrific cycles of abuse she suffered.' },
    { id: 'MY', 
        name: 'Mary (Monster)', 
        type: 'Boss', 
        image: 'MariaBossForm.webp', 
        desc: 'Mary\'s monster form is a tragic, distorted figure trapped within a rusted, cage-like frame that mirrors her final days of illness. Suspended in the air and lashing out with whip-like tentacles, she represents James’s conflicting emotions.' },
    { id: 'FL',
        name: 'Flesh Lip', 
        type: 'boss', 
        image: 'LustfulLips.webp', 
        desc: 'Flesh Lip is a grotesque mass of skin and muscle encased in a vertical metal frame. Hanging from the ceiling, it represents James’s feelings of being trapped and the suffocating, "caged" nature of Mary’s hospital confinement.' },
    { id: 'MN',
        name: 'Mannequin', 
        type: 'Ambush', 
        image: 'Mannequin.webp', 
        desc: 'Composed of two pairs of mannequin legs fused at the waist, these creatures react to light and proximity. They embody James’s base sexual urges and the objectification of the female form.' },
    { id: 'LF',
        name: 'Lying Figure', 
        type: 'Grunt', 
        image: 'SH2LyingFigure.webp', 
        desc: 'A humanoid trapped in a straitjacket of its own flesh that squirms along the ground. It represents the internal agony and suffocating confinement James felt while watching his wife suffer.' },
    { id: 'MN',
        name: 'Mandarin', 
        type: 'Ranged', 
        image: 'Mandarin.webp', 
        desc: 'A creature that hangs from grates beneath the floor, reaching upward with oversized, tube-like arms. It symbolizes feelings of overwhelming, stifled anguish and the inability to move forward.' },
    { id: 'ED',
        name: 'Eddie Dombrowski', 
        type: 'Human', 
        image: 'Eddie.webp', 
        desc: 'A young man driven to a breaking point by lifelong bullying. He represents the volatile transition from victim to aggressor, using violence to silence anyone he perceives is mocking him.' },
    { id: 'AO',
        name: 'Angela Orosco', 
        type: 'Human', 
        image: 'Angela_SH2.webp', 
        desc: 'A deeply traumatized woman searching for her mother. Her journey is a tragic reflection of survival and despair, with the world around her constantly manifesting as a literal fire fueled by her history of abuse.' },
    { id: 'LA',
        name: 'Laura', 
        type: 'Human', 
        image: 'Lauraprofile.webp', 
        desc: 'A bratty but innocent eight-year-old who knew Mary in the hospital. Because she harbors no adult guilt or darkness, she sees the town as completely normal and remains untouched by its monsters.' },
    
    ];

const LOCATIONS_DATA = [
  { "name": "East South Vale", "desc": "The fog-thickened streets where James's journey into the town begins." },
  { "name": "Wood Side Apartments", "desc": "A labyrinthine, decaying apartment complex where James first encounters Pyramid Head." },
  { "name": "Blue Creek Apartments", "desc": "A mirrored residential nightmare where James faces a tense showdown with Pyramid Head." },
  { "name": "West South Vale", "desc": "An alternate side of town where James meets Maria at Rosewater Park." },
  { "name": "Brookhaven Hospital", "desc": "A disturbing medical facility overrun by grotesque nurses and buried secrets." },
  { "name": "Otherworld Brookhaven Hospital", "desc": "A rusted, blood-soaked shift of the hospital that warps reality further." },
  { "name": "Silent Hill Historical Society", "desc": "A museum containing ominous paintings and a descent into impossible depths." },
  { "name": "Toluca Prison", "desc": "An oppressive subterranean jail filled with execution scaffolds and heavy dread." },
  { "name": "The Labyrinth", "desc": "An abstract maze of endless corridors where James confronts Angela and Eddie." },
  { "name": "Toluca Lake", "desc": "A misty, silent expanse rowed across to reach a long-lost promise." },
  { "name": "Lakeview Hotel", "desc": "The beautiful lakeside resort that serves as James and Mary's 'Special Place.'" },
  { "name": "Otherworld Lakeview Hotel", "desc": "A burnt, waterlogged ruin where the ultimate truth is finally unveiled." }

];

document.addEventListener('DOMContentLoaded', () => {
    setupFog();
    setupTabs();
    
    // Load Bestiary
    const grid = document.getElementById('invGrid');
    const detail = document.getElementById('invDetail');
    const countDisplay = document.getElementById('hudCount');
    let viewed = new Set();
    countDisplay.innerText = `0 / ${BESTIARY_DATA.length} EXAMINED`;

    BESTIARY_DATA.forEach(item => {
        const slot = document.createElement('div');
        slot.className = 'inv-slot';
        slot.innerHTML = `<div style="color:#222; font-size:9px; padding:4px;">${item.id}</div>`;
        slot.onclick = () => {
            viewed.add(item.id);
            countDisplay.innerText = `${viewed.size} / ${BESTIARY_DATA.length} EXAMINED`;
            document.querySelectorAll('.inv-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            detail.innerHTML = `
                <div style="padding: 40px; animation: fadeIn 0.5s ease;">
                    <img src="${item.image}" style="width:200px; border: 1px solid var(--rust2); margin-bottom:20px;">
                    <h2 style="font-family:'Special Elite'; color:var(--rust2);">${item.name}</h2>
                    <p style="color:#555; font-family:'Share Tech Mono'; font-size:12px; margin-bottom:15px;">CLASS: ${item.type}</p>
                    <p style="font-style:italic; color:#aaa; line-height:1.6;">${item.desc}</p>
                </div>`;
        };
        grid.appendChild(slot);
    });

    // Load Locations
    const locBox = document.getElementById('locList');
    LOCATIONS_DATA.forEach(loc => {
        const div = document.createElement('div');
        div.className = 'lore-block'; // Reusing lore style for simplicity
        div.innerHTML = `<h3 style="font-family:'Special Elite'; color:var(--rust2);">${loc.name}</h3><p>${loc.desc}</p>`;
        locBox.appendChild(div);
    });
});

// --- HELPER FUNCTIONS ---
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn, .tab-panel').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        };
    });
}

function setupFog() {
    const canvas = document.getElementById('fogCanvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.onresize = resize; resize();

    const clouds = Array.from({ length: 40 }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: 150 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.1, a: 0.01 + Math.random() * 0.04
    }));

    function draw() {
        ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, W, H);
        clouds.forEach(c => {
            c.x += c.vx; c.y += c.vy;
            if (c.x < -c.r) c.x = W + c.r;
            if (c.x > W + c.r) c.x = -c.r;
            let g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
            g.addColorStop(0, `rgba(100, 95, 85, ${c.a})`); g.addColorStop(1, 'transparent');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}