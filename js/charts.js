/* main.js — Script principal com interações básicas e componentes. Comentários leves ao longo do código. */

/* =========================================================================
  charts.js — desenha 3 gráficos em canvas SEM libs (simples para Entrega I)
  - Pizza: distribuição de recursos
  - Linha: evolução de voluntários
  - Barras: impacto por região
=========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  drawPie();
  drawLine();
  drawBar();
});

/* --------------------------
   Util: cores
--------------------------- */
const COLORS = ['#6a5acd','#20b2aa','#ff7f50','#ffa500','#1e90ff','#32cd32'];

/* --------------------------
   PIE
--------------------------- */
function drawPie() {
  const canvas = document.getElementById('chartPie');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Dados fictícios
  const labels = ['Acolhimento','Prevenção','Jurídico','Reintegração','Gestão'];
  const data =   [35,            20,          15,        20,              10 ];

  const total = data.reduce((a,b)=>a+b,0);
  let startAngle = -Math.PI / 2; // inicia no topo

  data.forEach((value, i) => {
    const sliceAngle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.arc(canvas.width/2, canvas.height/2, 120, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();

    // label
    const midAngle = startAngle + sliceAngle / 2;
    const lx = canvas.width/2 + Math.cos(midAngle) * 140;
    const ly = canvas.height/2 + Math.sin(midAngle) * 140;
    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(${labels[i]} (${value}%), lx, ly);

    startAngle += sliceAngle;
  });
}

/* --------------------------
   LINE
--------------------------- */
function drawLine() {
  const canvas = document.getElementById('chartLine');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Meses e voluntários
  const labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const values = [ 10,   14,   18,   22,   30,   32,   40,   45,   48,   55,   60,   65 ];

  // Área de plot
  const padding = 40;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  // fundo
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // eixo
  ctx.strokeStyle = '#888';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // escala simples
  const maxV = Math.max(...values) * 1.1;
  const stepX = w / (labels.length - 1);

  // linha
  ctx.strokeStyle = COLORS[0];
  ctx.lineWidth = 2;
  ctx.beginPath();
  values.forEach((v, i) => {
    const x = padding + i * stepX;
    const y = canvas.height - padding - (v / maxV) * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
    // pontos
    ctx.fillStyle = COLORS[0];
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.stroke();

  // labels do eixo X
  ctx.fillStyle = '#333';
  ctx.font = '11px sans-serif';
  labels.forEach((lb, i) => {
    const x = padding + i * stepX;
    const y = canvas.height - padding + 14;
    ctx.textAlign = 'center';
    ctx.fillText(lb, x, y);
  });
}

/* --------------------------
   BAR
--------------------------- */
function drawBar() {
  const canvas = document.getElementById('chartBar');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = ['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'];
  const values = [ 12,     20,         9,              28,       15 ];

  const padding = 40;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // eixos
  ctx.strokeStyle = '#888';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  const maxV = Math.max(...values) * 1.2;
  const barWidth = w / (values.length * 1.5);
  const gap = barWidth * 0.5;

  values.forEach((v, i) => {
    const x = padding + i * (barWidth + gap) + gap;
    const barH = (v / maxV) * h;
    const y = canvas.height - padding - barH;
    ctx.fillStyle = COLORS[(i+1) % COLORS.length];
    ctx.fillRect(x, y, barWidth, barH);

    // label X
    ctx.fillStyle = '#333';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barWidth/2, canvas.height - padding + 14);

    // valor no topo
    ctx.fillText(v, x + barWidth/2, y - 4);
  });
}