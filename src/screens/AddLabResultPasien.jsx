import React from 'react';
import { Loading } from '../components/Loading';
import { Appointment } from '../utils/Appointment.js';
import { FormAddLabResult } from '../containers/FormAddLabResult';

export class AddLabResultPasien extends React.Component {
	/** 
	 * TODO: Akses method getDetailPasien(idPasien) pada Appointment dan lakukan update state. 
	 * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
	 */

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			labResult:{
				pasien: {}
			},
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this)

		Appointment.getDetailPasien(this.props.match.params.id).then(response =>{
			if (response.status === 200) {
				this.setState({
					loading : false,
					labResult:{pasien : response.result}
				})
			} else {
				alert('Data tidak ditemukan')
				this.props.history.push('/all-pasien')
			}
			
		})
	}

	handleFormSubmit(e) {
		e.preventDefault()
		/** 
		 * TODO: Akses method updateStatusPasien(requestBody) pada Appointment dan lakukan update state. 
		 */
		this.setState({
			loading: true
		})

		const data = new FormData(e.target);
		const dataJson = {}

		data.forEach((val, key) => {
			if (val !== "") {
				let name = key.split('.');
				if (name.length > 1) {
					let last = name.pop()
					name.reduce((prev, next) => {
						return prev[next] = prev[next] || {};
					}, dataJson)[last] = val
				} else {
					dataJson[key] = val
				}
			}
			dataJson['pasien'] = this.state.labResult.pasien
		})

		Appointment.addLabResult(dataJson).then(response =>{
			if (response.status === 200) {
				this.setState({
					loading : false,
					labResult : response.result
				})
				alert(`Sukses update pasien ${this.state.labResult.pasien.nama}`)
			} else {
				this.setState({
					loading : false
				})
				alert(`Gagal update pasien ${this.state.labResult.pasien.nama}`)
			}
			
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<Loading msg="Fetching Data..." />
			)
		} else {
			return (
				<FormAddLabResult pasien={this.state.labResult.pasien} onSubmit={this.handleFormSubmit} />
			)
		}
	}
}