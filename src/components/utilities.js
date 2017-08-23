import React from "react";
import { Row, Col, Modal, Button } from "react-materialize";
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

const RightButtonPanel = ({ children, marginBottom }) => (
  <div>
    <div className="right-button-panel" style={{ marginBottom }}>
      { children }
    </div>
    <br className="clear-float" />
  </div>
)

const Notification = ({ className, label, author, title, message }) => {
  return <li className={className}>
        <a href="#"><span className="select-circle"></span></a>
        <Modal header={author + ": " + title} trigger={
          <a href className="underline-hover"><span className="bold-text">{ author }</span>: { title }</a>
        }>{message}</Modal>
      </li>;
};

const Request = ({ request }) => (
  <li className="white">
    { request.body }
    <Modal header="Confirm Reject" trigger={<a href="#" className="right"><i className="fa fa-times" aria-hidden="true"></i></a>} actions={<div>
      <Button flat modal="close" waves="light">Cancel</Button>
      <Button flat modal="close" waves="light">Confirm</Button>
    </div>}>
      Are you sure you want to reject this request?
    </Modal>
    <Modal header="Confirm Accept" trigger={<a href="#" className="right right-space"><i className="fa fa-check" aria-hidden="true"></i></a>}actions={<div>
      <Button flat modal="close" waves="light">Cancel</Button>
      <Button flat modal="close" waves="light">Confirm</Button>
    </div>}>
      Are you sure you want to accept this request?
    </Modal>
  </li>
);

const ProblemPreview = ({ children, problem }) => (
  <Row className="problem-preview">
    <Col s={9}>
      <div className="katex-preview" style={{marginBottom: "24px"}}>
        <a href="view-problem" className="black-text underline-hover" ref={ renderKaTeX }>
          { problem.statement }
        </a>
      </div>
    </Col>
    <Col s={3}>
      <Row style={{marginBottom: "0"}}>
        <Col s={4}>
          <span className="count">{ problem.votes }</span><br />votes
        </Col>
        <Col s={4}>
          <span className="count">{ problem.solves }</span><br />solves
        </Col>
        <Col s={4}>
          <span className="count">{ problem.views }</span><br />views
        </Col>
      </Row>
      <Row style={{marginBottom: "24px"}}>
        <Col s={12}>
          { children }
        </Col>
      </Row>
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
    if (!tabs) return (<div></div>);
    if (tabs[active] === undefined) {
      console.log('Active tab is not in the tabs.');
      return (<div></div>);
    }
    return (
      <div>
        <Col s={12} className="horizontal-nav">
          {
            Object.keys(tabs).map((key, idx) => {
              const tab = tabs[key],
                    className = (key === active) ? "left active-tab" : "left";
              return (
                <a
                  key={idx} className={ className }
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
                      className={ className }
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
  RightButtonPanel,
  ProblemPreview,
  LoadMore,
  Counter,
  HorizontalNav,
  VerticalNav,
  Request
};
