self.addEventListener('push', event => {
  
    const data = event.data?.text();
    event.waitUntil(
      self.registration.showNotification('Geo App', {
        body: data,
        icon: '/pwa-192x192.png',
        vibrate: [20, 100, 50]
      })
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/')
    );
  });