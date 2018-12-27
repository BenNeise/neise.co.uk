$(document).ready(function() {


    $('.box:not(".big")').each(function() {
        var l = 0
        $("p").each(function() {
            var text = $(this).html();
            text = text.replace('&#x27;', "'");
            text = text.replace('&amp;', '&');
            $(this).html(text);
        });
        $(this).find('p').each(function() {
            var pcontent = $(this).text()
            pcontent = pcontent.split('&#x27;').join("'");
            pcontent = pcontent.split('&amp;').join('&');
            l = l + pcontent.length
            if (l > 170) {
                var pcontent = jQuery.trim(pcontent).substring(0, 170).split(" ").slice(0, -1).join(" ") + "...";
                $(this).text(pcontent)
            }
        });
    });


    // Makes specific DIVs clickable
    $('.clickable').click(function() {
        window.location = $(this).find('a').attr('href');
        return false;
    });

    tippy('.box', {
        placement: 'top-end',
        offset: '0px, -10px',
        maxWidth: '180px',
        arrow: true
    });

});

function pocket(uri) {
    // Pocket
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var pocketContent = ""
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                var lastThreePocketItems = ""
                for (var i = 0; i < 3; i++) {
                    pocketContent += '<p><a href="' +
                        myObj.query.results.item[i].link +
                        '">' +
                        myObj.query.results.item[i].title +
                        '</a></p>';
                }
            } else {
                pocketContent = '<p><a href="http://getpocket.com/users/guruant/feed/read">My Pocket profile</a></p>'
            }
            document.getElementById("contentPocket").innerHTML = pocketContent
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send()
}

function youtube(uri) {
    // YouTube
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var content
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                thumbnailurl = myObj.query.results.feed.entry[0].group.thumbnail.url
                $('#youtube').css('background-image', 'url(' + thumbnailurl + ')');
            } else {
                content = '<p>My YouTube Channel</p>'
            }
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send()
}

function blog(uri) {
    // Blog
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var blogContent
        var latestPost
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                latestPost = myObj.query.results.feed[0].entry.title.content
                blogLink = myObj.query.results.feed[0].entry.link.href
                blogContent = '<p><a href="' + blogLink + '">' + latestPost + '</a></p>'
            } else {
                blogContent = '<p>My blog</p>'
            }
            document.getElementById("contentBlog").innerHTML = blogContent
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}

function pintrest(uri) {
    // Pintrest
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                var pintrestHtml = myObj.query.results.item[0].description
                var pintrestImageUri = $(pintrestHtml).find('img').attr('src');
                $('#pinterest').css('background-image', 'url(' + pintrestImageUri + ')');
            } else {
                console.log("Can't get pintrest content, so hiding element")
                $('#pinterest').hide()
            }
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}

function flickr(uri) {
    // Flickr
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                var link = myObj.query.results.item[0].content.url
                $('#flickr').css('background-image', 'url(' + link + ')');
            } else {
                console.log("Can't get flickr content, so hiding element")
                $('#flickr').hide()
            }
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}

function twitter(uri) {
    // Twitter
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var latestTweet
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                // if it contains an image
                //console.log(myObj.query.results.item[0].description)
                if (!!$('<div />').html(myObj.query.results.item[0].description).find('img').length) {
                    latestTweet = null
                    $('#twitter').css('background-image', 'url(' + $('<div />').html(myObj.query.results.item[0].description).find('img')[0].src + ')');
                    //$('#twitter').addClass("clickable")
                    $('#twitter').css('background-position', 'center');
                    $('#twitter a').css("background-color", "transparent");
                    $('#twitter').click(function() {
                        window.location = $(this).find('a').attr('href');
                        return false;
                    })
                } else {
                    latestTweet = myObj.query.results.item[0].description
                }

            } else {
                latestTweet = "Visit me on Twitter"
            }
            document.getElementById("contentTwitter").innerHTML = latestTweet
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}

function tumblr(uri) {
    // Tumblr
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj.query.results !== null) {
                var lastThreeTumblrItems = ""
                for (var i = 0; i < 3; i++) {
                    lastThreeTumblrItems += '<p><a href="' +
                        myObj.query.results.item[i].link +
                        '">' +
                        myObj.query.results.item[i].title +
                        '</a></p>';
                }
            } else {
                var lastThreeTumblrItems = "<p>My Tumblr</p>"
            }
            document.getElementById("contentTumblr").innerHTML = lastThreeTumblrItems
        }
    };
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
}