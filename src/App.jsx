// import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css'; // Make sure to create this CSS file

function App() {

  return (
    <>
      {/* <h1 className="project-heading">ODOP - Supplychain Prototype</h1> */}
      <div className="page-container">
        <div className="section  section-left">
          <Link className="section-link" to="/product">View Timeline</Link>
        </div>
        <div className="section  section-right">
          <Link className="section-link" to="/add">Add Checkpoint</Link>
        </div>
      </div>
    </>
  );
}

export default App;
