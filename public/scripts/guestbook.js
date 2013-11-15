

$(function () {
    $(".entry").each(
        function (index, value) {
            var email = $(".email", this).html();
            var hash = md5(email);

            $("img", this)
                .error(function () { $(this).attr("src", "/public/images/gravatar.jpg"); })
                .attr("src", "http://www.gravatar.com/avatar/" + hash + ".jpg?s=50&d=404");
        }
    );

    $("img[data-email]").each(function (index, value) {
        var self = $(this);
        var email = $(value).attr("data-email");
        console.log(email);
        var hash = md5(email);

        $.ajax({
            url: "http://www.gravatar.com/avatar/" + hash + ".jpg?s=50&d=200",
            type: "GET",
            success: function () {
                self.attr("src", "http://www.gravatar.com/avatar/" + hash + ".jpg");
            },
            error: function () {
                self.attr("src", "/images/cat-001.png");
            }
        });

    }
    );
});