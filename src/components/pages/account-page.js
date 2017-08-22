import React from "react";
import { Row, Col, Table } from "react-materialize";
import renderKaTeX from "../../katex";
import { 
  Notification, 
  LoadMore, 
  ProblemPreview, 
  Counter, 
  VerticalNav
} from "../utilities";

const proposals = [
  {probid: 123, votes: 0, solves: 1, views: 2, subject: "Algebra", contest: "CMIMC 2017", statement: "hi, but $\\int_0^t x~dx$"},
  {probid: 123, votes: 1, solves: 15, views: 20, subject: "Calculus", contest: "CMIMC 2017", statement: "hi"}
]

const announcements = [
  {label: "urgent", compName: "CMIMC", title: "You piece of shit, do your work", message: "Hello please do this shit blah blah"},
  {label: "new", compName: "CMIMC", title: "You piece of shit, do your work (srsly)", message: "Hello please do this shit blah blah"},
  {compName: "CMIMC", title: "You piece of shit, plz do your work", message: "Hello please do this shit blah blah"}
]

const user = {
  name: "nigger",
  university: "carnigger watermellon",
  email: "ctj@math.cmu.edu",
  comps: [
    {name: "CMIMC", status: "Director"},
    {name: "HMMT", status: "Member"}
  ]
}

const tabs = {
  "all": {
    title: "All",
    view: <h1>All</h1>
  },
  "urgent": {
    title: <div>Urgent <Counter count="10" /></div>,
    view: (
      <div className="notifications-container">
        <ul className="notifications-list">
          <Notification className="urgent-announcement" compName="CMIMC" title="Do this" message="Plz do this" />
          <Notification className="new-announcement" compName="CMIMC" title="Do this" message="Plz do this" />
          <Notification compName="CMIMC" title="Do this" message="Plz do this" />
          <Notification compName="CMIMC" title="Do this" message="Plz do this" />
          <Notification className="new-announcement" compName="CMIMC" title="Do this" message="Plz do this" />
          <li className="transparent"><LoadMore /></li>
        </ul>
      </div>
    )
  },
  "unread": {
    title: "Unread",
    view: <h1>Unread</h1>
  },
  "requests": {
    title: "Requests",
    view: <h1>Requests</h1>
  },
  "invites": {
    title: "Invites",
    view: <h1>Invites</h1>
  }
};

const AccountPage = ({ message }) => (
  <Row className="container">
    <Col s={12} className="inner-nav">
      <a href="#" className="left active-tab"><i className="fa fa-bell" aria-hidden="true"></i> Notifications</a>
      <a href="#" className="left"><i className="fa fa-trophy" aria-hidden="true"></i> Competitions</a>
      <a href="#" className="left"><i className="fa fa-pencil-square" aria-hidden="true"></i> Problems</a>
      <a href="#" className="left"><i className="fa fa-user" aria-hidden="true"></i> Account</a>
    </Col>
    <Col s={12} style={{marginTop: "36px"}}>
      <VerticalNav tabs={ tabs } active="urgent" />
    </Col>
  </Row>
);

export default AccountPage;
