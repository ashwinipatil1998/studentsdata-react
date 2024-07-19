import "./App.css";
import { useState } from "react";

export default function App() {
  const [formStatus, setFormStatus] = useState("");

  async function Submit(e) {
    const formEle = document.querySelector("form");
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(formEle);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbweeyb60fpfNF7infaIjfHolE89UKVQKqHo5ZtRuaHFYdJ-VXij_JbqoiK2ba2NzoGT/exec", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      
      if (data === "Success") {
        alert("There was an error submitting the form");
        formEle.reset();
        setFormStatus("There was an error submitting the form");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Successfully submitted the form");
      setFormStatus("Successfully submitted the form");
    }
  }

  return (
    <div className="App">
      <div className="form-container">
        <h1>Student Data Form</h1>
        <form className="form" onSubmit={(e) => Submit(e)}>
          <input type="text" name="Name" placeholder="Name" required /><br />
          <input type="email" name="Student_email" placeholder="Email" required /><br />
          <input type="text" name="Campus" placeholder="Campus" required /><br />
          <input type="text" name="Current_Module" placeholder="Current Module" required /><br />
          <input type="date" name="Module_Start_Date" placeholder="Module Start Date" required /><br />
          <input type="date" name="Module_End_Date" placeholder="Module End Date" required /><br />
          <input type="number" name="Self_assessment_score" placeholder="Self Assessment Score" required /><br />
          <input className="button" type="submit" value="Submit" />
        </form>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </div>
    </div>
  );
}