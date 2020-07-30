import ptBR from "../Locales/pt-BR.json"
import en from "../Locales/en.json"
import es from "../Locales/es.json"

function setLang(lang) {
    if (lang == "en-US") {
        return en
    } else if(lang === "es"){
        return es
    } else {
        return ptBR
    }
}

export default setLang