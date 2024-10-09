import React, { Component } from "react";
import Header from './Header.js';
import PersonalProfile from "./PersonalProfile.js"
import WorkExperience from "./WorkExperience.js"
import Skills from "./Skills.js"
import Education from "./Education.js"
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      personInfo: {
        name: "Zh Rimel",
        occupation: "Data Scientist"
      },
      contactInfo: {
        email: "abc@gmail.com",
        website: "abc.github.io/abc",
        mobilenumber: "01234567890"
      },
      personal: {
        name: "Personal Profile",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      workexperience: {
        title: "Work Experience",
        workposone: "Job Title at Company (August 2022 – December 2023)",
        // workonedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        workpostwo: "Job Title 2 at Company 2 (August 2020 – December 2021)",
        // workonedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      skills: {
        title: "Key Skills",
        text: "A Key Skill"
      },
      education: {
        title: "Education",
        eduone: "New Jersey Institute of Technology",
        edumajorone: "BS in Computer Science",
        eduyearone: "2018 - 2022",
        edugpaone: "GPA: 3.9",
        edutwo: "New Jersey Institute of Technology",
        edumajortwo: "MS in Data Science",
        eduyeartwo: "2022 - 2023",
        edugpatwo: "GPA: 4.0",
      }
    };
  };

  render() { 
    return (
    <div class="main-container">
    <Header personInfo={this.state.personInfo} contactInfo={this.state.contactInfo} />
    <PersonalProfile personal={this.state.personal} />
    <hr/>
    <WorkExperience workexperience={this.state.workexperience} personal={this.state.personal} />
    <hr />
    <Skills skills={this.state.skills} />
    <hr />
    <Education education={this.state.education} />
    </div>
  );
};
};

export default App;
