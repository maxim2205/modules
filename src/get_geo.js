const get_geo = async () => {
    let response = await fetch("https://pro.ip-api.com/json/?fields=status,message,country,countryCode,countryCode3,region,regionName,city,zip,lat,lon,timezone,offset,callingCode,isp,org,as,mobile,proxy,hosting,query&key=vCJSQarNduxSd9M");

    if ( response.ok ) {
        let json = await response.json();
        if ( json.status !== 'success' ) {
            throw new Error();
        }
        return json;
    } else {
        throw new Error();
    }
};

export default get_geo;