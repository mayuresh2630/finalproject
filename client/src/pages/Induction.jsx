import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "react-date-range";
import Axios from "axios";
import DisplayTable from "./DisplayTable";
import { useParams } from "react-router-dom";
import "./Induction.css"

const Induction = () => {
  const {dept:department}=useParams()
  const [dept, setDept] = React.useState(department=="induction"?"":department);
  const [loading, setLoading] = React.useState("");
  const [generated, setGenerated] = React.useState(false);
  const [date, setDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [generatedData, setGeneratedData] = React.useState([]);
  async function generate() {
    try {
      setLoading(true);
      let response = await Axios.get(
        `http://localhost:4000/api/excels/filter?${dept && `dept=${dept}&`}${
          date.startDate &&
          date.endDate &&
          `fromDate=${date.startDate}&toDate=${date.endDate}`
        }`
      );
      if (!response.data.status) {
        setLoading(false);
        return;
      }

      setLoading(false);
      setGeneratedData(response.data.data);
      setGenerated(true);
    } catch (error) {}
  }
  return (
    <div className="calender">
      <div className="d-flex">
        <div>
          <p>from date</p>
          <input
            type="date"
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
            max={date.endDate}
            value={date.startDate}
          />
        </div>
        <div>
          <p>end date</p>
          <input
            disabled={!date.startDate}
            onChange={(e) => setDate({ ...date, endDate: e.target.value })}
            type="date"
            min={date.startDate}
            value={date.endDate}
          />
        </div>
      </div>
      {/* <div>
        <p>dept</p>
        <select
          id="selectsuccess"
          className="box"
          name="designation"
          onChange={(e) => setDept(e.target.value)}
        >
          {options.map((option) => (
            <option value={option.value}>{option.show}</option>
          ))}
        </select>
      </div> */}
      <button className="mt-4" disabled={loading} onClick={generate}>
        {generated ? "Generated" : "Generate"}
      </button>
      {generated && generatedData ? (
        <DisplayTable tableData={generatedData} title={process.env.PUBLIC_URL + images[department]} />
      ) : null}
    </div>
  );
};
const options = [
  { value: "", show: "All" },
  // { value: "FO", show: "FO" },
  // { value: "STORE", show: "STORE" },
  // { value: "power", show: "power" },
];

const images= {
  induction:"/images/induction1.png",
  FO:"/images/FO.png",
  POWER:"/images/power.png",
  STORE:"/images/ofc.png",
  AISG:"/images/aisg.png",
  ENTERPRISE:"/images/enterprise.png",
  RF:"/images/rf.png",
  OFC:"/images/ofc.png"


}
export default Induction;