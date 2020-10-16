self.addEventListener('push', function (event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  if (event.data) {
    const data = event.data.json()
    const title = data.title
    const options = {
      body: data.message || false,
      icon: data.icon || './icon.png',
      badge: './icon.png',
      tag: data.tag || 'general',
      data: data.data || false,
      timestamp: data.timestamp || false
    }

    if (data.image) {
      options.image = data.image
    }

    event.waitUntil(self.registration.showNotification(title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function (clientList) {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i]

      if (client.url === '/' && 'focus' in client) {
        return client.focus()
      }
    }

    if (clients.openWindow) {
      if (event.notification.data.link !== false) {
        return clients.openWindow(event.notification.data.link)
      }
    }
  }))
})
