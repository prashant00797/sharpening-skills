import React from "react";
import { Card, Modal } from "./Layout";

const PassProps = () => {
  return (
    <>
      <Card title="Settings">
        <p>Some content</p>
      </Card>
      <Card>
        <span>No title needed</span>
      </Card>
      <Modal isOpen={true} onClose={() => {}} footer={<button>Confirm</button>}>
        <p>Modal body content</p>
      </Modal>
    </>
  );
};

export default PassProps;

// Test usage — all of these should be VALID:

{
  /* <Card title="Settings"><p>Some content</p></Card>
<Card><span>No title needed</span></Card>
 
<Modal isOpen={true} onClose={() => {}}
  footer={<button>Confirm</button>}>
  <p>Modal body content</p>
</Modal> */
}
