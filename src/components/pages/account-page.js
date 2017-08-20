import React from "react";

import { Row, Col, Table } from "react-materialize";

const LoadMore = () => (
  <a href="#" className="load-more teal-text text-darken-3 underline-hover">Load more...</a>
);

const Proposal = ({ votes, solves, views, contest, probid, statement }) => (
  <Row className="proposal">
    <Col s={3} className="proposal-stats">
      <Row>
        <Col s={4}>
          <span className="count">{ votes }</span><br />votes
        </Col>
        <Col s={4}>
          <span className="count">{ solves }</span><br />solves
        </Col>
        <Col s={4}>
          <span className="count">{ views }</span><br />views
        </Col>
        <Col s={12}>
          <ul>
            <li>Contest: { contest }</li>
            <li>ID: { probid }</li>
          </ul>
        </Col>
      </Row>
    </Col>
    <Col s={9}>
      <Row>
        <Col s={12}>
          <a href="view-problem" className="black-text underline-hover">{ statement }</a>
        </Col>
      </Row>
    </Col>
  </Row>
);

const Announcement = ({ label, compName, message }) => {
  if (label === "new")
    return <li className="new-announcement"><a href="#"><span className="filled-circle"></span></a> <a href="#" className="teal-text text-darken-3 underline-hover"><span className="bold-text">{ compName }</span> - { message }</a></li>;
  if (label === "urgent")
    return <li className="urgent-announcement"><a href="#"><span className="filled-circle"></span></a> <a href="#" className="red-text text-darken-3 underline-hover"><span className="bold-text">{ compName }</span> - { message }</a></li>;
  return <li><a href="#"><span className="unfilled-circle"></span></a> <a href="#" className="teal-text text-darken-3 underline-hover"><span className="bold-text">{ compName }</span> - { message }</a></li>;
};

const proposals = [
  {votes: 0, solves: 1, views: 2, contest: "CMIMC 2017", probid: 123, statement: "hi"},
  {votes: 1, solves: 15, views: 20, contest: "CMIMC 2017", probid: 123, statement: "hi"}
]

const announcements = [
  {label: "urgent", compName: "CMIMC", message: "You piece of shit, do your work"},
  {label: "new", compName: "CMIMC", message: "You piece of shit, do your work (srsly)"},
  {compName: "CMIMC", message: "You piece of shit, plz do your work"}
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

const AccountPage = ({ message }) => (
  <Row className="container">
    <Col m={7} s={12}>
      <h2 className="teal-text text-darken-4">My Proposals</h2>
      {
        proposals.map((proposal, key) => (
          <Proposal votes={proposal.votes} solves={proposal.solves} views={proposal.views} contest={proposal.contest} probid={proposal.probid} statement={proposal.statement} key={key} />
        ))
      }
      <LoadMore />
    </Col>

    <Col m={5} s={12}>
      <div className="news-feed">
        <h3>Announcements <span className="counter">{announcements.filter(({ label }) => ( label === "urgent" || label === "new" )).length}</span></h3>
        <ul>
          {
            announcements.map((announcement, key) => (
              <Announcement label={announcement.label} compName={announcement.compName} message={announcement.message} key={key} />
            ))
          }
          <li><LoadMore /></li>
        </ul>
      </div>
      <h3>My Account <a href="#" className="teal-text text-darken-3 right"><i className="fa fa-pencil" aria-hidden="true"></i></a></h3>
      <ul>
        <li>Name: {user.name}</li>
        <li>University: {user.university}</li>
        <li>Email: {user.email}</li>
      </ul>
      <Table>
        <thead>
          <tr>
            <th>Competition</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            user.comps.map((comp, key) => (
              <tr key={key}>
                <td>{comp.name}</td>
                <td>{comp.status}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Col>
  </Row>
);

export default AccountPage;
