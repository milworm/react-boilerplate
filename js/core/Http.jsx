export default {
    post: function(config) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", config.url, true);
        xhr.addEventListener("load", config.success);
        xhr.addEventListener("error", config.failure);
        xhr.send(config.data);
    }
}