import React from "react";
import EventBus from "./EventBus.jsx!";
import cls from "classnames";

export default React.createClass({
    mixins: [EventBus],
    getInitialState: function() {
        return {
            language: cj.language
        }
    },

    render: function() {
        var language = this.state.language;

        return (
            <div className="language-switch">
                <div className={cls("language", {active: language == "fr"})} onClick={this.change.bind(this, "fr")}>FR</div>
                <div className={cls("language", {active: language == "en"})} onClick={this.change.bind(this, "en")}>EN</div>
            </div>
        );
    },

    change: function(language) {
        cj.language = language;
        localStorage.setItem("language", language);

        this.setState({
            language: language
        });

        EventBus.fire("language-change");
    }
});