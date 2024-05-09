const validate_phone_number = async (data = {
    cc: "",
    phone_number: ""
}) => {
    if ( !data.phone_number ) {
        throw new Error("empty_phone_number");
    }
    let response = await fetch("https://nexttrk.com/api/validate_phone_number/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    let json = await response.json();
    if ( response.ok ) {
        if ( !json.status ) {
            throw new Error("unknown_error");
        }
        return json;
    } else {
        let err = new Error(json.error ? json.error : "unknown_error");
        err.request_uuid = json.request_uuid ? json.request_uuid : null;
        throw err;
    }
};

export default validate_phone_number;