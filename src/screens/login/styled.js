import styled from "styled-components/native";

//install extensão vscode-styled-components

export const BackgroundCustom = styled.View`
	flex: 1;
	background-color: #dcdcdc;
	/* border-color: #1E90FF; para retornar a borda
 border-width: 3px; //medida da borada */
	/* justify-content: center;
 align-items: center; */
`;

//para uso no IOS para certas situações de quando abre o keyBoard para inserir informações em inputs
export const ContainerCustom = styled.KeyboardAvoidingView`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const ContainerImage = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 24px;
`;

export const LogoCustom = styled.Image``;

export const SignInButton = styled.TouchableOpacity`
	width: 90%;
	border-width: 3px;
	border-color: #1e90ff;
	padding: 8px 16px;
	border-radius: 12px;
	color: black;
	align-items: center;
	background-color: #4169e1;
	margin-top: 16px;
`;

export const TitleCustom = styled.TextInput`
	color: black;
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 16px;
	text-transform: uppercase;
`;

export const LoginForm = styled.View`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 16px;
	/* background-color: white; */
	justify-content: space-between;
	align-items: flex-start;
`;

export const LinkCustom = styled.TouchableOpacity`
	margin-top: 24px;
`;

export const LinkText = styled.Text`
	font-size: 18px;
	text-decoration: underline;
`;
