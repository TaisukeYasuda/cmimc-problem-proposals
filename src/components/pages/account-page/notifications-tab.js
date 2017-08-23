import React from "react";
import PropTypes from "prop-types";

import NotificationList from "./notification-list";
import RequestList from "./request-list";
import { VerticalNav, Counter } from "../../utilities";
import { requestEnum } from "../../../../constants";

const NotificationsTab = ({ notifications, requests }) => {
  const requestList = requests.filter(request => request.type === requestEnum.REQUEST),
        inviteList = requests.filter(request => request.type === requestEnum.INVITE);
  const urgentNotifications = notifications.filter(notification => notification.label === "urgent"),
        newNotifications = notifications.filter(notification => notification.label === "new");
  const notificationsTabs = {
    "all": {
      title: "All",
      view: <NotificationList notifications={ notifications } />
    },
    "urgent": {
      title: <div>Urgent <Counter count={urgentNotifications.length} /></div>,
      view: <NotificationList notifications={ urgentNotifications } />
    },
    "unread": {
      title: <div>New <Counter count={newNotifications.length} /></div>,
      view: <NotificationList notifications={ newNotifications } />
    },
    "requests": {
      title: <div>Requests <Counter count={requestList.length} /></div>,
      view: <RequestList requests={ requestList } />
    },
    "invites": {
      title: <div>Invites <Counter count={inviteList.length} /></div>,
      view: <RequestList requests={ inviteList } />
    }
  };

  return <VerticalNav tabs={ notificationsTabs } active="all" />;
};

export default NotificationsTab;
