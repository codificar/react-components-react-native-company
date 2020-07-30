import Toast from 'react-native-root-toast';
import { PermissionsAndroid } from "react-native";
/**
 * Show Toast to Android and iOS
 * @param {Toast Message} msg
 * @param {DURATION} duration
 */
export function showToast(msg, duration) {

    if (typeof (msg) !== 'string') {
        if (typeof (msg) === null)
            msg = '';
        else {
            msg = JSON.stringify(msg);
        }
    }

    if ((msg != 'Nenhum Prestador de Serviço encontrado') && msg != 'No Provider Available')
        Toast.show(msg, {
            duration: duration,
            position: Toast.positions.BOTTOM + 10,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
}

/**
  * Return JSON formate list to show in select
 * @param {*} json
 */
export function  formatStatesList(statesList) {
    var formatedList = ""
    for (let i = 0; i < statesList.length; i++) {
      let id = statesList[i].sigla
      let name = statesList[i].sigla+" - "+statesList[i].nome
      if (i == statesList.length - 1) {
        formatedList += '"' + id + '":"' + name + '"'
      } else {
        formatedList += '"' + id + '":"' + name + '",'
      }
    }
    formatedList = "{" + formatedList + "}"
    let result = JSON.parse(formatedList)  
    return result;
}

/**
 * Return JSON formate list to show in select
 * @param {*} json
 */
export function  formatCitysList(citysList) {
    var formatedList = ""
    for (let i = 0; i < citysList.length; i++) {
      let id = citysList[i].id
      let name = citysList[i].nome
      if (i == citysList.length - 1) {
        formatedList += '"' + id + '":"' + name + '"'
      } else {
        formatedList += '"' + id + '":"' + name + '",'
      }
    }
    formatedList = "{" + formatedList + "}"
    let result = JSON.parse(formatedList)  
    return result;
}

/**
 * Get permission to acess storage
*/
export async function requestReadExternalStorage() {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
		);
		if (
			granted === true ||
			granted === PermissionsAndroid.RESULTS.GRANTED ||
			Platform.OS !== 'android'
		) {
			try {
				const grantedCamera = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA
				);
				if (
					grantedCamera === true ||
					grantedCamera === PermissionsAndroid.RESULTS.GRANTED ||
					Platform.OS !== 'android'
				) {
					// in case of user agree to use
					return true;
				} else {
					return false;
				}
			} catch (err) {
				console.warn(err);
			}
		} else {
			// in case of user disagree
			return false;
		}
	} catch (err) {
		console.warn(err);
	}
}