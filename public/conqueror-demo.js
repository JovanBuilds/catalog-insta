const eras = [
  'Nahua/Maya',
  'Conquista',
  'Independencia',
  'Revolución',
  'México moderno'
];

const buildingCatalog = {
  Cuartel: { cost: { food: 30, wood: 40 }, hp: 90 },
  'Galería de tiro': { cost: { food: 25, wood: 45 }, hp: 80 },
  Establos: { cost: { food: 40, wood: 35 }, hp: 85 },
  Templo: { cost: { food: 30, stone: 50 }, hp: 110 },
  Taller: { cost: { wood: 60, stone: 30 }, hp: 95 }
};

const unitCatalog = {
  Infantería: { cost: { food: 20, wood: 5 }, hp: 55, atk: 12, range: 1, speed: 1 },
  Arquero: { cost: { food: 18, wood: 12 }, hp: 45, atk: 10, range: 3, speed: 1 },
  Caballería: { cost: { food: 24, wood: 16 }, hp: 70, atk: 15, range: 1, speed: 2 },
  Chamán: { cost: { food: 22, stone: 10 }, hp: 50, atk: 8, range: 2, speed: 1, heal: 6 }
};

const GRID_SIZE = 12;
const playerBase = { x: 2, y: GRID_SIZE - 3 };
const enemyBase = { x: GRID_SIZE - 3, y: 2 };

const state = {
  eraIndex: 0,
  resources: { food: 220, wood: 180, gold: 120, stone: 110 },
  buildings: [
    { type: 'Centro ceremonial', hp: 160, x: playerBase.x, y: playerBase.y },
    { type: 'Chinampa', hp: 90, x: playerBase.x + 1, y: playerBase.y }
  ],
  units: [],
  enemyUnits: [],
  enemyBaseHp: 160,
  log: [],
  selectedBuilding: 'Cuartel',
  loop: null
};

function createId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

const gridEl = document.getElementById('grid');
const resourceGridEl = document.getElementById('resource-grid');
const buildingButtonsEl = document.getElementById('building-buttons');
const unitButtonsEl = document.getElementById('unit-buttons');
const logEl = document.getElementById('log');
const resultsEl = document.getElementById('status-list');
const eraSelectEl = document.getElementById('era-select');
const startButton = document.getElementById('start-skirmish');
const resetButton = document.getElementById('reset-demo');
const advanceEraButton = document.getElementById('advance-era');

function init() {
  renderEras();
  renderResources();
  renderBuildingButtons();
  renderUnitButtons();
  renderGrid();
  renderStatus();
  log('Demo lista: coloca edificios y entrena tropas.');

  startButton.addEventListener('click', startSkirmish);
  resetButton.addEventListener('click', resetDemo);
  advanceEraButton.addEventListener('click', () => {
    if (state.eraIndex < eras.length - 1) {
      state.eraIndex += 1;
      log(`Nueva era: ${eras[state.eraIndex]}`);
      renderEras();
      renderStatus();
    }
  });
}

function renderEras() {
  eraSelectEl.innerHTML = '';
  eras.forEach((era, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = era;
    if (idx === state.eraIndex) option.selected = true;
    eraSelectEl.appendChild(option);
  });
}

function renderResources() {
  resourceGridEl.innerHTML = '';
  Object.entries(state.resources).forEach(([key, value]) => {
    const div = document.createElement('div');
    div.className = 'resource';
    div.innerHTML = `<label>${key}</label><strong>${value}</strong>`;
    resourceGridEl.appendChild(div);
  });
}

function renderBuildingButtons() {
  buildingButtonsEl.innerHTML = '';
  Object.entries(buildingCatalog).forEach(([name, info]) => {
    const button = document.createElement('button');
    button.innerHTML = `${name}<small>${formatCost(info.cost)}</small>`;
    button.addEventListener('click', () => {
      state.selectedBuilding = name;
      log(`Seleccionaste ${name}. Haz clic en una celda libre para construir.`);
    });
    buildingButtonsEl.appendChild(button);
  });
}

function renderUnitButtons() {
  unitButtonsEl.innerHTML = '';
  Object.entries(unitCatalog).forEach(([name, info]) => {
    const button = document.createElement('button');
    button.innerHTML = `${name}<small>${formatCost(info.cost)}</small>`;
    button.addEventListener('click', () => recruitUnit(name));
    unitButtonsEl.appendChild(button);
  });
}

