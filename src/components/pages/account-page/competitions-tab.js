import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Table, Button, Modal, Input } from "react-materialize";

import { RightButtonPanel } from "../../utilities";
import CreateCompetitionForm from "../../forms/create-competition";

const CompetitionsTableDumb = ({ competitions }) => { 
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

  return (competitions.length > 0) ? (
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
              <td>{competition.short_name}</td>
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
  ) : (
    <div><p>Not involved in any competitions.</p></div>
  );
};

CompetitionsTableDumb.propTypes = {
  competitions: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
        competitions: state.competitions.myCompetitions
      });
const CompetitionsTable = connect(mapStateToProps)(CompetitionsTableDumb);

const CompetitionsTab = () => (
  <Col s={12}>
    <Row>
      <CompetitionsTable />
      <RightButtonPanel>
        <form>
          <Modal header="Join a Competition" trigger={<Button className="teal darken-3">Join a Competition</Button>} actions={<div>
            <Button flat modal="close" waves="light">Cancel</Button>
            <Button flat modal="close" waves="light">Join</Button>
            </div>}>

            <Input label="Search competitions" />
            Your join request will be reviewed by the directors of (CMIMC).
          </Modal>
        </form><br />
        <CreateCompetitionForm />
      </RightButtonPanel>
    </Row>
  </Col>
);

export default CompetitionsTab;
