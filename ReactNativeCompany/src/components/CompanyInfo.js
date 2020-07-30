"use strict";

import React, { Component } from "react";
import { CheckBox, Text, View, TouchableOpacity } from "react-native";

// Styles
import styles from "./styles.js";
//Translate file
import setLang from "../Utils/translate.js";

let t = require("tcomb-form-native-codificar");
let Form = t.form.Form;

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: setLang(this.props.locale),
      buttonText: this.props.buttonText,
			buttonColor: this.props.buttonColor,
      company: this.props.company,
      has_company: this.props.has_company,
      value: {
        document: "",
        fantasyName: "",
        socialReason: "",
        culturalPromoter: false,
        nationalSimpleOptant: true,
        municipalRegistration: "",
        commercialEmail: "",
        commercialPhone: "",
        estadualRegistration: "",
      },

      errorCnpj: false,
      error_msg_cnpj: "Insira seu CNPJ",

      isLoggingIn: false,
      showNextButton: false,
    };
  }

  componentDidMount() {
    if (this.state.has_company) {
      let companyData = this.state.company;
      companyData.culturalPromoter
        ? (companyData.culturalPromoter = true)
        : (companyData.culturalPromoter = false);
      companyData.nationalSimpleOptant
        ? (companyData.nationalSimpleOptant = true)
        : (companyData.nationalSimpleOptant = false);
      this.setState({ value: companyData });
    }
  }

  /**
   * Turn visible the next button when all fields are complete
   * @param {any} prevProps
   * @param {any} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value.document !== this.state.value.document ||
      prevState.value.fantasyName !== this.state.value.fantasyName ||
      prevState.value.socialReason !== this.state.value.socialReason ||
      prevState.value.culturalPromoter !== this.state.value.culturalPromoter ||
      prevState.value.nationalSimpleOptant !==
        this.state.value.nationalSimpleOptant ||
      prevState.value.municipalRegistration !==
        this.state.value.municipalRegistration
    ) {
      if (
        this.state.value.document &&
        this.state.value.fantasyName &&
        this.state.value.socialReason &&
        this.state.value.municipalRegistration
      ) {
        this.setState({ showNextButton: true });
      } else {
        this.setState({ showNextButton: false });
      }
    }
  }

  componentWillUnmount() {}

  getForm() {
    return t.struct({
      document: t.maybe(t.String),
      fantasyName: t.String,
      socialReason: t.String,
      municipalRegistration: t.String,
      commercialEmail: t.String,
      commercialPhone: t.String,
      estadualRegistration: t.String,
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
        document: {
          // editable: !this.state.has_company,
          stylesheet: this.props.stylesheet,
          label: "cnpj",
          keyboardType: "numeric",
          maxLength: 18,
          mask: "99.999.999/9999-99",
          onSubmitEditing: () => this.focusToNext("fantasyName", false),
          returnKeyType: "next",
          hasError: this.state.errorCnpj,
          error: this.state.error_msg_cnpj,
        },
        fantasyName: {
          stylesheet: this.props.stylesheet,
          minLength: 3,
          maxLength: 50,
          error: this.state.translate.insert_fantasy_name,
          label: this.state.translate.fantasy_name,
          onSubmitEditing: () => this.focusToNext("socialReason", false),
          returnKeyType: "next",
        },
        socialReason: {
          stylesheet: this.props.stylesheet,
          minLength: 3,
          maxLength: 50,
          error: this.state.translate.insert_social_reason,
          label: this.state.translate.social_reason,
          onSubmitEditing: () => this.focusToNext("lastName", false),
          returnKeyType: "next",
        },
        municipalRegistration: {
          stylesheet: this.props.stylesheet,
          label: this.state.translate.municipal_registration,
          keyboardType: "numeric",
          error: this.state.translate.insert_municipal_registration,
          onSubmitEditing: () => this.focusToNext("lastName", false),
          returnKeyType: "next",
        },
        commercialEmail: {
          stylesheet: this.props.stylesheet,
          autoCapitalize: "none",
          label: this.state.translate.optional_email,
          keyboardType: "email-address",
          onSubmitEditing: () => this.focusToNext("password", false),
          returnKeyType: "next",
        },
        commercialPhone: {
          stylesheet: this.props.stylesheet,
          label: this.state.translate.optional_phone,
          keyboardType: "numeric",
          mask: "(99) 99999-9999",
          returnKeyType: "next"
        },
        estadualRegistration: {
          stylesheet: this.props.stylesheet,
          label: "Inscricao Estadual(OPCIONAL)",
          keyboardType: "numeric",
        },
      },
    };

    return optionsInput;
  }

  onPress() {
    this.props.onSendForm(this.state.value);
  }

  /**
   * Cell Phone number validator. Function can be find in: https://pt.stackoverflow.com/questions/15120/como-validar-n%C3%BAmero-de-telefone-fixo-e-celular-jquery-validator
   */
  checkCellPhone(value) {
    if (this.props.tongue === "pt-br") {
      value = value.replace("(", "");
      value = value.replace(")", "");
      value = value.replace("-", "");
      value = value.replace(/ /g, "");
      // alert(value);
      if (value == "0000000000") {
        return false;
      } else if (value == "00000000000") {
        return false;
      }
      if (
        [
          "00",
          "01",
          "02",
          "03",
          ,
          "04",
          ,
          "05",
          ,
          "06",
          ,
          "07",
          ,
          "08",
          "09",
          "10",
        ].indexOf(value.substring(0, 2)) != -1
      ) {
        return false;
      }
      if (value.length < 10 || value.length > 11) {
        return false;
      }
      if (["6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  /**
   * Fix Phone number validator. Function can be find in: https://pt.stackoverflow.com/questions/15120/como-validar-n%C3%BAmero-de-telefone-fixo-e-celular-jquery-validator
   */
  checkFixPhone(value) {
    if (this.props.tongue === "pt-br") {
      value = value.replace("(", "");
      value = value.replace(")", "");
      value = value.replace("-", "");
      value = value.replace(/ /g, "");
      if (value == "0000000000") {
        return false;
      } else if (value == "00000000000") {
        return false;
      }
      if (
        [
          "00",
          "01",
          "02",
          "03",
          ,
          "04",
          ,
          "05",
          ,
          "06",
          ,
          "07",
          ,
          "08",
          "09",
          "10",
        ].indexOf(value.substring(0, 2)) != -1
      ) {
        return false;
      }
      if (value.length < 10 || value.length > 11) {
        return false;
      }
      if (["1", "2", "3", "4", "5"].indexOf(value.substring(2, 3)) == -1) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <View style={styles.sectionInputs}>
        <Form
          ref={(ref) => (this._formRef = ref)}
          type={this.getForm()}
          options={this.getOptionsInput()}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <View style={styles.checkBoxArea}>
          <CheckBox
            style={styles.checkbox}
            value={this.state.value.culturalPromoter}
            onValueChange={(value) => {
              this.setCulturalPromoter(value);
            }}
          />
          <Text style={styles.checkboxLabel}>{this.state.translate.cultural_promoter}</Text>
        </View>
        <View style={styles.checkBoxArea}>
          <CheckBox
            style={styles.checkbox}
            value={this.state.value.nationalSimpleOptant}
            onValueChange={(value) => {
              this.setNationalSimpleOptant(value);
            }}
          />
          <Text style={styles.checkboxLabel}>{this.state.translate.national_simple_optant}</Text>
        </View>
        {this.state.showNextButton ? (
          <TouchableOpacity
            style={styles.buttonRegister(this.state.buttonColor)}
            onPress={() => this.onPress()}
          >
            <Text style={styles.txtButtonRegister}>
              {" "}
              {this.state.buttonText}
              {" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.NoButtonRegister}>
            <Text style={styles.NoTxtButtonRegister}>
            {" "}
                {this.state.buttonText}
                {" "}
            </Text>
          </View>
        )}
      </View>
    );
  }
  setCulturalPromoter(value) {
    let stateValue = this.state.value;
    stateValue.culturalPromoter = value;
    this.setState({ value: stateValue });
  }
  setNationalSimpleOptant(value) {
    let stateValue = this.state.value;
    stateValue.nationalSimpleOptant = value;
    this.setState({ value: stateValue });
  }
}

export default CompanyInfo;
