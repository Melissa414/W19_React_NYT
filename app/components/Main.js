// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with each component
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    console.log('running NYT API Request');
    // Prevent API call on initial page load
    if (!this.state.searchTerm) {
      return;
    }

    // Run the query for the articles
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("NYT", data);
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        // helpers.postHistory(this.state.searchTerm).then(function() {
        //   console.log("Updated!");

        //   // After we've done the post... then get the updated history
        //   helpers.getHistory().then(function(response) {
        //     console.log("Current History", response.data);

        //     console.log("History", response.data);

        //     this.setState({ history: response.data });

        //   }.bind(this));
        // }.bind(this));
      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerms: function(term) {
    this.setState({ searchTerm: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Article Scanner</h2>
            <p className="text-center">
              Search for and annotate articles of interest
              <em>Enter parameters to search the New York Times article database.</em>
            </p>
          </div>

          <div className="col-md-6">

            {/*Link to the form component*/}
            <Form setTerms={this.setTerms} />

          </div>

          <div className="col-md-6">

            {/*Link to the Results component*/}
            <Results queryResults={this.state.results} />

          </div>

        </div>

        <div className="row">

          {/*Link to the Saved component*/}
          <Saved savedArticles={this.state.savedArticles} />

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
