import { useNavigation } from "@react-navigation/native";

import { WizardStore } from "../store/store";

import { createContext, useEffect, useState } from "react";

import { api } from "../services/api";

//criando o contexto
export const AuthContext = createContext({});

//criando o Provider
export default function AuthProvider({ children }) {
	//ver se vai utilizar
	useEffect(() => {
		async function verifyUser() {
			setLoading(true);

			if (token !== "") {
				api.defaults.headers["x-api-token"] = token;
			}
			setLoading(false);
		}

		verifyUser();
	}, []);

	const navigation = useNavigation();

	const [user, setUser] = useState(null);
	const [loadingAuth, setLoadingAuth] = useState(false);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState("");

	async function signUp(email, password) {
		setLoadingAuth(true);

		try {
			const response = await api.post("/register.php", {
				name: name,
				email: email,
				password: password,
			});

			if (response.data) {
				console.log("Retorno");
				console.log(response.data.codigo_usuario_portal);
				setTimeout(() => {
					setLoadingAuth(false);
					navigation.goBack();
				}, 1500);
			}
		} catch (error) {
			console.log(error);
			setLoadingAuth(false);
		}
	}

	const storeToken = WizardStore.useState((s) => s.token);

	async function signIn(email, password) {
		try {
			setLoadingAuth(true);
			const response = await api.postForm("login.php", {
				login_usuario_portal: email,
				senha_usuario_portal: password,
			});
			console.log(
				"response ",
				response.data.data.cod_usuario_portal,
				response.data.data.token
			);
			if (response.data.data.cod_usuario_portal && response.data.data.token) {
				setLoadingAuth(false);
				await setToken(response.data.data.token);

				api.defaults.headers["x-api-token"] = token;

				//passado direto porq o token é uma string, senão precisaria converter para um JSON.stringify

				await WizardStore.update((s) => {
					s.token = token;
					s.cod_usuario_portal = response.data.data.cod_usuario_portal;
					s.nome_obra = response.data.data.nome_obra;
					s.cod_obra = response.data.cod_obra;
					s.obras = response.data.data.obras;
				});

				setUser({
					id: response.data.data.codigo_usuario_portal,
					token: response.data.data.token,
				});
			} else {
				setLoadingAuth(false);
				alert("Email ou Senha estão incorretossss!");
			}
		} catch (error) {
			console.log(error);
			setLoadingAuth(false);
			alert("Email ou Senha estão incorretooooos!");
		}
	}
	let storeState = WizardStore.useState((s) => s);
	console.log("storeState", storeState);
	async function logoff() {
		await WizardStore.update((s) => {
			s.token = "";
			navigation.navigate("login");
		}).then(() => {
			api.defaults.headers["x-api-token"] = "";
			setUser(null);
		});
	}

	//Dentro dele será passado os childrens / paginas|componentes da aplicação
	return (
		// {{ como um objeto, disponivel para as camadas q compartilharem acesso a esse provider }}
		/* signed: !!user  - pega e verifica se tem o valor dentro do objeto se tiver é VERDADEIRO | TRUE, se não tiver é FALSO | FALSE*/
		<AuthContext.Provider
			value={{
				signed: !!user,
				user,
				signUp,
				signIn,
				logoff,
				loadingAuth,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
