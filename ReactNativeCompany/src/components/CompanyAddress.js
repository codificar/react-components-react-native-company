"use strict";

import React, { Component } from "react";
import {  Text, View, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";

// Utils
import * as parse from "../Utils";
//Translate file
import setLang from "../Utils/translate.js";
// Styles
import styles from "./styles.js";
let t = require("tcomb-form-native-codificar");
let Form = t.form.Form;

// Axios
import Api from "../Utils/axios";

class CompanyAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translate: setLang(this.props.locale),
			buttonText: this.props.buttonText,
			buttonColor: this.props.buttonColor,
			company: this.props.company,
			has_company: this.props.has_company,
			invalidCep: false,
			value: {
				provider_id: "",
				ibgeCode: !this.props.has_company ? t.enums({}) : '',
				neighborhood: "",
				zipcode: "",
				city: "",
				complement: "",
				place: "",
				number: "",
				estate: !this.props.has_company ? t.enums({}) : ''				
			},
			ibgeStates: t.enums({}),
			ibgeCitys: t.enums({}),			

			isLoggingIn: false,		
			showNextButton: false,		
		};		
		this.api = new Api(this.props.baseUrl);
		console.log("this.props.locale", this.props.locale);
	}

	componentDidMount() {
		this.getIbgeData()
		if(this.state.has_company) this.setState({value: this.state.company.address})
	}

	/**
	 * Turn visible the next button when all fields are complete
	 * @param {any} prevProps 
	 * @param {any} prevState 
	 */
	componentDidUpdate(prevProps, prevState) {
		//OnSelect UF
		if (prevState.value.estate !== this.state.value.estate) {
			this.getIbgeCitys()
		}	
		
		if (prevState.value.ibgeCode !== this.state.value.ibgeCode ||
			prevState.value.neighborhood !== this.state.value.neighborhood ||
			prevState.value.zipcode !== this.state.value.zipcode ||
			prevState.value.city !== this.state.value.city ||
			prevState.value.complement !== this.state.value.complement ||
			prevState.value.place !== this.state.value.place ||
			prevState.value.number !== this.state.value.number ||
			prevState.value.estate !== this.state.value.estate ) {
			if (this.state.value.ibgeCode && this.state.value.neighborhood && this.state.value.zipcode &&
				this.state.value.city && this.state.value.place && this.state.value.estate && this.state.value.number) {
				this.setState({ showNextButton: true })
			} else {
				this.setState({ showNextButton: false })
			}
		}
	}

	//Struct Type for Form
	getForm() {
		if (!this.state.has_company) {
			return t.struct({		
				estate: this.state.ibgeStates,
				ibgeCode: this.state.ibgeCitys,
				zipcode: t.String,		
				neighborhood: t.String,
				place: t.String,	
				number: t.Number,
				complement: t.String,					
			});
		} else {
			return t.struct({		
				estate: t.String,
				ibgeCode: t.String,
				zipcode: t.String,		
				neighborhood: t.String,
				place: t.String,	
				number: t.Number,
				complement: t.String,					
			});
		}
		
	}

	/**
	   * Focus to next input on press next button at keyboard
	   * @param {String} input 
	   * @param {Boolean} hasMask 
	   */
	focusToNext(input, hasMask = false) {
		if (hasMask)
			this._formRef.getComponent(input).refs.input._inputElement.focus()
		else
			this._formRef.getComponent(input).refs.input.focus()
	}

	//Options for Type
	getOptionsInput() {
		let optionsInput = {
			fields: {				
				estate: {			
					editable: !this.state.has_company,
					stylesheet: this.props.stylesheet,
					error: this.state.translate.empty_state,	
					label: this.state.translate.state				
				},
				ibgeCode: {
					editable: !this.state.has_company,
					stylesheet: this.props.stylesheet,
					error: this.state.translate.empty_city,
					label: this.state.translate.city			
				},				
				zipcode: {
					stylesheet: this.props.stylesheet,
					hasError: this.state.invalidCep,
					error: this.state.translate.insert_valid_zip_code,
					maxLength: 9,
					label: this.state.translate.zip_code,
					keyboardType: "numeric",
					mask:"99999-999",
					onSubmitEditing: () => this.focusToNext('neighborhood'),
					returnKeyType: "next"
				},	
				neighborhood: {
					stylesheet: this.props.stylesheet,
					error: this.state.translate.empty_neighborhood,
					label: this.state.translate.neighborhood,
					onSubmitEditing: () => this.focusToNext('place', false),
					returnKeyType: "next"
				},
				place: {
					stylesheet: this.props.stylesheet,
					error: this.state.translate.empty_address,
					label: this.state.translate.address,
					onSubmitEditing: () => this.focusToNext('number', false),
					returnKeyType: "next"
				},
				number: {
					stylesheet: this.props.stylesheet,
					error: this.state.translate.empty_number,
					label: this.state.translate.number,
					onSubmitEditing: () => this.focusToNext('complement', false),
					returnKeyType: "next"
				},
				complement: {
					stylesheet: this.props.stylesheet,
					label: this.state.translate.complement,					
				},
			}
		};

		return optionsInput;
	}

	onPress() {
		this.props.onSendForm(this.state.value)
	}
	
	/**
	 * Get IBGE States
	 */
	getIbgeData() {
		this.api.IbgeEstadoInfo()
			.then(response => {	
				if (response.status == 200) {
					const ibgeStatesList = parse.formatStatesList(response.data)	
					this.setState({ ibgeStates:  t.enums(ibgeStatesList)})
				}			
		})
			.catch(error => {
			console.log("getIbgeData error", error);
			this.setState({ isLoggingIn: false });
			parse.showToast(this.state.translate.try_again, Toast.durations.LONG);
		});	
	}

	/**
	 * Get IBGE Citys
	 */
	getIbgeCitys() {
		this.api.IbgeCidadeInfo(this.state.value.estate)
			.then(response => {				
				if (response.status == 200) {						
					const ibgeCitysList = parse.formatCitysList(response.data)						
					this.setState({ ibgeCitys:  t.enums(ibgeCitysList)})
				}			
		})
			.catch(error => {
			console.log("getIbgeCitys error", error);
			this.setState({ isLoggingIn: false });
			parse.showToast(this.state.translate.try_again, Toast.durations.LONG);
		});	
	}

	/**
	 * Get Cep Information.
	 */
	getCepInformation(value) {
		this.api
			.CepInformation(value.zipcode)
			.then(response => {				
				var responseJson = response.data;
				if (responseJson.success) {					
					value.city = responseJson.result.localidade;
					// value.state = responseJson.result.uf;
					value.neighborhood = responseJson.result.bairro;
					value.place = responseJson.result.logradouro;
					this.setState({
						value: value,
						invalidCep: false,					
					});
				} else {
					value.place = "";
					value.neighborhood = "";	
					parse.showToast(this.state.translate.insert_valid_zip_code, Toast.durations.LONG);
					this.setState({
						value: value,
						invalidCep: true,					
					});
				}
			})
			.catch(error => {
				console.log("error", error);
				this.setState({ isLoggingIn: false });
				parse.showToast(this.state.translate.try_again, Toast.durations.LONG);
			});
	}

	onChange(value) {		
		if (value.zipcode != undefined) value.zipcode = value.zipcode.replace(/(\d{5})(\d)/, "$1-$2");
		if (
			value.zipcode != undefined &&
			value.zipcode.length == 9 &&
			value.zipcode != this.state.value.zipcode
		) this.getCepInformation(value);

		this.setState({ value });
	}


	render() {
		return (
			<View style={styles.sectionInputs}>
					<Form
						ref={ref => (this._formRef = ref)}
						type={this.getForm()}
						options={this.getOptionsInput()}
						value={this.state.value}
						onChange={this.onChange.bind(this)}
					/>
					{this.state.showNextButton ? (
						<TouchableOpacity
						style={styles.buttonRegister(this.state.buttonColor)}
							onPress={() => this.onPress()}
						>
							<Text style={styles.txtButtonRegister}>
								{" "}
								{this.state.buttonText}
							</Text>
						</TouchableOpacity>
					) : <View
						style={styles.NoButtonRegister}>
						<Text style={styles.NoTxtButtonRegister}>
								{" "}
								{this.state.buttonText}
							</Text>
						</View>
					}
			</View>
		);
	}

}

export default CompanyAddress
