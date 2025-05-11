import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: any
    Echo: Echo<any>
  }
}

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: 'rc6vr19x1mcko0ceidv7',
  wsHost: 'localhost',
  wsPort: 8080,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws'],
})

export default echo
