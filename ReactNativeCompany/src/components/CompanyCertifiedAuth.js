"use strict";

import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-root-toast";
//icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Utils
import * as parse from "../Utils";
import * as constants from "../Utils/constants.js";
//Translate file
import setLang from "../Utils/translate.js";

// Styles
import styles from "./styles.js";

class CompanyCertifiedAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: setLang(this.props.locale),
      buttonText: this.props.buttonText,
			buttonColor: this.props.buttonColor,
      company: {},
      has_company: true,
      document: {
        uri: "",
        type: "",
        name: "",
        has_doc: false,
      },
      password: "",
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
      prevState.document.has_doc !== this.state.document.has_doc ||
      prevState.password !== this.state.password
    ) {
      if (this.state.password && this.state.document.has_doc) {
        this.setState({ showNextButton: true });
      } else {
        this.setState({ showNextButton: false });
      }
    }
  }

  componentWillUnmount() {}

  takeDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let fileName = res.name;
      let last4Words = fileName.substring(fileName.length - 4, fileName.length);
      let document = {
        uri: "",
        type: "",
        name: "",
        has_doc: false,
      };
      if (last4Words == ".pfx") {
        if (res.size <= 20971520) {
          //Max size = 2097152 bytes = 20MB
          document = {
            uri: res.uri,
            type: res.type,
            name: res.name,
            has_doc: true,
          };
        } else {
          parse.showToast(
            "Tamanho de imagem não permitido",
            Toast.durations.SHORT
          );
        }
      } else {
        parse.showToast(
          "O arquivo deve ser um documento .pfx",
          Toast.durations.SHORT
        );
      }
      this.setState({ document });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  /**
   * Function to request permission for user to read
   * external storage and select a file (pdf, doc, docx, png, jpg)
   */
  launchStorage = () => {
    let permissionGranted = true;
    if (Platform.OS == constants.ANDROID) {
      parse.requestReadExternalStorage().then((response) => {
        permissionGranted = response;
        if (permissionGranted) {
          this.takeDocument();
        }
      });
    } else {
      this.takeDocument();
    }
  };

  render() {
    return (
      <View style={styles.authSectionInputs}>
        <Text style={styles.authTitle}>{this.state.translate.auth_doc}</Text>

        <View style={styles.docAuthContainer}>
          <Text style={styles.formLabel}>{this.state.translate.select_doc}</Text>

          <View style={styles.docAuthUploadArea}>
            <TouchableOpacity
              onPress={() => this.launchStorage()}
              style={styles.docAuthUploadButton}
            >
              <Icon name="upload" size={50} color="#F7F7F7" />
            </TouchableOpacity>
            <Text style={styles.docNameLabel}>{this.state.document.name}</Text>
          </View>
        </View>

        <View style={styles.docAuthContainer}>
          <Text style={styles.formLabel}>{this.state.translate.password}</Text>

          <View style={styles.docAuthUploadArea}>
            <TextInput
              style={styles.defaultInputStyle}
              placeholder={this.state.translate.password_placeholder}
              secureTextEntry={true}
              ref={(input) => (this.password = input)}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
        </View>
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
        ) : (
          <View style={styles.NoButtonRegister}>
            <Text style={styles.NoTxtButtonRegister}>
              {" "}
              {this.state.buttonText}
            </Text>
          </View>
        )}
      </View>
    );
  }

  onPress() {
    this.props.onSendForm(this.state.document, this.state.password);
  }
}

export default CompanyCertifiedAuth;
