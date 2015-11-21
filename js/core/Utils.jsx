export default {
    tpl: function(tpl, config) {
        return tpl.replace(/\{([^\}]+)\}/g, function(a, b) {
            return config[b];
        })
    }
}