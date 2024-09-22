import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

function MySpinner({ display = 'none'}) {

const darkmode = useSelector(state => state.darkMode)

  return (
    <Button variant={darkmode ? "light" : "dark"} disabled style={{ display: display }}> 
      <Spinner
        as="span"
        animation="border"
        size="sm-10"
        role="status"
        aria-hidden="true"
      />
      <span className="visually-hidden">Loading...</span>
    </Button>
  );
}

export default MySpinner;
