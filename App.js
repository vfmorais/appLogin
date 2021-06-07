import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//IMPORT DA TELA DE LOGIN:
import LoginScreen from './src/pages/LoginScreen';

//IMPORT DA TELA DE HOME:
import TelaHomeApp from './src/pages/TelaHomeApp';

//PRIMEIRO ELEMENTO DA PILHA DE NAVEGAÇÃO:
const AppNavigator = createStackNavigator({

  'Login':{

      screen: LoginScreen,
      navigationOptions:{
        title: 'TELA DE LOGIN'
      }

  },

  //SEGUNDO ELEMENTO DA PILHA DE NAVEGAÇÃO (HOME)
 'Home':{
  screen: TelaHomeApp,
  navigationOptions:{
  title: 'TELA INICIAL - USUÁRIO LOGADO'
  }
  }

},{
  //ESTILIZAÇÃO GLOBAL DOS CABEÇALHOS DE NAVEGAÇÃO:
  headerStyle:{
    backgroundColor: '#6ca2f7',
    borderBottomWith:10,
    borderBottomColor:'#c5c5c5'
  },
  headerTitleStyle:{
    color: '#fff',
    fontSize: 30
  }
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;