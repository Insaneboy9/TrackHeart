import http from "k6/http";

export let options = {
    insecureSkipTLSVerify: true, 
    noConnectionReuse: false,
    stages: [
        {duration: '10s',target:100}, //below normal load
        {duration: '1m',target:100}, 
        {duration: '10s',target:1400}, // spike to 1400 users
        {duration: '3m',target:1400},  //stay at 1400 for 3mins
        {duration: '10s',target:100}, // scale down and recover
        {duration: '3m',target:100}, 
        {duration: '10s',target:0}, 
    ],
};

export default () => {
    http.get("http://localhost:8080/fullData")
}