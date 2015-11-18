import React from "react";
import LanguageSwitch from "./components/LanguageSwitch.jsx!";
import Translatable from "./mixins/Translatable.jsx!";

export default React.createClass({
    mixins: [Translatable],
    render: function() {
        return (
            <div className="layout">
                <LanguageSwitch />
                <div className="content">
                    <div className="description-container">
                        <h2>
                            <i className="logo"></i>{this.t("description-title")}
                        </h2>
                        <p>
                            {this.t("description-text")}
                        </p>
                    </div>

                    <div className="login-container">
                        <div className="login-title">{this.t("login-title")}</div>
                        <input type="text" className="field" placeholder={this.t("username-placeholder")} />
                        <input type="password" className="field" placeholder={this.t("password-placeholder")} />
                        <input type="button" className="button" value={this.t("login-button")}/>
                    </div>
                </div>
            </div>
        );
    }
});