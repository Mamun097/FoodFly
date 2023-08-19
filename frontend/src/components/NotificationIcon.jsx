import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationIcon = ({ unseenNotifications }) => {
  const [count, setCount] = useState(unseenNotifications);

  const handleClick = () => {
    if (count > 0) {
      setCount(0);
    }
  };

  return (
    <div>
      <FontAwesomeIcon icon={faBell} className="fa-3x" color="#ffc127"/>
      {count > 0 ? <span>{count}</span> : null}
    </div>
  );
};

export default NotificationIcon;