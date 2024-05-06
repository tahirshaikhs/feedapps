import Footer from "../component/Footer";
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
    <>
    <div className="alluser">
  <div className=" container row">
    <div className="col-6 ">
      <button onClick={handleApproveClick} className="btn btn-success btn-block mb-3 mb-md-0 mr-md-2">Approve</button>
    </div>
    <div className="col-6">
      <button onClick={handlePendingClick} className="btn btn-warning btn-block">Pending</button>
    </div>
  </div>

  {showApprove ? <Approve /> : <Viewmypostuser />}
</div>
      <Footer/>
      </>
  );
}
export default Alluser;