import React from "react";
import { Row, Col, Table, Input, Button, Modal } from "react-materialize";
import renderKaTeX from "../../katex";
import {
  Notification,
  LoadMore,
  ProblemPreview,
  Counter,
  HorizontalNav,
  VerticalNav,
  Request
} from "../utilities";

const notifications = [
  {author: "CMIMC", title: "Looking for test solvers", message: "We only have one test solver on the Power Round, so ask around to see if anyone wants to test solve. Thanks!", label: "new"},
  {author: "HMMT", title: "Meeting tomorrow", message: "Please come to the meeting tomorrow at 7:00 in McCosh 4.", label: "new"},
  {author: "PUMaC", title: "Tell all your friends", message: "As the year is beginning, be sure to recommend any interesting freshman friends to join our contest.", label: "none"},
  {author: "CMIMC", title: "Problems desperately needed", message: "The competition is only in 1 month and we're short 20 problems. Geometry is particularly lacking. Help!", label: "urgent"},
  {author: "Admin", title: "Welcome to USMCA", message: "Congrats on making an account to the best website on earth!", label: "none"}
]

const urgentNotifications = notifications.filter(notification => notification.label === "urgent");
const newNotifications = notifications.filter(notification => notification.label === "new");

const requests = [
  {message: "Cody Johnson requests you to create the competition \"CMIMC.\""},
  {message: "Cody Johnson requests to join the competition \"CMIMC\" as a member."}
]

const invites = [
  {message: "Cody Johnson invites you to become a director for \"CMIMC.\""}
]

const competitions = [
  {name: "CMIMC", membershipStatus: "Member"},
  {name: "PUMaC", membershipStatus: "Pending"},
  {name: "HMMT", membershipStatus: "Director"}
]

const proposals = [
  {probid: 123, votes: 0, solves: 1, views: 2, subject: "Algebra", contest: "CMIMC 2017", statement: "hi, but $\\int_0^t x~dx$"},
  {probid: 123, votes: 1, solves: 15, views: 20, subject: "Calculus", contest: "CMIMC 2017", statement: "hi"}
]

const user = {
  name: "Cody Johnson",
  email: "ctj@math.cmu.edu",
  university: "Carnegie Mellon University"
}

const admins = [
  {name: "Cody Johnson", email: "ctj@math.cmu.edu"},
  {name: "Taisuke Yasuda", email: "taisukey@andrew.cmu.edu"}
]

