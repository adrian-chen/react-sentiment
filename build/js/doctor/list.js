var DoctorList = React.createClass({displayName: 'DoctorList',

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

    handleListItemClicked: function(business_id){
        var doctor = _.find(this.state.data, {business_id: business_id})
        this.refs.doctorView.setState({doctor:doctor})
    },

    handleClick1: function(event) {
        console.log(document.getElementById("text1").value)
        $.get("http://access.alchemyapi.com/calls/url/URLGetTextSentiment?&apikey=" + apikey + "&showSourceText=1&outputMode=json&url="+document.getElementById("text1").value, function(data) {

            console.log(data)
            if (data){
                var analysis = document.getElementById("text1").value + " is " + data.docSentiment.score*100 + "% " + data.docSentiment.type + "."
                document.getElementById("output1").innerHTML=analysis
            }

        })
    },

    handleClick2: function(event) {
        console.log(document.getElementById("text2").value)
        $.get("http://access.alchemyapi.com/calls/url/URLGetTextSentiment?&apikey=" + apikey + "&showSourceText=1&outputMode=json&url="+document.getElementById("text2").value, function(data) {

            console.log(data)
            if (data){
                var analysis = document.getElementById("text1").value + " is " + data.docSentiment.score*100 + "% " + data.docSentiment.type + "."
                document.getElementById("output2").innerHTML=analysis
            }

        })
    },

    render: function() {

        var self = this

        var doctors = this.state.data.map(function (doctor) {
        
          return (    
            <DoctorListItem doctor={doctor} onListItemClicked={self.handleListItemClicked}/>
            )
        })        

        return (
            <div className="doctorPage">
                <div className="doctorList six columns">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Text Analysis" id="text1">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" onClick={this.handleClick1}>Go!</button>
                        </span>
                        </input>
                    </div>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Text Analysis" id="text2">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" onClick={this.handleClick2}>Go!</button>
                        </span>
                        </input>
                    </div>
                </div>
                <div className="doctorView six columns">
                    <DoctorView ref="doctorView"/>
                    <p id="output1"></p>
                    <p id="output2"></p>
                </div>
            </div>
        )
    }
})
