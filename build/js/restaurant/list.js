var RestaurantList = React.createClass({displayName: 'RestaurantList',

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleListItemClicked: function(restaurant_id) {
        var restaurant = _.find(this.state.data, {business_id: restaurant_id})
        this.refs.restaurantView.setState({restaurant: restaurant})
    },

    handleClick: function(event) {
        console.log(document.getElementById("text").value)
        $.get("http://access.alchemyapi.com/calls/text/TextGetTextSentiment?&apikey=" + apikey + "&outputMode=json&text="+document.getElementById("text").value, function(data) {

            console.log(data)
            if (data){
                var analysis = document.getElementById("text").value + " is " + data.docSentiment.score*100 + "% " + data.docSentiment.type + "."
                document.getElementById("output").innerHTML=analysis
            }

        })
    },

    render: function() {

        var self = this

        var restaurants = this.state.data.map(function(restaurant) {
            return (
                <RestaurantListItem restaurant={restaurant} onListItemClicked={self.handleListItemClicked}/>
                )
        })

        return (
            <div className="restaurantPage">
                <div className="restaurantList six columns">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Text Analysis" id="text">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" onClick={this.handleClick}>Go!</button>
                        </span>
                        </input>
                    </div>
                </div>
                <div className="restaurantView six columns">
                    <RestaurantView ref="restaurantView"/>
                    <p id="output"></p>
                </div>
            </div>
        )
    }
})
