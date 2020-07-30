import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Styles
import styles from "./styles.js"

//icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class CompanyTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            primaryColor: this.props.primaryColor
        };
    }

    render() {
        const { selectedOption, activeTab, title } = this.props
     
        return (
            <View style={styles.container}>
                <View style={styles.contSec} >
                    <View style={styles.tabTitle}>
                        <TouchableOpacity
                            disabled={selectedOption[0]}
                            color="transparent"
                            onPress={this.props.onNavigateTab1}
                        >
                            <Icon name="account-edit" size={28} color={this.state.primaryColor} />
                            {activeTab == 1 ? (
                                <Text style={styles.textTab1(this.state.primaryColor)} />
                            ) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabTitle}>
                        <TouchableOpacity
                            disabled={selectedOption[1]}
                            color="transparent"
                            onPress={this.props.onNavigateTab2}
                        >
                           <Icon name="content-paste" size={28} color={this.state.primaryColor} />
                            {activeTab == 2 ? (
                                <Text style={styles.textTab1(this.state.primaryColor)} />
                            ) : null}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabTitle}>
                        <TouchableOpacity
                            disabled={selectedOption[2]}
                            color="transparent"
                            onPress={this.props.onNavigateTab3}
                        >
                           <Icon name="lock-outline" size={28} color={this.state.primaryColor} />
                            {activeTab == 3 ? (
                                <Text style={styles.textTab1(this.state.primaryColor)} />
                            ) : null}
                        </TouchableOpacity>
                    </View>                   
                </View>
                <View style={styles.contTitlePage}>
                    <Text style={styles.titlePage}>
                        {" "}
                        {title}:{" "}
                    </Text>
                </View>
            </View>
        )
    }
}

export default CompanyTabs 