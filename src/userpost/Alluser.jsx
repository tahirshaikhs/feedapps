import Viewmypostuser from "../component/Viewmypostuser";
import Approve from "./Approve";

import React, { useState } from 'react';

function Alluser() {
    const [showApprove, setShowApprove] = useState(false);

  const handleApproveClick = () => {
    setShowApprove(true);
  };

  const handlePendingClick = () => {
    setShowApprove(false);
  };

  return (
    <div className="alluser">
      <button onClick={handleApproveClick} className="btn btn-success">Approve</button>
      <button onClick={handlePendingClick} className="btn btn-warning">Pending</button>

      {showApprove ? <Approve /> : <Viewmypostuser />}
    </div>
  );
}
export default Alluser;