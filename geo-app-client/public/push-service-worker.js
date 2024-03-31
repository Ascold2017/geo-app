/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

self.addEventListener('push', async function(event) {
  const data = await event.data?.text();
  event.waitUntil(
    self.registration.showNotification('GEO App', {
      body: data,
      icon: '/android-chrome-192x192.png',
      vibrate: [20, 100, 50]
    })
  );
});