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
      <a href={"view-problem/" + problem.probid} className="black-text underline-hover" ref={ renderKaTeX }>
        { problem.statement }
      </a>
    </Col>
  </Row>
);


class HorizontalNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: props.tabs,
      active: props.active
    };
  }

  render() {
    const { tabs, active } = this.state;
    return (
      <div>
        <Col s={12} className="horizontal-nav">
          {
            Object.keys(tabs).map((key, idx) => {
              const tab = tabs[key],
                    className = (key === active) ? "left active-tab" : "left";
              return (
                <a 
                  key={idx} href="#" className={ className }
                  onClick={ evt =>  {this.setState({ active: key }); } }>
                  { tab.title }
                </a>
              ); 
            })
          }
        </Col>
        <Col s={12} style={{marginTop: "36px"}}>
          <div>{ tabs[active].view }</div>
        </Col>
      </div>
    );
  }
}

class VerticalNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: props.tabs,
      active: props.active
    };
  }

  render() {
    const { tabs, active } = this.state;
    return (
      <Row>
        <Col s={3}>
          <ul className="vertical-nav" style={{marginTop: "0"}}>
            {
              Object.keys(tabs).map((key, idx) => {
                const tab = tabs[key],
                      className = (key === active) ? "active-tab" : "";
                return (
                  <li key={idx}>
                    <a 
                      href="#" className={ className } 
                      onClick={ evt =>  {this.setState({ active: key }); } }>
                      { tab.title }
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </Col>
        <Col s={9}>
          <div>{ tabs[active].view }</div>
        </Col>
      </Row>
    );
  }
}

export { 
  listify, 
  Notification, 
  ProblemPreview, 
  LoadMore, 
  Counter, 
  HorizontalNav,
  VerticalNav
};
