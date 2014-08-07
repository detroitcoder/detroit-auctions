// creates a globally unique string
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

// Returns the previous user_id if they have connected before. Otherwise it creates
//  a new id. If browser does not support localstorage a new guid will be created on
//  every login.
function get_user_id() {
    if (typeof(Storage) != "undefined") {
        var user_id;
        if (localStorage.getItem("guid")) {
            user_id = localStorage.getItem("guid");
        }
        else {
            user_id = guid();
            localStorage.setItem("guid", user_id);
        }
    }
    else {
        user_id = guid();
    }
    return user_id
}

