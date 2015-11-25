import React from "react";
import LanguageSwitch from "./components/LanguageSwitch.jsx";
import Translatable from "./mixins/Translatable.jsx";
import Http from "./core/Http.jsx";
import Utils from "./core/Utils.jsx";
import cls from "classnames";

export default React.createClass({
    mixins: [Translatable],

    getInitialState: function() {
        return {
            formIsInvalid: false,
            showLoginForm: false
        }
    },

    render: function() {
        return (
            <div className={cls("layout", {
                "login-form-visible": this.state.showLoginForm,
                "login-form-invalid": this.state.formIsInvalid
            })} style={{
                backgroundImage: Utils.tpl('url("{background_url}")', cj.portal.ui)
            }}>
                <LanguageSwitch />
                <div className="content">
                    <div className="description-container">
                        <h2>
                            <i className="logo" style={{
                                backgroundImage: Utils.tpl('url("{logo_url}")', cj.portal.ui)
                            }}></i>{this.t("description-title")}
                        </h2>
                        <p>
                            {this.t("description-text")}
                        </p>
                    </div>

                    <div className="login-container">
                        <div className="login-title">{this.t("login-title")}</div>
                        <input type="text" 
                                className="field" 
                                placeholder={this.t("username-placeholder")} 
                                ref="username" 
                                onInput={this.onFieldChange} />
                        <input type="password" 
                                className="field" 
                                placeholder={this.t("password-placeholder")} 
                                ref="password" 
                                onInput={this.onFieldChange} />
                        <input type="button" 
                                className="button" 
                                value={this.getLoginButtonText()} 
                                onClick={this.login}
                                style={{
                                    background: cj.portal.ui.login_button_bg
                                }} />
                    </div>
                    <input type="button" 
                            className="show-login-form-button" 
                            value={this.t("show-login-form-button")} 
                            onClick={this.showLoginForm} />
                </div>
                <footer>
                    <div className="inner" dangerouslySetInnerHTML={{
                        __html: Utils.tpl(this.t("support"), cj.portal.support)
                    }}></div>
                </footer>
            </div>
        );
    },

    onFieldChange: function() {
        this.setState({
            formIsInvalid: false
        });
    },

    getLoginButtonText: function() {
        if(this.state.formIsInvalid)
            return this.t("invalid-login-button");
        
        return this.t("login-button");
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

    showLoginForm: function() {
        this.setState({
            showLoginForm: true
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
            return alert("Super");
        
        this.setState({
            formIsInvalid: true
        });
    },

    onLoginFailure: function() {}
});