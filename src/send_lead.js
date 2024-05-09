const send_lead = async (data = {
    test_mode: false,
    lead_tag_id: 0,
    lang: "",
    ip: "",
    phone_number: "",
    cc: "",
    email: "",
    first_name: "",
    last_name: "",
    full_name: "",
    data: {},
    workers: [{
        name: "",
        data: {}
    }]
}) => {
    if ( !data.lead_tag_id || data.lead_tag_id === "" ) {
        throw new Error("empty_lead_tag_id");
    }
    if ( !data.phone_number && !data.email ) {
        throw new Error("empty_phone_number_and_email");
    }
    let response = await fetch("https://nexttrk.com/leads/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    let json = await response.json();
    if ( response.ok ) {
        return json;
    }
    throw new Error(json.error ? json.error : "unknown_error");
};

export default send_lead;