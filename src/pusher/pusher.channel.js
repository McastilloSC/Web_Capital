import { useEffect } from 'react';
import pusher from './pusher.config.js';

const usePusherChannel = (channelName, eventName, eventHandler) => {
  useEffect(() => {
    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, eventHandler);

    return () => {
      channel.unbind(eventName, eventHandler);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName, eventHandler]);
};

export default usePusherChannel;