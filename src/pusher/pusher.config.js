import Pusher from 'pusher-js';

const pusher = new Pusher('41b9eef0cbe0ebbabfb5', {
    cluster: 'us2',
    encrypted: true,
    debug: true,
});

export default pusher;