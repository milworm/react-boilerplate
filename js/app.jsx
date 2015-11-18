import React from "react";
import LanguageSwitch from "./components/LanguageSwitch.jsx!";
import Translatable from "./mixins/Translatable.jsx!";
import Eventable from "./mixins/Eventable.jsx!";

export default React.createClass({
    mixins: [Eventable, Translatable],
    render: function() {
        return (
            <div className="layout">
                <LanguageSwitch />
                <h1>{this.t("hello")}</h1>
            </div>
        );
    }
});