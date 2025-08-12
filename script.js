
AOS.init({ once: true, duration: 600, easing: 'ease-out-cubic' });

// Optionally change this to your real logo link later
const LOGO_URL = 'assets/logo-placeholder.svg';
document.getElementById('logo').src = LOGO_URL;

// Chart for competitors revenue
const comp = window.__COMPETITORS__ || [];
const ctx = document.getElementById('barChart');
if (ctx && comp.length){
  const labels = comp.map(c=>c.shop);
  const data = comp.map(c=>c.revenue);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Doanh thu (Triệu)',
        data,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color:'#b9d2c3' }, grid: { color:'#112237' } },
        y: { ticks: { color:'#b9d2c3' }, grid: { color:'#112237' } }
      }
    }
  });

  // Adjust table height to match chart card height
  const chartCard = ctx.closest('.card');
  const tableCard = document.querySelector('#competitors .card.scroll');
  if (chartCard && tableCard) {
    tableCard.style.height = `${chartCard.offsetHeight}px`;
    const table = tableCard.querySelector('.table');
    if (table) {
      table.style.display = 'block';
      table.style.height = '100%';
      table.style.overflow = 'auto';
    }
  }
}

// QR generator
const qrBtn = document.getElementById('qr-generate');
if (qrBtn){
  qrBtn.addEventListener('click', ()=>{
    const url = (document.getElementById('qr-url').value || '').trim();
    const box = document.getElementById('qr-canvas');
    box.innerHTML = '';
    if (!url){ box.innerHTML = '<div class="hint">Nhập link trước đã.</div>'; return; }
    const canvas = document.createElement('canvas');
    box.appendChild(canvas);
    QRCode.toCanvas(canvas, url, { width: 200, margin: 1 }, (err)=>{
      if (err){ box.innerHTML = '<div class="hint">Lỗi tạo QR.</div>'; }
    });
  });
}

// Promo simulator
const promoSend = document.getElementById('promo-send');
const promoSchedule = document.getElementById('promo-schedule');
const promoStatus = document.getElementById('promo-status');
if (promoSend){
  promoSend.addEventListener('click', ()=>{
    promoStatus.textContent = 'Đã phát khuyến mãi tới KOL/KOC & nhóm (mô phỏng).';
  });
}
if (promoSchedule){
  promoSchedule.addEventListener('click', ()=>{
    promoStatus.textContent = 'Đã lập lịch gửi lúc 09:00 hàng ngày (mô phỏng).';
  });
}
