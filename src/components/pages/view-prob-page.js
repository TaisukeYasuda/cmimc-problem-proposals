import React from "react";

import { Row, Col, Button, Collapsible, CollapsibleItem, Input } from "react-materialize";

const ViewProbPage = ({ message }) => (
  <Row className="container">
    <h2 className="col s12 teal-text text-darken-4">View Problem<a href="#" className="teal-text text-darken-4 right"><i className="fa fa-trash" aria-hidden="true"></i></a><a href="#" className="teal-text text-darken-4 right" style={{marginRight: "8px"}}><i className="fa fa-pencil" aria-hidden="true"></i></a></h2>
    <Col s={1} className="center-align votes">
      <ul>
        <li><a href="#" className="grey-text"><i className="fa fa-arrow-up" aria-hidden="true"></i></a></li>
        <li><span href="#" className="grey-text">0</span></li>
        <li><a href="#" className="grey-text"><i className="fa fa-arrow-down" aria-hidden="true"></i></a></li>
      </ul>
    </Col>
    <Col s={11}>
      <h3>Problem</h3>
      <p>Retard</p>
    </Col>
    <Col s={12}>
      <Collapsible>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Answer</span></div>
        )}>
          <p>Nmu</p>
        </CollapsibleItem>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Solutions</span> <span className="counter">1</span></div>
        )}>
          <p>Nmu</p>
        </CollapsibleItem>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Comments</span> <span className="counter">1</span></div>
        )}>
          <p>Nmu</p>
        </CollapsibleItem>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Information</span></div>
        )}>
          <p>Nmu</p>
        </CollapsibleItem>
      </Collapsible>
    </Col>
    <Col s={12}>
      <form className="row">
        <h2 className="col s12 teal-text text-darken-4">Give Feedback</h2>
        <Col s={12}>
          <ul className="inline-list">
            <li>This is a:</li>
            <li>
              <Input name="feedback-type" type="radio" label="comment" defaultChecked="checked" />
            </li>
            <li>
              <Input name="feedback-type" type="radio" label="alternate solution" />
            </li>
          </ul>
        </Col>
        <Col s={6} className="input-field">
          <textarea id="feedback" className="materialize-textarea"></textarea>
          <label htmlFor="feedback">Comment</label>
        </Col>
        <Col s={6}>
        </Col>
        <Col s={2} className="offset-s8">
          <Button waves="light" className="teal darken-3">Preview</Button>
        </Col>
        <Col s={2}>
          <Button waves="light" className="teal darken-3">Submit</Button>
        </Col>
      </form>
    </Col>
  </Row>
);

export default ViewProbPage;
