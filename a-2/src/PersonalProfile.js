import React, {Component} from "react";

class PersonalProfile extends Component{
    render(){
        return (
            <div className="hd2">
                <div className="hd2_c1">
                    <p><b><i>{this.props.personal.name}</i></b></p>
                </div>
                <div className="hd2_c2">
                    <p>{this.props.personal.text}</p>
                </div>
            </div>
        )
    }
}
export default PersonalProfile;