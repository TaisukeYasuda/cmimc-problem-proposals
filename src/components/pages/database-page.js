import React from "react";

import { Row, Col, Input } from "react-materialize";

const DatabasePage = ({ message }) => (
  <Row className="container">
    <Col s={12}>
      <h2 className="teal-text text-darken-4">Database</h2>
      <Row>
        <form className="col s12">
          <Row>
            <Input s={4} type="select" label="Contest" multiple>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </Input>
            <Input s={4} type="select" label="Subject" multiple>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </Input>
            <Input s={4} type="select" label="Sort by" multiple>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </Input>
            <Col s={12}>
              <ul className="inline-list">
                <li>
                  <Input type="checkbox" label="original problems only" />
                </li>
                <li>
                  <Input type="checkbox" label="show author" />
                </li>
              </ul>
            </Col>
          </Row>
        </form>
      </Row>
      <h3>Results</h3>
      <Row className="proposal">
        <Col s={3} className="proposal-stats">
          <Row>
            <Col s={4}>
              <span className="count">0</span><br />votes
            </Col>
            <Col s={4}>
              <span className="count">0</span><br />solves
            </Col>
            <Col s={4}>
              <span className="count">0</span><br />views
            </Col>
            <Col s={12}>
              <ul>
                <li>Contest: CMIMC 2017</li>
                <li>Author: Cody</li>
                <li>ID: 123</li>
              </ul>
            </Col>
          </Row>
        </Col>
        <Col s={9}>
          <Row>
            <Col s={12}>
              <a href="view-problem.html" className="black-text underline-hover">hi</a>
            </Col>
          </Row>
        </Col>
      </Row>
      <a href="#" className="load-more teal-text text-darken-3 underline-hover">Load more...</a>
    </Col>
  </Row>
);

export default DatabasePage;
