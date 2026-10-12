const C='ibf-v14',F=['./','index.html','manifest.json','icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C&&x!='ibf-data').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
self.addEventListener('periodicsync',e=>{if(e.tag=='ibf')e.waitUntil(caches.open('ibf-data').then(c=>c.match('data.json')).then(r=>r?r.json():{}).then(d=>{const l=d.left||[];return self.registration.showNotification(l.length?'📋 مهام اليوم':'💡 تحفيز',{body:l.length?'باقي '+l.length+' مهام: '+l.slice(0,3).join('، '):(d.tip||'ذاكر اليوم يا بطل!'),icon:'icon.png'})}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('./'))});
