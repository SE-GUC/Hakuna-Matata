import React, { Component } from "react";
import axios from "axios";
import '../Task.css'
import Tasks from '../Tasks';
export class partnerTask extends Component {
  getStyle = () => {
    return {
      background: "grey"
    };
  };

  state = {
    project: null
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3333/tasks/${id}`).then(res => {
      this.setState({ project: res.data.data });
    });
  }

  getData() {
    if (this.state.project != null) {
      const {
        _id,
        description,
        requiredSkills,
        appliedConsultancies,
        name,
        taskPartner,
        deadline,
        deadlineForApply,
        uploadDate,
        submissionDate,
        experienceLevel,
        commitLevel,
        workCycle
      } = this.state.project;

      const filter = {};
      let rskills = "";
      let Agency = " ";
      for (let i = 0; i < requiredSkills.length; i++) {
        rskills += requiredSkills[i].name;
        if (i + 1 < requiredSkills.length) {
          rskills += " | ";
        }
      }
      if (appliedConsultancies) {
        for (let j = 0; j < appliedConsultancies.length; j++) {
          Agency += appliedConsultancies[j].data + " | ";
        }
      }

      const ButotnStyle = {
        backgroundColor: "#242424",
        color: "white",
        testAlign: "center",
        pading: "15px 32px",
        borderRadius: "12px",
        float: "right",
        fontSize: "12px",
        hight: "30px",
        width: "70px"
      };
      const p = {
        cursor: "pointer",
        Color: "white",
        background: "#F9BB32",
        borderRadius: "100%",
        position: "absolute",
        left: "44%",
        top: "2%",
        height: 66,
        width: 66
      };

      return (
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 130 130"
            style={{ position: "absolute", left: "48%", top: "0%" }}
          >
            <g
              id="Ellipse_1"
              data-name="Ellipse 1"
              fill="#f9bb32"
              stroke="#707070"
              stroke-width="1"
            >
              <circle cx="65" cy="65" r="65" stroke="none" />
              <circle cx="65" cy="65" r="64.5" fill="none" />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="40"
            viewBox="0 0 37 62"
            style={{ position: "absolute", left: "49%", top: "0.70%" }}
          >
            <text
              id="P"
              transform="translate(0 50)"
              fill="#242424"
              font-size="55"
              font-family="Arial-BoldMT, Arial"
              font-weight="700"
            >
              <tspan x="0" y="0">
                T
              </tspan>
            </text>
          </svg>
          <br />
          <br />
          <br />
          <p />
          <p />
          <p />
          <br />
          <p />
          info
          <div class="hline" />
          <p />
          <ul style={{width:445}}>
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Title: </t> {name}
            <p />
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Partner: </t> {taskPartner.name}{" "}
            <button style={ButotnStyle}> visit </button>
            <p />
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Agency: </t> {Agency}{" "}
            <button style={ButotnStyle}> visit </button>
            <p />
            <br></br>
            <br></br>
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Skills: </t>
            {rskills}
            <p />
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Deadline: </t>
            {deadline}
            <p />
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Deadline For Apply: </t>
            {deadlineForApply}
            <p />
            <br></br>
            <br></br>
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Upload Date: </t>
            {uploadDate}
            <p />
            <br></br>
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Submission Date: </t> {submissionDate}
            <p />
            <br></br>
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Experience Level: </t>
            {experienceLevel}
            <p />
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> Commit Level: </t>
            {commitLevel}
            <p />
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> work cycle: </t>
            {workCycle}
            <p />
            <br></br>
            <br></br>
            <t class="textcolor" style={{position:'absolute',left:"34%"}}> description: </t>
            {description}
          </ul>
        </p>
      );
    }
  }
  render() {
    return (
      <div className="GetAllAgencies">
        <div className="html">{this.getData()}</div>
      </div>
    );
  }
}
export default partnerTask;
