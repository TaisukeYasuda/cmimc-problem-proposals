import React from "react";
import PropTypes from "prop-types";

import { Notification, LoadMore } from "../../utilities";
import { requestEnum } from "../../../../constants";

const NotificationList = ({ notifications }) => (
  <div className="notifications-container">
    <ul className="notifications-list">
      {
        (notifications.length == 0) ? <li className="transparent">No notifications found.</li>
        : <div>
            {
              notifications.map((notification, key) => {
                let label;
                switch (notification.label) {
                  case "new":
                    label = "new-announcement";
                    break;
                  case "urgent":
                    label = "urgent-announcement";
                    break;
                  default:
                    label = "";
                    break;
                }
                return <Notification className={label} author={notification.author} title={notification.title} message={notification.message} key={key} />
              })
            }
            <li className="transparent center-align"><LoadMore /></li>
          </div>
      }
    </ul>
  </div>
);

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default NotificationList;
