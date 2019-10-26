import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import getLocalDate from "../../../../utils/getLocalDate"

class ViewAllRequestsItem extends Component {
	render() {
		const {lorItem} = this.props;
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		let color='black';
		function convertToFullText(status) {
			if(status === 'AP')
				return 'Applied';
			if(status === 'AC'){
				color='blue';
				return 'Accepted';}
			if(status === 'RE'){
				color='red';
				return 'Rejected';}
			if(status === 'CO'){
				color='green';
				return  'Completed';}
		}
		return (
			<tr>
				<td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_profile.student_id}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.student_details_general.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>
          {capitalizeFirstLetter(lorItem.student_details_general.first_name +' '+ lorItem.student_details_general.last_name)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{lorItem.faculty_details.email}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>
          {capitalizeFirstLetter(lorItem.faculty_details.first_name +' '+ lorItem.faculty_details.last_name)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{lorItem.lor_details.purpose}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(lorItem.lor_details.created_at)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{getLocalDate(lorItem.lor_details.deadline)}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px', color:color}}>
					{convertToFullText(lorItem.application_details.application_status)}</span></td>
			</tr>

		)
	}
}

ViewAllRequestsItem.propTypes = {
	lorItem: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(ViewAllRequestsItem);