import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useInterval } from "./UseInterval";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stationInfo, setStationInfo] = useState({});
  const [availableInfo, setAvailableInfo] = useState({});

  async function fetchData() {
    try {
      const stationInformationJson = await axios.get(
        "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
      );
      const availabilityJson = await axios.get(
        "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
      );

      if (
        //to simplify the error checking, I only check if an error happens, and not what causes it.
        stationInformationJson.status > 204 ||
        availabilityJson.status > 204
      ) {
        throw new Error("api unavailable");
      }

      //Strips down the api response to only include information about the stations 
      // and stores it in variables created in the App function
      setStationInfo(stationInformationJson.data.data.stations);
      setAvailableInfo(availabilityJson.data.data.stations);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }

  //Runs the fetchData function once, when the program starts
  useEffect(() => {
    fetchData();
  }, []);

  //Runs the fetchData function every 10 secounds(when the api updates)
  useInterval(() => {
    fetchData();
  }, 10000);

  //Returning an error message if something fails
  if (error) {
    return <p>Error when fetching information</p>;
  }
  //This will run before we get a response from the api.
  if (loading) {
    return <p>Loading, please wait</p>;
  }

  //when we get a response from the api, this will return a datatable created in the DataTable function
  return (
    <div className="App">
      <DataTable data={mergeData(stationInfo, availableInfo)} />
    </div>
  );
}

//merges the 2 api responses for ease of use and sorts them after name
function mergeData(stations, availability) {
  const list = stations.map((station, i) => Object.assign(station, availability[i]));
  return list.sort( compare );
}

//Creates and returns the table for displaying the stations 
function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Capacity</td>
          <td>Available bikes</td>
          <td>Available docks</td>
        </tr>
      </thead>
      <tbody>
        {data.map((station) => (
          <DataRow station={station} key={station.station_id} />
        ))}
      </tbody>
    </table>
  );
}

//returns a row for the table for each station in the api response
function DataRow({ station }) {
  return (
    <tr>
      <td>{station.name}</td>
      <td>{station.capacity}</td>
      <td>{station.num_bikes_available}</td>
      <td>{station.num_docks_available}</td>
    </tr>
  );
}

//comparing names used for sorting
function compare( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

export default App;
