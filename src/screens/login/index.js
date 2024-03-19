import { useNavigation } from "@react-navigation/native";

import React, { useContext, useState, useEffect } from "react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../store/store";

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import { Platform } from "react-native";

import { AuthContext } from "../../contexts/auth";

import {
	BackgroundCustom,
	SignInButton,
	ContainerCustom,
	ContainerImage,
	LoginForm,
	LinkCustom,
	LinkText,
	LogoCustom,
	TitleCustom,
} from "./styled";

export default function Login(/* {navigation} */) {
	const { signIn, loadingAuth, user } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	const [description, setDescription] = useState("");

	async function toEnter() {
		if (email != "" && password != "") {
			signIn(email, password);
		} else {
			alert("Informe os dados para logar!");
		}
	}

	const {
		handleSubmit,
		control,
		register,

		formState: { errors },
	} = useForm({ defaultValues: WizardStore.useState((s) => s) });

	// const isFocused = useIsFocused();
	// useEffect(() => {
	// 	isFocused &&
	// 		WizardStore.update((s) => {
	// 			console.log("s", s.grupo_checklist[0][0].grupo_nome);
	// 			//s.progress = 0;
	// 		});
	// }, [isFocused]);

	const onSubmit = (data) => {
		global.grupo_checklist;
		// global.rObras;
		toEnter();

		// let datasend_login = {
		// 	login_usuario_portal: "trc.suporte@trcmobile.com.br",
		// 	senha_usuario_portal: "9b773801ec4b00f8651bc1a591aa2335",
		// };
	};

	function newAccount() {
		navigation.navigate("Nova Conta");
	}

	return (
		<BackgroundCustom>
			<ContainerCustom
				behavior={Platform.OS === "ios" ? "padding" : ""}
				enabled
			>
				<ContainerImage>
					<LogoCustom source={require("../../assets/Logo.png")} />
					{/* <TitleCustom>Acessar Sistema</TitleCustom>    */}
				</ContainerImage>
				<LoginForm>
					<Controller
						control={control}
						rules={
							{
								//required: true,
							}
						}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textForm}
								mode="outlined"
								label="Usuário"
								placeholder="Digite seu nome de usuário"
								onBlur={onBlur}
								onChangeText={(value) => setEmail(value)}
								value={email}
							/>
						)}
						name="username"
					/>
					{errors.username && (
						<Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
							Campo obrigatório.
						</Text>
					)}
					<Controller
						control={control}
						rules={
							{
								//required: true,
							}
						}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textForm}
								mode="outlined"
								label="Senha"
								placeholder="Digite sua senha"
								onBlur={onBlur}
								onChangeText={(value) => setPassword(value)}
								value={password}
								//keyboardType="numeric"
							/>
						)}
						name="password"
					/>
					{errors.password && (
						<Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
							Campo obrigatório.
						</Text>
					)}
				</LoginForm>

				{loadingAuth == false ? (
					<SignInButton
						style={{ opacity: 0.8 }}
						onPress={handleSubmit(onSubmit)}
					>
						{/* passar textButton para styled */}
						<Text style={styles.textButton}>ENTRAR</Text>
					</SignInButton>
				) : (
					<ActivityIndicator
						size={36}
						color="#4169E1"
					/>
				)}

				{/* <LinkCustom
					onPress={() => {
						newAccount();
					}}
				>
					<LinkText>Criar uma Conta!</LinkText>
				</LinkCustom> */}
			</ContainerCustom>
		</BackgroundCustom>
	);
}

const styles = StyleSheet.create({
	textButton: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
		paddingLeft: 8,
	},

	textForm: {
		color: "black",
		fontSize: 18,
		fontWeight: "700",
		//paddingLeft: 8,
		//paddingRight: 8,
		borderColor: "#1E90FF",
		borderWidth: 2,
		marginLeft: 20,
		marginRight: 18,
		width: "90%",
		height: 50,
		alignSelf: "stretch",
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 26,
		backgroundColor: "white",
	},
});
