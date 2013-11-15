

$(function () {
    $(".entry").each(
        function (index) {
            var email = $(".email", this).html();
            var hash = md5(email);

            $("img", this)
                .error(function () { $(this).attr("src","/public/images/gravatar.jpg"); })
                .attr("src", "http://www.gravatar.com/avatar/" + hash + ".jpg?s=50&d=404");
        }
    );
});