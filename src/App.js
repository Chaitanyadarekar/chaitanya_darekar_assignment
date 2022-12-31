import "./styles.css";
import { useState, forwardRef, useEffect, useRef } from "react";
import { socialNetwork } from "./socialNetwork";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useToastMessage } from "./useToastMessage";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const [graph, setGraph] = useState(new socialNetwork());
  const [personName, setPersonName] = useState("");
  const [connection1, setConnection1] = useState("");
  const [connection2, setConnection2] = useState("");
  const [persons, setPersons] = useState([]);
  const [mutualConnections, setMutualConnections] = useState([]);
  const [
    message,
    severity,
    showMessage,
    setShowMessage,
    handleToastMsg
  ] = useToastMessage();
  const isMounted = useRef(false);

  const isEmpty = (value) => value === "" || value === null;
  const handleAddPerson = () => {
    if (isEmpty(personName)) {
      handleToastMsg("Value is empty", "error");
      return;
    }
    graph.addPerson(personName);
    setGraph(graph);
    setPersons(graph.getPersons());
    setPersonName("");
    handleToastMsg("Person added", "success");
  };

  const handleAddConnection = () => {
    if (isEmpty(connection1) || isEmpty(connection2)) {
      handleToastMsg("Value is empty", "error");
      return;
    }
    graph.addConnection(connection1, connection2);
    setGraph(graph);
    handleToastMsg("Connection added", "success");
  };

  const printMutualConnection = () => {
    if (isEmpty(connection1) || isEmpty(connection2)) {
      handleToastMsg("Value is empty", "error");
      return;
    }
    setMutualConnections(graph.getShortestPath(connection1, connection2));
  };

  useEffect(() => {
    if (!isMounted.currrent) {
      isMounted.current = true;
      return;
    }
    if (mutualConnections.length === 0) {
      handleToastMsg("No connection found", "error");
    }
  }, [mutualConnections]);

  return (
    <div className="App">
      <Grid mt={15} direction="row" justifyContent="center">
        <TextField
          sx={{ margin: "0 1rem", width: 200, display: "inline-block" }}
          value={personName}
          id="outlined-basic"
          label="Enter Person Name"
          variant="outlined"
          onChange={(e) => {
            setPersonName(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleAddPerson}>
          Add Person
        </Button>
      </Grid>

      <Grid direction="row" m={3} justifyContent="center">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={persons}
          onChange={(e, value) => {
            setConnection1(value);
          }}
          sx={{ margin: "0 1rem", width: 200, display: "inline-block" }}
          renderInput={(params) => (
            <TextField {...params} label="Add Person 1" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={persons}
          onChange={(e, value) => {
            setConnection2(value);
          }}
          sx={{ margin: "1rem", width: 200, display: "inline-block" }}
          renderInput={(params) => (
            <TextField {...params} label="Add Person 2" />
          )}
        />
        <Button
          sx={{ display: "inline-block" }}
          variant="contained"
          onClick={handleAddConnection}
        >
          Add Connection
        </Button>
      </Grid>

      <Grid sx={{ marginTop: "1rem" }}>
        <Button
          sx={{ display: "inline-block" }}
          variant="contained"
          onClick={printMutualConnection}
        >
          Get Mutual Connections
        </Button>
        {mutualConnections.length > 0 && (
          <Grid sx={{ marginTop: "1rem" }}>
            {mutualConnections.map((el, index) => (
              <span style={{ fontSize: "32px", fontStyle: "italic" }}>
                {`${el} `}
                {index !== mutualConnections.length - 1 ? `> ` : ``}
              </span>
            ))}
          </Grid>
        )}
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showMessage}
        autoHideDuration={6000}
        onClose={() => setShowMessage(false)}
      >
        <Alert
          onClose={() => setShowMessage(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
