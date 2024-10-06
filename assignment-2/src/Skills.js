import React, {Component} from "react";

class Skills extends Component{
    render(){
        return (
            <div className="hd4">
                <div className="hd4_c1">
                    <p><b><i>{this.props.skills.title}</i></b></p>
                </div>
                <div className="hd4_c2">
                    <table>
                        <tr>
                            <td>{this.props.skills.text}</td>
                            <td>{this.props.skills.text}</td>
                            <td>{this.props.skills.text}</td>
                        </tr>
                        <tr>
                            <td>{this.props.skills.text}</td>
                            <td>{this.props.skills.text}</td>
                            <td>{this.props.skills.text}</td>
                        </tr>
                        <tr>
                            <td>{this.props.skills.text}</td>
                            <td>{this.props.skills.text}</td>
                            <td>{this.props.skills.text}</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
export default Skills;