import React from "react";
import PropTypes from "prop-types";

import { Request, LoadMore } from "../../utilities";

const RequestList = ({ requests }) => (
  <div className="notifications-container">
    <ul className="notifications-list">
      {
        (requests.length == 0) ? <li className="transparent">No requests found.</li>
        : <div>
            {
              requests.map((request, key) => <Request request={request} key={key} />)
            }
            <li className="transparent center-align"><LoadMore /></li>
          </div>
      }
    </ul>
  </div>
);

RequestList.propTypes = {
  requests: PropTypes.array.isRequired
};

export default RequestList;
