import React from 'react';

function Alert(props) {
  return (
    props.alert && (
      <div className="container">
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show my-3`} role="alert">
          {props.alert.msg}
        </div>
      </div>
    )
  );
}

export default Alert;
