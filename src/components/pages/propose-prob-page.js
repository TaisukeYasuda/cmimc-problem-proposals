import React from "react";

import { Row, Col, Input, Button } from "react-materialize";

const myContests = [
  {name : "Public database", subjects : ["Algebra", "Combinatorics", "Geometry", "Number Theory", "Other"]},
  {name : "CMIMC 2017", subjects : ["Algebra", "Combinatorics", "Computer Science", "Geometry", "Number Theory"]}
]

const ProposePage = ({ message }) => (
  <Row className="container">
    <h2 className="teal-text text-darken-4">Propose a Problem</h2>
    <form className="col s12">
      <Row>
        <Input type="select" label="Contest" s={4}>{
          myContests.map((contest, key) => (
            <option value={contest.name} key={key}>{contest.name}</option>
          ))
        }</Input>
        <Input type="select" label="Subject" multiple s={4}>
          <option value="unspecified">Select a subject</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Input>
        <Input type="select" label="Difficulty" s={4}>
          <option value="unspecified">Select a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Input>
      </Row>
      <Row>
        <Col s={6} className="input-field">
          <textarea id="problem-statement" className="materialize-textarea"></textarea>
          <label htmlFor="problem-statement">Problem</label>
        </Col>
        <Col s={6}></Col>
      </Row>
      <Row>
        <Input s={6} type="text" label="Answer" />
        <Col s={6}></Col>
      </Row>
      <Row>
        <Col s={6} className="input-field">
          <textarea id="solution" className="materialize-textarea"></textarea>
          <label htmlFor="solution">Solution</label>
        </Col>
        <Col s={6}>
        </Col>
      </Row>
      <Row>
        <Col s={2} offset={"s8"}>
          <a className="waves-effect waves-light btn teal darken-3">Preview</a>
        </Col>
        <Col s={2}>
          <Button waves="light" className="teal darken-3">Submit</Button>
        </Col>
      </Row>
    </form>
  </Row>
);

export default ProposePage;
