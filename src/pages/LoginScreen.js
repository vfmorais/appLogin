import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

//IMPORT DO FIREBASE:
import firebase from 'firebase';

//CLASS COMPONENTE DA TELA DE LOGIN:
export default class LoginScreen extends React.Component{

/*RECEBER OS DADOS DIGITADOS DE EMAIL E SENHA
 
 1º CRIAR UMA STATE PARA GUARDAR OS DADOS DE EMAIL E SENHA
 2° CRIAR OS METODOS DE CAPTURA DE EMAIL E SENHA
 3° CHAMADA DOS METODOS DE CAPTURA DE EMAIL E SENHA NOS CAMPOS DE TEXTO
 4° ESTABELECER A CONEXÃO COM O FIREBASE
 5° PROGRAMAR METODO DE LOGIN
 6° CHAMADA DO METODO LOGIN NO BOTÃO
 7° IMPLEMENTANDO A PRIMEIRA VERSÃO DO METODO LOGIN
 8º IMPLEMENTANDO A CRIAÇÃO DE USUÁRIOS NÃO EXISTENTES
 9º NAVEGAR PARA A A TELA DE HOME DO APLICATIVO (USUÁRIO LOGADO)
 
 */
 
 //CONSTRUTOR DA CLASSE
 constructor(props){
 
    //PASSA A PROPS DE LOGINSCREEN PARA O CONSTRUTOR DE COMPONENT
    super(props);
    
    //CRIAÇÃO DA STATE QUE RECEBE OS DADOS DE EMAIL E SENHA
    this.state = {
    
    email: '',
    password: ''
    
    }
    
    }

    //MÉTODO DE CAPTURA DE E-MAIL:
    onChangeEmail(value){
 
    this.setState({
    
    email: value
    
    })
    
    }
    
    //MÉTODO DE CAPTURA DE SENHA:
    onChangePassword(value){
    
    this.setState({
    
    password: value
    
    })
    
    }


    //MÉTODO DE LOGIN NO FIREBASE (TESTE DE STATE)
 tryLogin(){
 
    console.log(this.state);
    
    //IMPLEMENTAÇÃO DO CÓDIGO DE TENTATIVA DE LOGIN
    
    //TENTA REALIZAR UMM LOGIN NO FIREBASE
    try{
    
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(response => {
    
    console.log('USUÁRIO AUTENTICADO -> ', response.user);
    //NAVEGAÇÃO PARA TELA DO USUÁRIO
    //this.props.navigation.navigate('Home');
    this.props.navigation.replace('Home');

    } ).catch(error => {
    console.log('ERRO DE AUTENTICAÇÃO', error)

    if(error.code === 'auth/user-not-found'){
 
        /*
        
        PARAMETROS DO MÉTODO alert DO COMPONENTE Alert
        
        1º PARAMETRO -> TITULO DA CAIXA DE ALERTA
        2º PARAMETRO -> MENSAGEM DA CAIXA DE ALERTA
        3º PARAMETRO -> ARRAY CONTENDO OS BOTÕES DE OPÇÃO
        OS BOTÕES DE OPÇÃO DA CAIXA DE ALERTA DEVEM SER REPRESENTADOS
        POR OBJETOS DE NOTAÇÃO JSON -> { atributo: valor }
        4º PARAMETRO ->
        
        */
        Alert.alert(
            'USUÁRIO NÃO ENCONTRADO', 
            'DESEJA CRIAR UM NOVO USUÁRIO COM OS DADOS INFORMADOS?',
            [
            //NÃO
            {
            text: 'NÃO',
            onPress: () => {console.log('CLICOU NO NÃO!')}
            },
            
            //SIM
            {//INICIO DO JSON DO BOTÃO SIM
                    text: 'SIM',
                    onPress: () => {//INICIO DA ARROW DE CRIAÇAO DO USUÁRIO
                    console.log('CLICOU NO SIM!');
                    firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then( user => {
                    
                    console.log('USUÁRIO CRIADO COM SUCESSO->', user)
                    
                    }).catch(error => {
                    
                    console.log('ERRO AO CRIAR USUÁRIO->', error)
                    
                    })
                    
                    
                    }//FIM DA ARROW DE CRIAÇAO DO USUÁRIO
                    
                    }//FIM DO JSON DO BOTÃO SIM
            ]
            
            );
        
        }

    })
    
    }
    
    //TRATA UM ERRO DE TENTATIVA DE LOGIN
    catch(error){
    
        console.log('ERRO NO TRY ->', error)
           Alert.alert( 
               
               'ALERTA',
               'ERRO NO SERVIDOR DE LOGIN',
                [
                    {
                        text:'OK',
                        onPress:()=> {
                            console.log('CLICOU EM OK')
                         
                        }
                    }
                ]    
           )
            
        }
    }
    
    

    componentDidMount(){
        const firebaseConfig ={
            apiKey: "AIzaSyCwJ3oMybjvauSDEGg9-29NmhM1F8SahRA",
            authDomain: "ds-pam1-vinicius.firebaseapp.com",
            projectId: "ds-pam1-vinicius",
            storageBucket: "ds-pam1-vinicius.appspot.com",
            messagingSenderId: "126298516807",
            appId: "1:126298516807:web:d5b3510f9a1e88ee5a3062",
            measurementId: "G-8TX4T6M6C0"
        };

        if(firebase.apps.length === 0){
 
            firebase.initializeApp(firebaseConfig);
            
            }
        
            //console.log(firebase);

        }

    render(){

        return(

            <View>

                {/* <Text>TESTE DE TELA DE LOGIN!!</Text> */}

                <TextInput 
                style={ styles.input } 
                placeholder="seuemail@gmail.com" 
                onChangeText={ value => {
                
                this.onChangeEmail(value);
                //console.log(value);
                
                } 
                }
                />
                
                <TextInput 
                style={ styles.input } 
                placeholder="******" 
                secureTextEntry 
                onChangeText={ value => {
                
                this.onChangePassword(value);
                //console.log(value);
                } 
                }
                />

            <Button title="ENTRAR" onPress={ () => { this.tryLogin() } } />


            </View>

        )

    }

}

const styles = StyleSheet.create({

    input:{
        padding: 20,
        borderBottomWidth:2,
        borderBottomColor: '#000'
        
    }

})