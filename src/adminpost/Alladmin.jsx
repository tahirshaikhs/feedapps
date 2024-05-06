

import React, { useState } from 'react';
import ApproveAdmin from "./ApproveAdmin";
import TableAdmin from "../component/Tableadmin";
import Footer from '../component/Footer';

function Alladmin() {
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
                <div className="container row">
                    <div className="col-6"> {/* Add margin bottom only in small screens */}
                        <button onClick={handleApproveClick} className="btn btn-success btn-block">Approve</button>
                    </div>
                    <div className="col-6">
                        <button onClick={handlePendingClick} className="btn btn-warning btn-block">Action</button>
                    </div>
                </div>

                {showApprove ? <ApproveAdmin /> : <TableAdmin />}
            </div>
            <Footer />
      <Footer/>
      </>
  );
}
export default Alladmin;