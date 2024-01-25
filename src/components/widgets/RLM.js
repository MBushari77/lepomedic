import React from 'react'

const RLM = ({msg}) => {
  return (
    <div>
        <div className="reg_modal_container">
            <div className="modal_msg_container shadow">
                <div className="modal_msg_header">
                    <i className="icon-cancel-circle"></i>
                </div>
                <div className="modal_msg_body">
                    <p>{ msg }</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RLM