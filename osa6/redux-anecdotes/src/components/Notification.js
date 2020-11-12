import React from 'react';
import { useSelector } from 'react-redux';

const Notification = ({ content }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  if (content === null || content === undefined) {
    return null;
  }

  return <div style={style}>{content}</div>;
};

const Notifications = () => {
  const notifications = useSelector(state => state.notifications);

  return notifications.map(notification => (
    <div key={notification.id}>
      <Notification content={notification.content} id={notification.id} />
    </div>
  ));
};

export default Notifications;
