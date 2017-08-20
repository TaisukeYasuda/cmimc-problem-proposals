import React from "react";

import { Row, Col, Button, Collapsible, CollapsibleItem, Input } from "react-materialize";

const Feedback = ({feedbackType, author, message}) => (
  <Row className="feedback">
    <Col s={2} className="center-align">
      <span>{feedbackType} by:</span><br />{author}
    </Col>
    <Col s={10}>
      <h3 className="clear-top">{feedbackType}</h3>
      <p>{message}</p>
    </Col>
  </Row>
);

const problem = {
  statement: "retard",
  votes: 4,
  probid: 123,
  answer: "idk",
  author: "Cody Johnson",
  subject: "Algebra",
  solutions: [
    {author: "Cody", solution: "You can do it that way"},
    {author: "Cody", solution: "You can do it this way"}
  ],
  comments: [
    {author: "Cody", comment: "Pretty good problem"},
    {author: "Cody", comment: "Pretty bad problem"}
  ]
};

const ViewProbPage = ({ message }) => (
  <Row className="container">
    <h2 className="col s12 teal-text text-darken-4">View Problem<a href="#" className="teal-text text-darken-4 right"><i className="fa fa-trash" aria-hidden="true"></i></a><a href={"edit-problem/" + problem.probid} className="teal-text text-darken-4 right" style={{marginRight: "8px"}}><i className="fa fa-pencil" aria-hidden="true"></i></a></h2>
    <Col s={1} className="center-align">
      <ul className="clear-top">
        <li><a href="#" className="grey-text"><i className="fa fa-arrow-up" aria-hidden="true"></i></a></li>
        <li><span href="#" className="grey-text">{problem.votes}</span></li>
        <li><a href="#" className="grey-text"><i className="fa fa-arrow-down" aria-hidden="true"></i></a></li>
      </ul>
    </Col>
    <Col s={11}>
      <h3 className="clear-top">Problem</h3>
      <p>{problem.statement}</p>
    </Col>
    <Col s={12}>
      <Collapsible>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Answer</span></div>
        )}>
          <p>{problem.answer}</p>
        </CollapsibleItem>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Solutions</span> <span className="counter">{problem.solutions.length}</span></div>
        )}>
        {
          problem.solutions.map((soln, key) => (
            <Feedback feedbackType="Solution" message={soln.solution} author={soln.author} key={key} />
          ))
        }
        </CollapsibleItem>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Comments</span> <span className="counter">{problem.comments.length}</span></div>
        )}>
          {
            problem.comments.map((cmt, key) => (
              <Feedback feedbackType="Comment" message={cmt.comment} author={cmt.author} key={key} />
            ))
          }
        </CollapsibleItem>
        <CollapsibleItem header={(
          <div><i className="fa fa-plus-circle" aria-hidden="true"></i><span className="bold-text">Information</span></div>
        )}>
          <ul>
            <li>Subject: {problem.subject}</li>
            <li>Author: {problem.author}</li>
            <li>ID: {problem.probid}</li>
          </ul>
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
