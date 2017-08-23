import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import NotificationList from "./notification-list";
import RequestList from "./request-list";
import RequestCounter from "./request-counter";
import { VerticalNav, Counter } from "../../utilities";
import { requestEnum } from "../../../../constants";

const NotificationsTab = ({ unread, read, urgent }) => {
  /* add styling */
  unread = unread.map(notif => Object.assign(notif, { label: "new" }));
  read = read.map(notif => Object.assign(notif, { label: "none" }));
  urgent = urgent.map(notif => Object.assign(notif, { label: "urgent" }));
  /* combine and sort unread, read, and urgent */ 
  let all = _.concat(unread, read, urgent);
  all = _.sortBy(all, 'created');
  const notificationsTabs = {
    "all": {
      title: "All",
      view: <NotificationList notifications={ all } />
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
      title: <div>Requests <RequestCounter type={ requestEnum.REQUEST } /></div>,
      view: <RequestList type={ requestEnum.REQUEST } />
    },
    "invites": {
      title: <div>Invites <RequestCounter type={ requestEnum.INVITE } /></div>,
      view: <RequestList type={ requestEnum.INVITE } />
    }
  };

  return <VerticalNav tabs={ notificationsTabs } active="all" />;
};

NotificationsTab.propTypes = {
  unread: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  urgent: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  unread: state.users.user.unread,
  read: state.users.user.read,
  urgent: state.users.user.urgent
});

export default connect(mapStateToProps)(NotificationsTab);
