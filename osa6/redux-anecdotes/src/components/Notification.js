import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  console.log(props.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  if (props.notification === null || props.notification === undefined) {
    return null;
  }

  return <div style={style}>{props.notification}</div>;
};

//const Notifications = () => {
//const notifications = useSelector(state => state.notifications);

//return notifications.map(notification => (
//<div key={notification.id}>
//<Notification content={notification.content} id={notification.id} />
//</div>
//));
//};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

//export default Notifications;
export default connect(mapStateToProps, null)(Notification);
