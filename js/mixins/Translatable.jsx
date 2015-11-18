import React from "react";
import EventBus from "../components/EventBus.jsx!";

export default {
    componentWillMount: function() {
        EventBus.on("language-change", this.onLanguageChange);
    },

    componentWillUnmount: function() {
        EventBus.un("language-change", this.onLanguageChange);
    },

    onLanguageChange: function() {
        this.setState({});
    },

    t: function(key) {
        return window.translations[window.cj.language][key];
    }
};