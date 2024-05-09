const get_all = () => {
    let params = {};
    location.search.slice(1).split("&").forEach(function (el) {
        let param = el.split("=");
        params[param[0]] = decodeURIComponent(param[1]);
    });
    return params;
}

const get_one = name => {
    return get_all()[name];
}


export default {
    get_all,
    get_one
};