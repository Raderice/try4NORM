var c=window.CAR_DATA||{};
function updateCarInfo(v){var b=document.getElementById('car-info'),car=c[v];if(!b)return;if(car&&v){b.querySelector('.info-price').textContent=parseFloat(car.price).toLocaleString('ru-RU')+' руб./сут.';b.querySelector('.info-desc').textContent=car.description||'';b.classList.add('visible')}else b.classList.remove('visible')}
var d=document.querySelector('input[type="date"]');if(d)d.min=new Date().toISOString().split('T')[0];
