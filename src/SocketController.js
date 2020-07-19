import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import siteConfig from './config/site.config'
import devicesActions from '@iso/redux/devices/actions';
import positionsActions from '@iso/redux/positions/actions';

const displayNotifications = events => {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      for (const event of events) {
        const notification = new Notification(`Event: ${event.type}`);
        setTimeout(notification.close.bind(notification), 4 * 1000);
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(permission => {
        if (permission === "granted") {
          displayNotifications(events);
        }
      });
    }
  }
};

const SocketController = () => {
  const dispatch = useDispatch();

  const connectSocket = () => {
    const protocol = siteConfig.apiUrl === 'https:' ? 'wss:' : 'ws:';
    const url = siteConfig.apiUrl.replace(/^[a-z]+:\/\//g, '');

    const socket = new WebSocket(protocol + '//' + url + ':' + siteConfig.apiPort + '/api/socket');

    socket.onclose = () => {
      setTimeout(() => connectSocket(), 60 * 1000);
    };

    socket.onmessage = (event) => {
        console.log(event);
      
      const data = JSON.parse(event.data);
      if (data.devices) {
        dispatch(devicesActions.update(data.devices));
      }
      if (data.positions) {
        dispatch(positionsActions.update(data.positions));
      }
      /*if (data.events) {
        displayNotifications(data.events);
      }*/
    };
  }

  useEffect(() => {
    fetch(siteConfig.apiUrl+ ':' + siteConfig.apiPort+'/api/devices', {'Authorization': 'Basic MTY5ODgxMDY5MDg6MTY5ODgxMDY5MDg= ' }).then(response => {
      if (response.ok) {
        response.json().then(devices => {
          dispatch(devicesActions.update(devices));
        });
      }
      connectSocket();
    });
  }, []);

  return null;
}

export default connect()(SocketController);
