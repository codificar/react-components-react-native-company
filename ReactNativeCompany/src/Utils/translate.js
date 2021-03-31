import ptBR from "../Locales/pt-BR.json"
import en from "../Locales/en.json"
import es from "../Locales/es.json"

function setLang(lang) {
    if (lang.substring(0, 2) == "en") {
        return en
    } else if(lang.substring(0, 2) == "es"){
        return es
    } else {
        return ptBR
    }
}

export default setLang