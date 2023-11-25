import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { DataServer } from "./data.js";
import { DataTable } from "./DataTable.js";
import React, { useState, useEffect } from "react";
import { DataChart } from "./DataChart.js";

const dataTest = new DataServer('/api/dump', 100)

function App() {
  const [data, setData] = useState([])

  // hack hack hackity hack
  useEffect(() => {
      setTimeout(() => setData([...dataTest.data]), 100)
  }, [data])

  
  return (
    <div className="app" style={{"overflow": "hidden"}}>
      <div className="row md-10 justify-content-center mt-4">
        <h1 className="text-center"></h1>
          <div className="col-md-5">
            <h2>Chart</h2>
            {/* <DataChart data={data} dataKeys={['x', 'y', 'z']} /> */}
            <DataChart data={data} dataKeys={['gyro_x']} />
            <DataChart data={data} dataKeys={['gyro_y']} />
            <DataChart data={data} dataKeys={['gyro_z']} />
          </div>
          <div className="col-md-5">
            <h2>Table</h2>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Report Period</span>
              <input type="number" className="form-control" placeholder="1" aria-label="1" aria-describedby="basic-addon1" />
              <button className="btn btn-danger">Stop</button>
            </div>
            <DataTable data={data} />
            <button className="btn btn-primary">Download</button>
          </div>
      </div>
    </div>
  );
}

export default App;