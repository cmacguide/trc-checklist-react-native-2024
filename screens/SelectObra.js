import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, Select } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";

import {
	SubmitHandler,
	useForm,
	Controller,
	useFieldArray,
} from "react-hook-form";
import { WizardStore } from "../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
const mock = {
	data: {
		codigo_usuario_portal: "156",
		nome_obra: "Corporativa",
		cod_obra: "1",
		obras: [
			{
				id: "1",
				nome_obra: "Corporativa",
			},
			{
				id: "29",
				nome_obra: "Morumbi SP - Escritório",
			},
			{
				id: "92",
				nome_obra: "Demonstracao SP",
			},
			{
				id: "110",
				nome_obra: "Portal do Morumbi",
			},
		],
	},
};

const mockObras = {
	data: {
		grupo_checklist: [
			[
				{
					grupo_nome: "Condições do Alojamento",
					grupo_id: "1",
					itens_id: "13",
					itens_nome:
						"A parte elétrica está protegia com quadro de distribuição de disjuntores ?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Condições do Alojamento",
					grupo_id: "1",
					itens_id: "15",
					itens_nome:
						"Alojamento com mais de 50 colaboradores os alojados possui treinamento de uso de extintor e extintor está em local sinalizado?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Condições do Alojamento",
					grupo_id: "1",
					itens_id: "11",
					itens_nome:
						"Alojamento tem todos os ambientes descrito na NR 24 (Dormitório, Área de Vivência, Refeitório, Instalações Sanitárias, área de lavagem e secagem de roupas)?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Condições do Alojamento",
					grupo_id: "1",
					itens_id: "14",
					itens_nome:
						"Existem os documentos: Código de conduta, regras de convívio com canais confidenciais para consulta e planilha de limpeza para marcações diárias conforme IT 76?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Condições do Alojamento",
					grupo_id: "1",
					itens_id: "10",
					itens_nome:
						"Foto da fachada, frente da casa, inserir endereço e quantidade de funcionários alojados no campo observações.",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Condições do Alojamento",
					grupo_id: "1",
					itens_id: "12",
					itens_nome:
						"Proibido dormitórios adaptados em porões, garagens, cozinha e similares?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
			[
				{
					grupo_nome: "Instalações  Sanitárias",
					grupo_id: "2",
					itens_id: "21",
					itens_nome:
						"Área livre de pelo menos 60 cm entre a borda frontal da bacia sanitária e a porta fechada?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Instalações  Sanitárias",
					grupo_id: "2",
					itens_id: "17",
					itens_nome:
						"Piso e parede revestidos por material impermeável e lavável?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Instalações  Sanitárias",
					grupo_id: "2",
					itens_id: "20",
					itens_nome:
						"Possui Porta, com fechadura e trinco para impedir o devassamento?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Instalações  Sanitárias",
					grupo_id: "2",
					itens_id: "16",
					itens_nome:
						"Possui vasos sanitários com assento, tampo, para cada grupo de 20 (vinte) trabalhadores ou fração, separadas por sexo e descarga funcionando?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Instalações  Sanitárias",
					grupo_id: "2",
					itens_id: "19",
					itens_nome:
						"Suporte para toalha, suporte para papel higienico e Lixeira com Tampa?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Instalações  Sanitárias",
					grupo_id: "2",
					itens_id: "18",
					itens_nome:
						"Ventilação para o exterior ou com sistema de exaustão forçada?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
			[
				{
					grupo_nome: "Lavatórios",
					grupo_id: "3",
					itens_id: "22",
					itens_nome: "Possui lavatório, com sabonete ou sabão e papel Toalha?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
			[
				{
					grupo_nome: "Chuveiros",
					grupo_id: "4",
					itens_id: "23",
					itens_nome:
						"É garantido 1 (um) chuveiro para cada grupo de 10 trabalhadores, com de água quente/fria e Aterramento?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
			[
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "27",
					itens_nome:
						"Água para beber filtrada e Filtro trocado a cada 6 meses e fresca ou mineral, sendo proibido o uso de copos coletivos?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "25",
					itens_nome:
						"Assentos e mesas, balcões ou similares suficientes para todos, de acordo com o turno?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "29",
					itens_nome:
						"É garantido transporte dos trabalhadores para realização de refeições do alojamento ?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "24",
					itens_nome:
						"Fornecida alimentação através de restaurante externo ou profissional capacitado (a) para preparo das refeições na cozinha?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "26",
					itens_nome:
						"Local e material para lavagem de utensílios usados na refeição?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "30",
					itens_nome: "Possui lixeiras com tampa?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Locais para Refeições",
					grupo_id: "5",
					itens_id: "28",
					itens_nome:
						"Quando possui fogão para preparo de café ou refeições além das fornecidas pela empresa está com botijão na área externa?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
			[
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "34",
					itens_nome:
						"Água para beber filtrada e Filtro trocado a cada 6 meses e fresca ou mineral, sendo proibido o uso de copos coletivos?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "38",
					itens_nome:
						"Área de no mínimo, 3,00 m² X cama ou 4,50 m² por beliche esta sendo respeitada?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "37",
					itens_nome:
						"Armários com dispositivo de trancamento e dimensões compatíveis para roupas, pertences pessoais e enxoval de cama?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "39",
					itens_nome:
						"Camas superiores dos beliches com proteção lateral, escada fixas à estrutura?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "33",
					itens_nome:
						"Fornecido lençóis, fronhas, cobertores e travesseiros limpos e higienizados?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "32",
					itens_nome:
						"O alojamento com cama simples possui pé direito de no mínimo de 2,5m? E dormitórios com beliches 3 mt ?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "31",
					itens_nome:
						"Possui colchões correspondentes ao número de trabalhadores alojados e o colchão possui Certificação Inmetro e densidade mínima de 28 ?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "35",
					itens_nome: "Possui ventilação natural sem obstrução (janelas)?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "40",
					itens_nome:
						"Régua, benjamin ou extensões, fiações aparente/ exposta?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Dormitórios",
					grupo_id: "6",
					itens_id: "36",
					itens_nome: "Ventiladores e/ou Ar condicionado, quando exigido?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
			[
				{
					grupo_nome: "Area externa",
					grupo_id: "7",
					itens_id: "42",
					itens_nome:
						"Existe tanques (manual ou elétrico) para lavagem de roupas em local coberto?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Area externa",
					grupo_id: "7",
					itens_id: "41",
					itens_nome:
						"Infraestrutura (agua, local coberto e varal) para lavagem e secagem de roupas pessoais/serviço?66",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "5.80",
				},
			],
			[
				{
					grupo_nome: "Limpeza e organizacao",
					grupo_id: "8",
					itens_id: "43",
					itens_nome:
						"Existe local externo para acondicionamento do lixo diário Lixeira externa?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Limpeza e organizacao",
					grupo_id: "8",
					itens_id: "46",
					itens_nome:
						"Na comprovação de infestação de insetos ou animais peçonhentos houve o controle de pragas do alojamento contemplando todas as áreas?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Limpeza e organizacao",
					grupo_id: "8",
					itens_id: "47",
					itens_nome:
						"Não foi evidenciado nas dependências do alojamento: fumo, bebidas alcóolicas ou qualquer droga ilícita?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Limpeza e organizacao",
					grupo_id: "8",
					itens_id: "45",
					itens_nome:
						"Os ambientes dormitórios, refeitórios e banheiros encontra-se limpos e organizados ?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
				{
					grupo_nome: "Limpeza e organizacao",
					grupo_id: "8",
					itens_id: "44",
					itens_nome:
						"Possui Produtos de limpeza e higienização para os ambientes?",
					codigo_checklist: null,
					id_alojamento: null,
					id_empreiteira: null,
					interno_externo: "",
					criticidade: "",
					conformidade: "",
					comentario: "",
					peso: "3.80",
				},
			],
		],
	},
};
dataMock = mock.data.obras.map((i) => {
	return i.nome_obra;
});
let obraSelecionada;
let selectedUso;
export default function SelectScreen({ navigation }) {
	const storeState = WizardStore.useState((s) => s);
	// keep back arrow from showing
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => null,
		});
	}, [navigation]);
	const [grupoTitulo, setGrupoTitulo] = React.useState();
	const [alternativasObras, setAlternativasObras] = React.useState();
	const [alternativasEmpreeteiras, setAlternativasEmpreeteiras] =
		React.useState();
	//const checklistApiRetorno = require("../assets/checklistApiRetorno.json");
	//console.log("checklistApiRetorno", checklistApiRetorno);
	//const tela0 = checklistApiRetorno.data.data.grupo_checklist[0];
	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: WizardStore.useState((s) => s) });

	const { fields, append, prepend, remove, swap, move, insert, replace } =
		useFieldArray({
			control,
			name: "test",
			// rules: {
			//   minLength: 4,
			// },
		});

	console.log("errors", errors);
	useEffect(() => {
		isFocused &&
			WizardStore.update((s) => {
				setGrupoTitulo("Escolha do Alojamento");
				let ArN = [];
				// s.fieldsAlojas.map((item) => {
				//   ArN.push(item.nome_endereco)
				// })
				s.obras.map((item) => {
					ArN.push(item.nome_obra);
				});
				setAlternativasObras(ArN);
				s.progress = 10;
			});
	}, [isFocused, replace]);

	const onSubmit = (data) => {
		//axios.get("http://app.trcmobile.com.br/ws/checklist/new_checklist.php")
		//.then((r)=> {
		//console.log("r.data.data.grupo_checklist", r.data.data.grupo_checklist)

		WizardStore.update((s) => {
			s.progress = 20;
			//if(!r.data)
			s.grupo_checklist = mockObras.data.grupo_checklist;
			//else
			//  s.grupo_checklist = r.data.data.grupo_checklist;
			console.log("s.grupo_checklist.length", s.grupo_checklist.length);
			s.step = {
				["notas_calculadas"]: [],
			};
			for (let i = 0; i < s.grupo_checklist.length; i++) {
				s.step[i] = [[], [], []];
				s.step[i]["criticidade"] = [[]];
				//s.step[i]["criticidade"][0, 0]=[]
				s.step[i]["conformidade"] = [[]];
				///s.step[i]["conformidade"][0, 0]=[]

				// s.step[i]==undefined ? s.step[i]=[["A", "DAS"],["A", "DAS"],[]] : "";

				// s.step[i]["conformidade"]=["A", "DAS"]
				// s.step[i]["criticidade"]=["MNC", "KJD"]
				// //
				s.step["step_" + i + "_conformidade"] = [];
				s.step["step_" + i + "_criticidade"] = []; //TODO: fazer carregar
				s.step["step_" + i + "_notas"] = [];
			}
		});
		navigation.navigate("ChecklistGroup");
		//})
	};
	const isFocused = useIsFocused();

	return (
		<View style={styles.container}>
			<ProgressBar
				style={styles.progressBar}
				progress={WizardStore.getRawState().progress}
				color={MD3Colors.primary60}
			/>
			<Text style={{ fontSize: 18, fontWeight: "bold" }}>
				Grupo: {grupoTitulo}
			</Text>
			<View style={{ paddingHorizontal: 16 }}></View>
			<Text>{WizardStore.getRawState().s}</Text>
			<View style={{ paddingHorizontal: 16, width: "100%" }}>
				<SelectDropdown
					style={{ innerWidth: "100%" }}
					//name={index}
					data={alternativasObras}
					defaultButtonText="Selecione Obra"
					onSelect={(selectedItem) => {
						WizardStore.update((s) => {
							s.obra = selectedItem;
						});
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						return item;
					}}
				/>

				<SelectDropdown
					style={{ innerWidth: "100%" }}
					//name={index}
					data={["interno", "externo"]}
					defaultButtonText="Ambiente"
					onSelect={(selectedItem) => {
						WizardStore.update((s) => {
							s.uso = selectedItem;
						});
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						return item;
					}}
				/>

				<SelectDropdown
					style={{ innerWidth: "100%" }}
					//name={index}
					data={alternativasObras}
					defaultButtonText="Responder"
					onSelect={(selectedItem) => {
						WizardStore.update((s) => {
							let index = global.rObras.indexOf(s.obra);
							console.log("index", index);
							index = 1;
							obraSelecionada = global.rObras[index].id;
							//
							s.uso == "interno" ? (selectedUso = 1) : (selectedUso = 0);
							let data = {
								headers: {
									"x-api-token": global.token,
								},
							};
							let url =
								"http://app.trcmobile.com.br/ws/checklist/empreiteiras.php?obra=" +
								obraSelecionada +
								"&uso=" +
								selectedUso;
							console.log(url);
							axios.get(url, data).then((r) => {
								console.log("r", r.data.data);
								let ArN = [];
								r.data.data.map((item) => {
									console.log("item", item);
									ArN.push(item.nome_empreiteira);
								});
								setAlternativasEmpreeteiras(ArN);
							});
						});
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						return item;
					}}
				/>

				{/* <Text>Selecione o alojamento: </Text> */}
				<SelectDropdown
					style={{ innerWidth: "100%" }}
					//name={index}
					data={alternativasEmpreeteiras}
					defaultButtonText="Responder"
					onSelect={(selectedItem) => {
						axios
							.get("http://app.trcmobile.com.br/ws/checklist/new_checklist.php")
							.then((r) => {
								console.log(
									"r.data.data.grupo_checklist",
									r.data.data.grupo_checklist
								);
								WizardStore.update((s) => {
									//s.alojamento = selectedItem.
									if (global.grupo_checklist) {
										WizardStore.update((s) => {
											s.progress = 10;
											s.grupo_checklist = r.data.data.grupo_checklist;
											s.fieldsAlojas = r.data.data.alojamentos;
											//console.log("fieldsAlojas", r.data.data.alojamentos);
										});
									}
								});
							});
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem;
					}}
					rowTextForSelection={(item, index) => {
						return item;
					}}
				/>
			</View>

			<Button
				mode="outlined"
				style={[styles.button, { marginTop: 40 }]}
				onPress={() => navigation.goBack()}
			>
				VOLTAR
			</Button>
			<Button
				title="Submit"
				mode="outlined"
				style={styles.button}
				onPress={handleSubmit(onSubmit)}
			>
				PRÓXIMO PASSO
			</Button>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		margin: 8,
	},
	formEntry: {
		margin: 8,
	},
	container: {
		flex: 1,
	},
	progressBar: {
		marginBottom: 16,
		paddingHorizontal: 0,
	},
});
