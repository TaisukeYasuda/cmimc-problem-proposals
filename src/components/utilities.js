import React from "react";
import { Row, Col, Modal } from "react-materialize";
import renderKaTeX from "../katex";

function listify (L, f) { // a list * (a -> String) -> String
  f = f || (x => x);
  return L.reduce((a, b) => (a + f(b) + ", "), "").slice(0, -2);
}

const LoadMore = () => (
  <a href="#" className="load-more teal-text text-darken-3 underline-hover">Load more...</a>
);

const Counter = ({ count }) => (
  <span className="counter">{count}</span>
);

const Notification = ({ className, label, compName, title, message }) => {
  return <li className={className}>
        <a href="#"><span className="select-circle"></span></a>
        <Modal header={compName + " - " + title} trigger={
          <a href className="underline-hover"><span className="bold-text">{ compName }</span> - { title }</a>
        }>{message}</Modal>
      </li>;
};

const ProblemPreview = ({ problem }) => (
  <Row className="problem-preview">
    <Col s={3}>
      <Row>
        <Col s={4}>
          <span className="count">{ problem.votes }</span><br />votes
        </Col>
        <Col s={4}>
          <span className="count">{ problem.solves }</span><br />solves
        </Col>
        <Col s={4}>
          <span className="count">{ problem.views }</span><br />views
        </Col>
        <Col s={12}>
          <ul>
            <li>Contest: { problem.contest }</li>
            <li>Subject: { problem.subject }</li>
            <li>ID: { problem.probid }</li>
          </ul>
        </Col>
      </Row>
    </Col>
    <Col s={9}>
      <a href={"view-problem/" + problem.probid} className="black-text underline-hover" ref={ renderKaTeX }>{ problem.statement }</a>
    </Col>
  </Row>
);

export { listify, Notification, ProblemPreview, LoadMore, Counter };
