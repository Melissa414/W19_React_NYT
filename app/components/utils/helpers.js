// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(searchTerm, recordsToReturn, userStartDate, userEndDate) {

    console.log('Trying to connect to the NYT API');
    //NYT API
    var beginningDate = "&begin_date=18000101";
    var endDate = "&end_date=20161212";

    // if (userStartDate.length == 8) {
    //    beginningDate =  "&begin_date=" + userStartDate;
    // }
    // if (userEndDate.length == 8) {
    //    endDate =  "&end_date=" + userEndDate;
    // }

    //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=oil&begin_date=&begin_date=18000101&end_date=&end_date=20161212&api-key=56de0714f810449bba3bab87764788e9
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + beginningDate + endDate;
    queryURL += "&api-key=56de0714f810449bba3bab87764788e9";

    console.log(queryURL);
    return axios.get(queryURL).then(function(result) {
      console.log(result);
      // If get a result, return that result's formatted
      if (result) {
        return result.data.response.docs[0].headline.main;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    console.log('Retrieve saved data');
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api/saved", { location: location });
  }
};

// We export the API helper
module.exports = helper;
