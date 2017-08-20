import React from "react";
import { Row, Col, Card, CardTitle, Modal } from "react-materialize";

function listify (directors) {
  return (directors.reduce((a, b) => (a + b.name + " (" + b.email + "), "), "")).slice(0, -2);
}

const Competition = ({ name, compid, directors }) => (
  <li className="col s4">
    <div className="card teal darken-3 white-text">
      <div className="card-content">
        <span className="card-title">{ name }</span>
        <p>Directors: { listify(directors) }</p>
      </div>
      <div className="card-action">
        <a href className="right"><i className="fa fa-trash" aria-hidden="true"></i></a>
        <Modal header={"Edit " + name} trigger={<a href className="right"><i className="fa fa-pencil" aria-hidden="true"></i></a>}>hello</Modal>
        <br />
      </div>
    </div>
  </li>
);

const competitions = [
  {name: "CMIMC", compid: 1, directors: [
    {name: "Cody", email: "ctj@math.cmu.edu"},
    {name: "Robert", email: "taisukey@andrew.cmu.edu"}
  ]},
  {name: "PUMaC", compid: 1, directors: [
    {name: "Eric", email: "ctj@math.cmu.edu"}
  ]}
]

const AdminPage = ({ message }) => (
  <Row className="container">
    <h2 className="teal-text text-darken-4">Competitions
      <Modal header="New Competition" trigger={<a href className="right teal-text text-darken-4"><i className="fa fa-plus" aria-hidden="true"></i></a>}>
        blah blah blah bull shit
      </Modal></h2>
    <ul className="inline-list">
      {competitions.map((competition, key) => (
        <Competition name={competition.name} compid={competition.compid} directors={competition.directors} key={key} />
      ))}
    </ul>
  </Row>
);

export default AdminPage;
