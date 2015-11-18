import React from "react";
import LanguageSwitch from "./components/LanguageSwitch.jsx!";
import Translatable from "./mixins/Translatable.jsx!";

export default React.createClass({
    mixins: [Translatable],
    render: function() {
        return (
            <div className="layout">
                <div className="layout-inner">
                    <LanguageSwitch />
                </div>
            </div>
        );
    }
});