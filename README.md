# react-native-company
A Component to register and edit company

## Install
add in package.json:
```bash
"react-native-company": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/react-native-company.git",
```
# react-native-company
This package contains 5 components that work individually
- CompanyTabs
- CompanyAddress
- CompanyInfo
- CompanyLoginAuth
- CompanyCertifiedAuth

# CompanyTabs
## Example

![Print de um exemplo](./images/tabs.png "Exemplo")

## Usage

```javascript

import { CompanyTabs } from "react-native-company";

<CompanyTabs
    primaryColor="#2196f3"
    selectedOption={selectedOption}
    activeTab={1}
    onNavigateTab2={this.onNavigateTab2.bind(this)}
    onNavigateTab3={this.onNavigateTab3.bind(this)}
    title="Endereço da sua empresa"
/>
onNavigateTab2 = () => {
    this.props.navigation.navigate("CompanyStep2Screen");
};

  onNavigateTab3 = () => {
    this.props.navigation.navigate("CompanyStep3Screen");
};
```

## Properties

| Prop           | Default  | Type          | Description |
| :------------  |:---------------:         | :---------------:| :-----             |
| primaryColor   | -  | `string`      | Tabs colors          |
| selectedOption | -| `array` |  Array wit active screen true in activeTab position |
| activeTab      | -        | `number`      | Active tab number   |
| onNavigateTab1 | -        | `function`    | Event with click in tab 1               |
| onNavigateTab2 | -    | `function or portrait` | Event with click in tab 2           |
| onNavigateTab3 | -        | `function`    | Event with click in tab 2    |

# CompanyAddress
## Example

![Print de um exemplo](./images/addressComponent.png "Exemplo")

## Usage
```javascript

import { CompanyAddress } from "react-native-company";
import { formStructConfig } from "../Themes/WhiteLabelTheme/WhiteLabel";
let t = require("tcomb-form-native-codificar");
const stylesheet = formStructConfig(t.form.Form.stylesheet);

<CompanyAddress	
    locale="pt-BR"
    buttonText="Salvar"
    buttonColor="#2196f3"
    baseUrl={constants.BASE_URL}	
    stylesheet={stylesheet}
    company={null}
    has_company={false}
    onSendForm={data => this.onSendForm(data)}	    
/>
```
## onSendForm response format
```javascript
{
  "estate": "MG",
  "city": "Santa Luzia",
  "place": "Rua Alto do Tanque",
  "number": "32",
  "neighborhood": "Nossa Senhora das Graças",
  "zipcode": "33030-120",
  "complement": "32",
  "ibgeCode": "3106200"
}
```

## Properties

| Prop           | Default  | Type          | Description |
| :------------  |:---------------:         | :---------------:| :-----             |
| locale   | pt-BR  | `string`      | Component lang en-US, es or pt-BR       |
| buttonText | -| `string` |  Send Form Button Text |
| buttonColor      | -        | `string`      | Send Form Button color   |
| baseUrl | -        | `string`    | Base URL to get ZipCode Informations |         |
| baseUrl | -        | `string`    | Base URL to get ZipCode Informations |         |
| stylesheet | -    | `stylesheet` | Default form style          |
| has_company | false        | `bool`    | True with need edit company    |
| onSendForm | -        | `function`    | Event to get form data    |

# CompanyInfo
## Example

![Print de um exemplo](./images/infoComponent.png "Exemplo")

## Usage
```javascript

import { CompanyInfo } from "react-native-company";
import { formStructConfig } from "../Themes/WhiteLabelTheme/WhiteLabel";
let t = require("tcomb-form-native-codificar");
const stylesheet = formStructConfig(t.form.Form.stylesheet);

<CompanyInfo	
    locale="pt-BR"
    buttonText="Salvar"
    buttonColor="#2196f3"
    baseUrl={constants.BASE_URL}	
    stylesheet={stylesheet}
    company={null}
    has_company={false}
    onSendForm={data => this.onSendForm(data)}	    
/>
```
## onSendForm response format
```javascript
{
  "id": 9,
  "gateway_company_id": "ca0fb76f-fdc9-4b53-9120-5e3c80400600",
  "document": "29400991000181",
  "municipalRegistration": "312",
  "socialReason": "312",
  "fantasyName": "312",
  "address": {
    "estate": "MG",
    "city": "Santa Luzia",
    "place": "Rua Alto do Tanque",
    "number": "32",
    "neighborhood": "Nossa Senhora das Graças",
    "zipcode": "33030-120",
    "complement": "32",
    "ibgeCode": "3106200"
  },
  "nationalSimpleOptant": true,
  "culturalPromoter": false,
  "commercialEmail": "312",
  "commercialPhone": "(31) 2",
  "isDocAuth": 0,
  "isLoginAuth": 0,
  "digitalCertificateName": "0",
  "digitalExpirationDate": "0"
}
```

## Properties

| Prop           | Default  | Type          | Description |
| :------------  |:---------------:         | :---------------:| :-----             |
| locale   | pt-BR  | `string`      | Component lang en-US, es or pt-BR       |
| buttonText | -| `string` |  Send Form Button Text |
| buttonColor      | -        | `string`      | Send Form Button color   |
| baseUrl | -        | `string`    | Base URL to get ZipCode Informations |         |
| stylesheet | -    | `stylesheet` | Default form style          |
| company | -    | `object` | Company object to edit           |
| has_company | false        | `bool`    | True with need edit company    |
| onSendForm | -        | `function`    | Event to get form data    |

# CompanyInfo
## Example

![Print de um exemplo](./images/docAuth.png "Exemplo")

## Usage
```javascript

import { CompanyCertifiedAuth } from "react-native-company";

<CompanyCertifiedAuth	
    locale="pt-BR"
    buttonText="Salvar"
    buttonColor="#2196f3"
     onSendForm={(doc, pass) => this.authDoc(doc, pass)}
/>
```
## onSendForm response format
```javascript
pass = "3q2312"
doc = {
    uri: '31231231',
    path: '/teste/downloads',
    name: 'teste.pfx'
}
```

## Properties

| Prop           | Default  | Type          | Description |
| :------------  |:---------------:         | :---------------:| :-----             |
| locale   | pt-BR  | `string`      | Component lang en-US, es or pt-BR       |
| buttonText | -| `string` |  Send Form Button Text |
| buttonColor      | -        | `string`      | Send Form Button color   |
| onSendForm | -        | `function`    | Event to get form data    |