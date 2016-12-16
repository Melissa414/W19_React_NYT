// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>Articles:</h1>
            {this.props.queryResults}

            {/* Here we use a map function to loop through an array in JSX }
            {this.props.queryResults.map(function(Headlines, i) {
              return (
                <p key={i}>{Headlines.headline} - {Headlines.web_url}</p>
              );
            })}
          */}

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
