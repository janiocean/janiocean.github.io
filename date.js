const target_url = 'https://api.github.com/repos/janiocean/janiocean.github.io/branches/main'

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

getJSON(target_url,
    function(err, data) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            var inp = data["commit"]["commit"]["author"]["date"];
            var commit_date = new Date(inp);
            var diff_date = Date.now() - commit_date.getTime();
            var hours = Math.floor(diff_date / (1000 * 60 * 60));
            var date_text = "";
            if (hours < 24) {
                if (hours == 0) { date_text = "меньше часа назад"; } else
                if (hours == 1) { date_text = "час назад"; } else
                if (hours > 1 && hours < 5) { date_text = hours + " часа назад"; }
                else { date_text = hours + " часов назад"; }
            }
            else {
                var days = Math.floor(hours / 24);
                if (days == 1) { date_text = "день назад"; } else
                if (days > 1 && days < 5) { date_text = days + " дня назад"; }
                else { date_text = days + " дней назад"}
            }
            document.getElementById('last_update_label').innerHTML += date_text;
        }
    }
);