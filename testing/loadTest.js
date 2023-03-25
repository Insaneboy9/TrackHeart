import http from "k6/http";

export let options = {
    insecureSkipTLSVerify: true, 
    noConnectionReuse: false,
    stages: [
        {duration: '5m',target:100}, //simulate ramp up of traffice to 100 users over 5 mins
        {duration: '10m',target:100}, //stay at 100 users for 10mins
        {duration: '5m',target:0}, //ramp down to 0 users
    ],
};

export default () => {
    http.get("http://localhost:8080/fullData")
}