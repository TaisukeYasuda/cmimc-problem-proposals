import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Table, Input, Button, Modal } from "react-materialize";

import AccountTab from "./account-page/account-tab";
import NotificationsTab from "./account-page/notifications-tab";
import CreateCompetitionForm from "../forms/create-competition";
import {
  LoadMore,
  ProblemPreview,
  Counter,
  HorizontalNav,
  RightButtonPanel
} from "../utilities";
import { requestEnum } from "../../../constants";

const competitions = [
  {name: "CMIMC", membershipStatus: "Member"},
  {name: "PUMaC", membershipStatus: "Pending"},
  {name: "HMMT", membershipStatus: "Director"}
];

const CompetitionsTable = ({ competitions }) => {
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

  return (
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
    </Table>
  );
};

const CompetitionsTab = () => (
  <Col s={12}>
    <Row>
      <CompetitionsTable competitions={ competitions } />
      <RightButtonPanel>
        <Modal header="Join a Competition" trigger={<Button className="teal darken-3">Join a Competition</Button>}>
          <form>
            <Input label="Search competitions" />
            Your join request will be reviewed by the directors of (CMIMC).
            <RightButtonPanel>
              <Button className="teal darken-3">Join</Button>
            </RightButtonPanel>
          </form>
        </Modal>
      </RightButtonPanel>
      <RightButtonPanel><p>Does your competition want to join USMCA? <Modal header="Form a Competition" trigger={<a href className="underline-hover teal-text text-darken-3">Form a new competition</a>}>
        <CreateCompetitionForm />
      </Modal>.</p></RightButtonPanel>
    </Row>
  </Col>
);

const proposals = [
  {probid: 123, votes: 0, solves: 1, views: 2, subject: "Algebra", contest: "CMIMC 2017", statement: "hi, but $\\int_0^t x~dx$"},
  {probid: 123, votes: 1, solves: 15, views: 20, subject: "Calculus", contest: "CMIMC 2017", statement: "hi"}
];

const ProblemsTab = ({ proposals }) => (
  <Col s={12}>
    {
      proposals.map((proposal, key) => (
        <ProblemPreview problem={proposal} key={key} />
      ))
    }
    <LoadMore />
  </Col>
);

const AccountPage = () => {
  const accountTabs = {
    "notifications": {
      title: <div><i className="fa fa-bell" aria-hidden="true"></i> Notifications</div>,
      view: <NotificationsTab />
    },
    "competitions": {
      title: <div><i className="fa fa-trophy" aria-hidden="true"></i> Competitions</div>,
      view: <CompetitionsTab />
    },
    "problems": {
      title: <div><i className="fa fa-pencil-square" aria-hidden="true"></i> Problems</div>,
      view: <ProblemsTab proposals={ proposals } />
    },
    "account": {
      title: <div><i className="fa fa-user" aria-hidden="true"></i> Account</div>,
      view: <AccountTab />
    }
  };

  return (
  <Row className="container">
    <HorizontalNav tabs={ accountTabs } active="notifications" />
  </Row>
  )
};

export default AccountPage;
