import React, {Component} from "react";

class WorkExperience extends Component{
    render(){
        return (
            <div className="hd3">
                <div className="hd3_c1">
                    <p><b><i>{this.props.workexperience.title}</i></b></p>
                </div>
                <div className="hd3_c2">
                    <p><h3>{this.props.workexperience.workposone}</h3>
                    {this.props.personal.text}</p>
                    <p><h3>{this.props.workexperience.workpostwo}</h3>
                    {this.props.personal.text}</p>
                </div>
            </div>
        )
    }
}
export default WorkExperience;