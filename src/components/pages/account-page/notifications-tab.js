import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NotificationList from "./notification-list";
import RequestList from "./request-list";
import { VerticalNav, Counter } from "../../utilities";
import { requestEnum } from "../../../../constants";

const NotificationsTab = ({ unread, read, urgent, requests }) => {
  const requestList = requests.filter(request => request.type === requestEnum.REQUEST),
        inviteList = requests.filter(request => request.type === requestEnum.INVITE);
  /* add styling */
  unread = unread.map(notif => Object.assign(notif, { label: "new" }));
  read = read.map(notif => Object.assign(notif, { label: "none" }));
  urgent = urgent.map(notif => Object.assign(notif, { label: "urgent" }));
  /* @TODO sort all notifications by updated date */
  const notificationsTabs = {
    "all": {
      title: "All",
      view: <NotificationList notifications={ unread.concat(read).concat(urgent) } />
    },
    "urgent": {
      title: <div>Urgent <Counter count={ urgent.length } /></div>,
      view: <NotificationList notifications={ urgent } />
    },
    "unread": {
      title: <div>New <Counter count={ unread.length } /></div>,
      view: <NotificationList notifications={ unread } />
    },
    "requests": {
      title: <div>Requests <Counter count={ requestList.length } /></div>,
      view: <RequestList requests={ requestList } />
    },
    "invites": {
      title: <div>Invites <Counter count={ inviteList.length } /></div>,
      view: <RequestList requests={ inviteList } />
    }
  };

  return <VerticalNav tabs={ notificationsTabs } active="all" />;
};

NotificationsTab.propTypes = {
  unread: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  urgent: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  unread: state.users.user.unread,
  read: state.users.user.read,
  urgent: state.users.user.urgent,
  requests: state.users.user.requests
});

export default connect(mapStateToProps)(NotificationsTab);