const notificationTabs = {
  "all": {
    title: "All",
    view: (
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
    )
  },
  "urgent": {
    title: <div>Urgent <Counter count={urgentNotifications.length} /></div>,
    view: (
      <div className="notifications-container">
        <ul className="notifications-list">
        {
          (urgentNotifications.length == 0) ? <li className="transparent">No notifications found.</li>
          : <div>
              {
                urgentNotifications.map((notification, key) => {
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
    )
  },
  "unread": {
    title: <div>New <Counter count={newNotifications.length} /></div>,
    view: (
      <div className="notifications-container">
        <ul className="notifications-list">
        {
          (newNotifications.length == 0) ? <li className="transparent">No notifications found.</li>
          : <div>
              {
                newNotifications.map((notification, key) => {
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
    )
  },
  "requests": {
    title: <div>Requests <Counter count={requests.length} /></div>,
    view: (
      <div className="notifications-container">
        <ul className="notifications-list">
          {
            (requests.length == 0) ? <li className="transparent">No requests found.</li>
            : <div>
                {
                  requests.map((request, key) => <Request message={request.message} key={key} />)
                }
                <li className="transparent center-align"><LoadMore /></li>
              </div>
          }
        </ul>
      </div>
    )
  },
  "invites": {
    title: <div>Invites <Counter count={invites.length} /></div>,
    view: (
      <div className="notifications-container">
        <ul className="notifications-list">
          {
            (invites.length == 0) ? <li className="transparent">No invites found.</li>
            : <div>
                {
                  invites.map((invite, key) => <Request message={invite.message} key={key} />)
                }
                <li className="transparent center-align"><LoadMore /></li>
              </div>
          }
        </ul>
      </div>
    )
  }
};

const statusOptions = {
  "Member": <div><li><a href="#" className="teal-text text-darken-3">Leave competition</a></li></div>,
  "Director": (
    <div>
      <li><a href="#" className="teal-text text-darken-3">Leave competition</a></li>
      <li><a href="#" className="teal-text text-darken-3">Add new members</a></li>
      <li><a href="#" className="teal-text text-darken-3">Add new directors</a></li>
      <li><a href="#" className="teal-text text-darken-3">Step down as director</a></li>
    </div>
  ),
  "Pending": <div><li><a href="#" className="teal-text text-darken-3">Cancel request</a></li></div>
};

const accountTabs = {
  "notifications": {
    title: <div><i className="fa fa-bell" aria-hidden="true"></i> Notifications</div>,
    view: <VerticalNav tabs={ notificationTabs } active="all" />
  },
  "competitions": {
    title: <div><i className="fa fa-trophy" aria-hidden="true"></i> Competitions</div>,
    view: (
      <Col s={12}>
        <Row>
          <p>You can change your membership status by selecting a new status from the dropdown.</p>
          <Table>
            <thead>
              <tr>
                <th>Competition</th>
                <th>Membership Status</th>
                <th>Options</th>
              </tr>
            </thead>

            <tbody>
              {
                competitions.map((competition, key) =>
                  <tr key={key}>
                    <td>{competition.name}</td>
                    <td>{competition.membershipStatus}</td>
                    <td>
                      <ul>
                        { statusOptions[competition.membershipStatus] }
                      </ul>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table><br />
          <Modal header="Join a Competition" trigger={<Button className="teal darken-3 right">Join a Competition</Button>}>
            <form>
              <Input label="Search competitions" />
              Your join request will be reviewed by the directors of (CMIMC). <Button className="right teal darken-3">Join</Button>
            </form>
          </Modal><br /><br />
          <p className="right">Does your competition want to join USMCA? <Modal header="Form a Competition" trigger={<a href className="underline-hover teal-text text-darken-3">Form a new competition</a>}>
            <form>
              <Input label="Competition name" className="clear-top" />
              <Input label="Website (optional)" className="clear-top" />
              <Input label="Competition location (city, state)" className="clear-top" />
              Your request to create a competition will be reviewed by an admin. <Button className="right teal darken-3">Create</Button>
            </form>
          </Modal>.</p>
        </Row>
      </Col>
    )
  },
  "problems": {
    title: <div><i className="fa fa-pencil-square" aria-hidden="true"></i> Problems</div>,
    view: (
      <Col s={12}>
        {
          proposals.map((proposal, key) => (
            <ProblemPreview problem={proposal} key={key} />
          ))
        }
        <LoadMore />
      </Col>
    )
  },
  "account": {
    title: <div><i className="fa fa-user" aria-hidden="true"></i> Account</div>,
    view: (
      <Col s={12}>
        <h2 className="teal-text text-darken-4" style={{marginTop: "0"}}>Account
          <Modal header="Edit Account" trigger={<a href="#" className="right teal-text text-darken-4"><i className="fa fa-pencil" aria-hidden="true"></i></a>}>
            <form className="row">
              <Input s={12} label="Name" value={user.name} />
              <Input s={12} label="Email" value={user.email} />
              <Input s={12} label="University" value={user.university} />
              <Button className="teal darken-3 right">Save</Button>
            </form>
          </Modal></h2>
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>University: {user.university}</li>
          <li><Modal header="Change Password" trigger={<a href className="teal-text text-darken-3">Change password</a>}>
            <form className="row">
              <Input s={12} type="password" placeholder="Current password" />
              <Input s={12} type="password" placeholder="New password" />
              <Input s={12} type="password" placeholder="New password (confirm)" />
              <Button className="teal darken-3 right">Confirm</Button>
            </form>
          </Modal></li>
        </ul>

        <h2 className="teal-text text-darken-4">Admins</h2>
        <p>If you have any problems, these are the contacts of the admins of USMCA:</p>
        <ul>
        {
          admins.map((admin, key) =>
            <li key={key}>{admin.name} ({admin.email})<a href="#" className="teal-text text-darken-3 right"><i className="fa fa-times" aria-hidden="true"></i></a></li>
          )
        }
        </ul>
        <Button className="teal darken-3 right">Step Down</Button><Button className="teal darken-3 right right-space">Add Admin</Button>
      </Col>
    )
  }
}

const AccountPage = ({ message }) => (
  <Row className="container">
    <HorizontalNav tabs={ accountTabs } active="notifications" />
  </Row>
);

export default AccountPage;
