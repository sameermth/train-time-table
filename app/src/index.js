import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

class App extends React.Component{
	
	state = {
		informationAvailable: false,
		trainTimeTables: [],
		trainNumber: null,
		error: null
	}
	
	constructor(props){
		super(props);
		
		this.search = this.search.bind(this);
		this.changeTrainNumber = this.changeTrainNumber.bind(this);
	}
	
	search(event){
		event.preventDefault();
		const {informationAvailable, trainNumber, trainTimeTables, error } = this.state;
		
		$.ajax({ type: "POST", 
				url: "http://localhost/train/index.php", 
				data: {train_number: trainNumber}, 
				datatype: "jsonp",
				crossDomain: true,
				success: function(data){	
					var station = JSON.parse(data);
					var myArray = station.slice();
					if(myArray.length>0){
					this.setState({
						trainTimeTables: myArray,
						informationAvailable: true,
						error: error!=null?null:null
					})
					}
					else{
						this.setState({
							error: 'Train Number does not exist Enter Valid Train Number',
							informationAvailable: false
						})
					}
					
				}.bind(this),
				error: function(data) {
					this.setState({
						error: data
					})
				}.bind(this)
        });
	}
	
	changeTrainNumber(event){
		this.setState({
			trainNumber: event.target.value
		})
	}
	
	render(){
		
		const { informationAvailable, trainTimeTables, trainNumber, error } = this.state;
		
		const display = (
							<div className="app-container">
								<div className="title">
									<h1>{trainNumber} Route</h1>
								</div>
								<div className="route">
									<table className="route-table">
										<thead className="table-heading">
											<tr>
												<th>S. No.  </th>
												<th>Station Code </th>
												<th>Station Name </th>
												<th>Arrival Time </th>
												<th>Departure Time </th>
											</tr>
										</thead>
										<tbody className="table-body">
											{
												trainTimeTables.map(trainTimeTable => (<tr>
																							<td>
																								{trainTimeTable.sequence}
																							</td>
																							<td>
																								{trainTimeTable.stationCode}
																							</td>
																							<td>
																								{trainTimeTable.stationName}
																							</td>
																							<td>
																								{trainTimeTable.arrivalTime}
																							</td>
																							<td>
																								{trainTimeTable.departureTime}
																							</td>
																						</tr>))
											}
										</tbody>
									</table>
								</div>
							</div>
						)
		const  	defaultDisplay= (
					<div className="app-container">
						<div className="title">
							<h1> Train Time Table </h1>
							<div>
								<form action="#" onSubmit={this.search} className="form">
									<input type="text" name="trainNumber" placeholder="Enter Train Number" onChange={this.changeTrainNumber}/> 
									<button type="submit" >Search</button>
								</form>
							</div>
							<span className="error">{error}</span>
						</div>
					</div>
					)
		return (
		<div>
		<pre>{
			//JSON.stringify(this.state, null, 2)
		}
		</pre>
		{//informationAvailable ? display : defaultDisplay
			defaultDisplay
		}
		{
			informationAvailable?display: null
		}
		</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))