import axios from "axios";

export const api = axios.create({
	//baseURL: 'http://localhost:3333' precisa da rota
	//prompt ipconfig IPV4 disponivel
	baseURL: "http://app.trcmobile.com.br/ws/checklist/",
});
