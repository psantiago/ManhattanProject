exports.new = function (name, email, message, approved, date) {
    return {
        name: name,
        email: email,
        message: message,
        approved: approved,
        date: date
    };
}