function renderGrid() {
  gridEl.innerHTML = '';
  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      if (y >= GRID_SIZE - 4) tile.classList.add('player-zone');
      if (y <= 3) tile.classList.add('enemy-zone');
      const content = document.createElement('div');
      content.className = 'content';
      tile.appendChild(content);
      tile.addEventListener('click', () => handleTileClick(x, y));
      gridEl.appendChild(tile);
    }
  }
  paintEntities();
}

function handleTileClick(x, y) {
  const isOccupied = state.buildings.some(b => b.x === x && b.y === y) ||
    state.units.some(u => u.x === x && u.y === y) ||
    (playerBase.x === x && playerBase.y === y) ||
    (enemyBase.x === x && enemyBase.y === y);

  if (isOccupied) {
    log('Esa celda ya está ocupada.');
    return;
  }

  buildAt(x, y);
}

function buildAt(x, y) {
  const blueprint = buildingCatalog[state.selectedBuilding];
  if (!blueprint) return;
  if (!hasCost(blueprint.cost)) {
    log('Recursos insuficientes para construir.');
    return;
  }
  payCost(blueprint.cost);
  state.buildings.push({ type: state.selectedBuilding, hp: blueprint.hp, x, y });
  log(`Construiste ${state.selectedBuilding} en (${x}, ${y}).`);
  renderResources();
  paintEntities();
  renderStatus();
}

function recruitUnit(type) {
  const blueprint = unitCatalog[type];
  if (!blueprint) return;
  if (!hasCost(blueprint.cost)) {
    log('Recursos insuficientes para entrenar.');
    return;
  }

  payCost(blueprint.cost);
  const spawnX = playerBase.x;
  const spawnY = playerBase.y + 1;
  state.units.push({
    id: createId('ally'),
    type,
    hp: blueprint.hp,
    atk: blueprint.atk,
    range: blueprint.range,
    speed: blueprint.speed,
    heal: blueprint.heal || 0,
    x: spawnX,
    y: spawnY
  });
  log(`Entrenaste ${type}.`);
  renderResources();
  paintEntities();
  renderStatus();
}

function formatCost(cost) {
  return Object.entries(cost).map(([k, v]) => `${k}: ${v}`).join(' • ');
}

function hasCost(cost) {
  return Object.entries(cost).every(([key, value]) => (state.resources[key] || 0) >= value);
}

function payCost(cost) {
  Object.entries(cost).forEach(([key, value]) => {
    state.resources[key] = (state.resources[key] || 0) - value;
  });
}

function paintEntities() {
  const tiles = gridEl.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.innerHTML = '<div class="content"></div>';
  });

  state.buildings.forEach(building => {
    const idx = building.y * GRID_SIZE + building.x;
    const tile = tiles[idx];
    if (!tile) return;
    tile.querySelector('.content').textContent = building.type[0];
    addBadge(tile, 'Edi');
    addChip(tile, `${building.hp}hp`);
  });

  state.units.forEach(unit => {
    const idx = unit.y * GRID_SIZE + unit.x;
    const tile = tiles[idx];
    if (!tile) return;
    tile.querySelector('.content').textContent = unit.type[0];
    addBadge(tile, 'Ali');
  });

  state.enemyUnits.forEach(unit => {
    const idx = unit.y * GRID_SIZE + unit.x;
    const tile = tiles[idx];
    if (!tile) return;
    tile.querySelector('.content').textContent = unit.type[0];
    addBadge(tile, 'En');
    tile.querySelector('.content').style.color = '#f87171';
  });

  addBase(tiles, playerBase, 'Base aliada');
  addBase(tiles, enemyBase, `Base enemiga (${state.enemyBaseHp}hp)`);
}

function addBase(tiles, base, label) {
  const idx = base.y * GRID_SIZE + base.x;
  const tile = tiles[idx];
  if (!tile) return;
  tile.querySelector('.content').textContent = '◎';
  addBadge(tile, label);
}

function addBadge(tile, text) {
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = text;
  tile.appendChild(badge);
}

function addChip(tile, text) {
  const chip = document.createElement('span');
  chip.className = 'chip';
  chip.textContent = text;
  tile.appendChild(chip);
}

