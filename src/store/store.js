import { registerInDevtools, Store } from "pullstate";

let initialState = {
	token: "",
	cod_usuario_portal: "",
	nome_obra: "",
	cod_obra: "",
	obras: [],
	alojamentos: [],
	grupo_checklist: [],
	state: "",
	nota: null,
	status: true,
};
//let MockObjeto = JSON.parse(MockJSON)

export const WizardStore = new Store(initialState);

registerInDevtools({
	WizardStore,
});
