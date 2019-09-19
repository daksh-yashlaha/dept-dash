import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import convertToBackendFormat from '../../../utils/convertToBackendFormat'
import {Collapse} from "react-collapse";
import SearchBar from "../../dashboard/SearchBar";
import LorSelector from "./LorSelector";
import FacultySelector from "./FacultySelector";
import {getFacultyList, getSavedLor, submitLor} from "../../../actions/lorActions";


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '0',

		transform: 'translate(-50%, -50%)'
	}
};

class SubmitLor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lorId: null,
			isLorSelectorOpen: true,
			isFacultySelectorOpen: false,
			lorWarning:null,
			errors: {}
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleLorSelector = this.toggleLorSelector.bind(this);
		this.toggleFacultySelector = this.toggleFacultySelector.bind(this);
		this.onSelectLor = this.onSelectLor.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated && this.props.auth.user.role === 'student') {
			this.props.getSavedLor(this.props.match.params.id);
			this.props.getFacultyList(this.props.match.params.id);
		}
	}

	toggleLorSelector() {
		this.setState({isLorSelectorOpen: !this.state.isLorSelectorOpen})
	}
	toggleFacultySelector() {
				this.setState({isFacultySelectorOpen: !this.state.isFacultySelectorOpen})
	}
	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	onSelectLor(e) {
		this.setState({isLorSelectorOpen: false, lorId: this.props.lor.selectLor, lorWarning: null,
			isFacultySelectorOpen: true})
	}


	onSubmit(e) {
		this.setState({isFacultySelectorOpen: false})
		if(this.props.checkbox.selected.length===0) {
			this.setState({facultyWarning: 'Please select at least one faculty'})
		}
		if(this.state.lorId===null) {
						this.setState({lorWarning: 'Please an Lor'})
		}
		e.preventDefault();
		let dataArray=convertToBackendFormat(this.state.lorId, this.props.checkbox.selected);
		console.log({data:dataArray})
		this.props.submitLor(dataArray);
	}

	render() {
		const {errors} = this.state;
		if (this.props.auth.user.role !== 'student') {
			window.location.href = '/404';
		}
		return (
			<div className="display uploadForm">
				<div className='App-content row ' style={{minWidth:'100%'}}>
					<nav className='navbar navbar-expand-sm  col-md-12' style={{background: '#ffa726', width: '100%'}}>
						<SearchBar/>
					</nav>
					<div className='row d-flex justify-content-center'>
						<div className='row col-md-8 d-flex justify-content-center'>
						<button onClick={this.toggleLorSelector}
														className="rounded border
                                                d-flex justify-content-between align-items-center
                                                flex-grow-1 pl-1 w-100 my-3"
														style={{
															boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
																'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
															fontSize: '25px', background: '#000d69', color: 'white'
														}}>
											Step-1: Select the LOR You want to use<i className="fas fa-angle-down"/></button>
										<Collapse isOpened={this.state.isLorSelectorOpen} style={{listStyleType: 'none'}}>
											<div className='row'>
											<LorSelector/>
											</div>
											<div className='row d-flex justify-content-end' style={{margin:'5px'}}>
												<button onClick={this.onSelectLor} className='btn btn-primary d-flex justify-content-end'>Confirm Lor</button>
											</div>
										</Collapse>
					</div>
					<div className='row col-md-8 d-flex justify-content-center'>
						<button onClick={this.toggleFacultySelector}
														className="rounded border
                                                d-flex justify-content-between align-items-center
                                                flex-grow-1 pl-1 w-100 my-3"
														style={{
															boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), ' +
																'0 6px 20px 0 rgba(0, 0, 0, 0.19)',
															fontSize: '25px', background: '#000d69', color: 'white'
														}}>
											Step-2: Select the faculty(You can choose multiple)<i className="fas fa-angle-down"/></button>
										<Collapse isOpened={this.state.isFacultySelectorOpen} style={{listStyleType: 'none'}}>
											<FacultySelector/>
											<div className='row d-flex justify-content-end' style={{margin:'5px'}}>
												<button onClick={this.onSubmit} className='btn btn-primary d-flex justify-content-end'>Confirm Faculty</button>
											</div>
										</Collapse>
					</div>
					</div>

				</div>
			</div>
		)
	}
}

SubmitLor.propTypes = {
	auth: PropTypes.object.isRequired,
	lor: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	checkbox: PropTypes.object.isRequired,
	getSavedLor: PropTypes.func.isRequired,
	getFacultyList: PropTypes.func.isRequired,
	submitLor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox,
	lor: state.lor
});

export default connect(mapStateToProps,{getFacultyList, getSavedLor,submitLor})(SubmitLor)
