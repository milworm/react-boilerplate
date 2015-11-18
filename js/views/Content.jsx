import React from "react";
import Translatable from "../mixins/Translatable.jsx!";

export default React.createClass({
    mixins: [Translatable],

    render: function() {
        return (
            <div className="content">
                <div className="description-container">
                    <h2>
                        <i className="logo"></i>Knowledge Portal
                    </h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textthe 1500s.
                    </p>
                </div>

                <div className="login-container">
                    <div className="login-title">Login to your account</div>
                    <input type="text" className="field" placeholder="Username" />
                    <input type="password" className="field" placeholder="Password" />
                    <input type="button" className="button" value="LOGIN"/>
                    <span className="create-account-link">
                        or <a onClick={this.toRegistration}>create an account.</a>
                    </span>
                </div>
            </div>
        );
    },

    toRegistration: function() {
        alert("registration");
    }
});