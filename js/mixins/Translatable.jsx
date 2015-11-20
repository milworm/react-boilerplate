import React from "react";
import Translations from "../../config/translations";
import EventBus from "../components/EventBus.jsx";

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
        return Translations[cj.language][key];
    }
};