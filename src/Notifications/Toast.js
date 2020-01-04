import {Toast} from 'react-bootstrap';
import React from 'react';

export default (props) => {
  return(
      props.notifications.map(notification =>
        <div key={notification.key}>
          <Toast onClose={() => props.dismissNotification(notification.key)}>
            <Toast.Header>
              <span className="mr-auto">{notification.header}</span>
            </Toast.Header>
            <Toast.Body>
              {notification.body}
            </Toast.Body>
          </Toast>
        </div>
  ))
}
