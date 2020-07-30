"use strict";

import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

// Styles
import styles from "./styles.js";
//Translate file
import setLang from "../Utils/translate.js";

let t = require("tcomb-form-native-codificar");
let Form = t.form.Form;

class CompanyLoginAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: setLang(this.props.locale),
      buttonText: this.props.buttonText,
			buttonColor: this.props.buttonColor,
      stylesheet: this.props.stylesheet,
      company: {},
      has_company: true,
      value: {
        login: "",
        password: "",
      },
      showNextButton: false,
    };
  }

  componentDidMount() {}

  /**
   * Turn visible the next button when all fields are complete
   * @param {any} prevProps
   * @param {any} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value.login !== this.state.value.login ||
      prevState.value.password !== this.state.value.password
    ) {
      if (this.state.value.login && this.state.value.password) {
        this.setState({ showNextButton: true });
      } else {
        this.setState({ showNextButton: false });
      }
    }
  }

  componentWillUnmount() {}

  getForm() {
    return t.struct({
      login: t.String,
      password: t.String,
    });
  }

  /**
   * Focus to next input on press next button at keyboard
   * @param {String} input
   * @param {Boolean} hasMask
   */
  focusToNext(input, hasMask = false) {
    if (hasMask)
      this._formRef.getComponent(input).refs.input._inputElement.focus();
    else this._formRef.getComponent(input).refs.input.focus();
  }

  //Options for Type
  getOptionsInput() {
    let optionsInput = {
      fields: {
        login: {
          stylesheet: this.state.stylesheet,
          minLength: 3,
          maxLength: 50,
          keyboardType: "numeric",
          error: this.state.translate.insert_login,
          label: "Login(CNPJ sem pontuação)",
          onSubmitEditing: () => this.focusToNext("password", false),
          returnKeyType: "next",
        },
        password: {
          password: true,
          secureTextEntry: true,
          stylesheet: this.state.stylesheet,
          minLength: 3,
          maxLength: 255,
          error: this.state.translate.insert_password,
          label: this.state.translate.password,
        },
      },
    };

    return optionsInput;
  }

  onPress() {
    this.props.onSendForm(this.state.value);
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <View style={styles.authSectionInputs}>
        <Text style={styles.authTitle}>{this.state.translate.auth_login}</Text>
        <Form
          ref={(ref) => (this._formRef = ref)}
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
              {this.state.buttonText}{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.NoButtonRegister}>
            <Text style={styles.NoTxtButtonRegister}>
              {" "}
              {this.state.buttonText}{" "}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default CompanyLoginAuth;