function log(message) {
  const entry = { message, time: new Date() };
  state.log.unshift(entry);
  state.log = state.log.slice(0, 10);
  logEl.innerHTML = '';
  state.log.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.message}</span><time>${item.time.toLocaleTimeString()}</time>`;
    logEl.appendChild(li);
  });
}

function renderStatus() {
  const items = [
    `Era: ${eras[state.eraIndex]}`,
    `Edificios: ${state.buildings.length}`,
    `Unidades: ${state.units.length}`,
    `Enemigos: ${state.enemyUnits.length}`,
    `HP base enemiga: ${state.enemyBaseHp}`
  ];
  resultsEl.innerHTML = '';
  items.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    resultsEl.appendChild(li);
  });
}

function resetDemo() {
  clearInterval(state.loop);
  state.loop = null;
  state.eraIndex = 0;
  state.resources = { food: 220, wood: 180, gold: 120, stone: 110 };
  state.buildings = [
    { type: 'Centro ceremonial', hp: 160, x: playerBase.x, y: playerBase.y },
    { type: 'Chinampa', hp: 90, x: playerBase.x + 1, y: playerBase.y }
  ];
  state.units = [];
  state.enemyUnits = [];
  state.enemyBaseHp = 160;
  log('Demo reiniciada.');
  renderEras();
  renderResources();
  renderGrid();
  renderStatus();
}

function startSkirmish() {
  if (state.loop) return;
  if (!state.units.length) {
    log('Entrena al menos una unidad para iniciar.');
    return;
  }
  spawnEnemyWave();
  state.loop = setInterval(tick, 650);
  log('Escaramuza en marcha.');
}

function spawnEnemyWave() {
  const wave = [
    { type: 'Lancero', hp: 60, atk: 10, range: 1, speed: 1 },
    { type: 'Mosquetero', hp: 45, atk: 11, range: 3, speed: 1 },
    { type: 'Caballería', hp: 70, atk: 13, range: 1, speed: 2 }
  ];
  state.enemyUnits.push(
    ...wave.map((u, idx) => ({
      id: createId('enemy'),
      ...u,
      x: enemyBase.x,
      y: enemyBase.y + idx,
      heal: 0
    }))
  );
}

function tick() {
  moveUnits(state.units, enemyBase, state.enemyUnits);
  moveUnits(state.enemyUnits, playerBase, state.units);
  resolveCombat();
  paintEntities();
  renderStatus();

  if (state.enemyBaseHp <= 0 || !state.units.length) {
    clearInterval(state.loop);
    state.loop = null;
    log(state.enemyBaseHp <= 0 ? '¡Victoria! Base enemiga destruida.' : 'Derrota: sin unidades en el campo.');
  }
}

function moveUnits(units, targetBase, opponents) {
  units.forEach(unit => {
    const closest = opponents.sort((a, b) => distance(unit, a) - distance(unit, b))[0];
    const goal = closest && distance(unit, closest) <= 3 ? closest : targetBase;
    const deltaX = Math.sign(goal.x - unit.x);
    const deltaY = Math.sign(goal.y - unit.y);
    unit.x = clamp(unit.x + deltaX * (unit.speed || 1), 0, GRID_SIZE - 1);
    unit.y = clamp(unit.y + deltaY * (unit.speed || 1), 0, GRID_SIZE - 1);
  });
}

function resolveCombat() {
  const engagements = [];
  state.units.forEach(unit => {
    const target = findTarget(unit, state.enemyUnits, enemyBase, state.enemyBaseHp);
    if (target) engagements.push({ attacker: unit, target });
  });

  state.enemyUnits.forEach(unit => {
    const target = findTarget(unit, state.units, playerBase, Infinity);
    if (target) engagements.push({ attacker: unit, target });
  });

  engagements.forEach(({ attacker, target }) => {
    if (target.base) {
      state.enemyBaseHp -= attacker.atk;
    } else {
      target.hp -= attacker.atk;
      if (attacker.heal) attacker.hp = Math.min(attacker.hp + attacker.heal, attacker.hp + 10);
    }
  });

  state.units = state.units.filter(u => u.hp > 0);
  state.enemyUnits = state.enemyUnits.filter(u => u.hp > 0);

  if (state.enemyBaseHp < 0) state.enemyBaseHp = 0;
}

function findTarget(attacker, opponents, base, baseHp) {
  const inRange = opponents.find(op => distance(attacker, op) <= attacker.range);
  if (inRange) return inRange;
  if (distance(attacker, base) <= attacker.range && baseHp > 0) {
    return { base: true };
  }
  return null;
}

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

document.addEventListener('DOMContentLoaded', init);
