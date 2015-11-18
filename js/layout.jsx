import React from "react";
import LanguageSwitch from "./components/LanguageSwitch.jsx!";
import Translatable from "./mixins/Translatable.jsx!";
import Http from "./core/Http.jsx!";

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
                        <input type="text" className="field" placeholder={this.t("username-placeholder")} ref="username" />
                        <input type="password" className="field" placeholder={this.t("password-placeholder")} ref="password" />
                        <input type="button" className="button" value={this.t("login-button")} onClick={this.login}/>
                    </div>
                </div>
            </div>
        );
    },

    login: function() {
        var refs = this.refs,
            username = refs.username.value,
            password = refs.password.value;

        if(! (username && password))
            return ;

        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        Http.post({
            url: cj.api("/auth/submit"),
            data: formData,
            success: this.onLoginSuccess,
            failure: this.onLoginFailure
        });
    },

    onLoginSuccess: function(response) {
        var xhr = response.currentTarget,
            response = xhr.responseText,
            json;

        try {
            json = JSON.parse(response);            
        } catch(e) {
            return this.onLoginFailure();
        }

        if(json.success)
            alert("Congrats!");
        else
            alert("validation");
    },

    onLoginFailure: function() {
        alert("error");
    }
});