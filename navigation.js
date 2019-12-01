import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import ForgetPassword from './screens/ForgetPassword'
import Login from './screens/Login'
import LandingScreen from './screens/Landing'
import SignUp from './screens/SignupScreen'
import Profile from './screens/Profile'
import Feedback from './screens/Feedback'
import EmailAccount from './screens/CreateEmailAccount'
import SmsCode from './screens/SmsCode'
import CodeConfirmation from './screens/SmsConfirmation'
import EditProfile from './screens/EditProfile'
import Messages from './screens/Messages'
import Blog from './screens/Blog'
import MessageChat from './screens/MessageChat';
import PostBlog from './screens/PostBlog';
import BlogDetail from './screens/BlogDetail';
import Detail from './screens/Detail';

const AuthStack = createStackNavigator({
  Landing: {
    screen: LandingScreen,
    navigationOptions: {
      headerTitle: 'Landing'
    }
  },
  SignIn: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Sign In'
    }
  },
  CreateAccount: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: 'Create Account'
    }
  },
  SmsCode: {
    screen: SmsCode,
    navigationOptions: {
      headerTitle: 'Create Account'
    }
  },
  EmailAccount: {
    screen: EmailAccount,
    navigationOptions: {
      headerTitle: 'Create Account'
    }
  },
  CodeConfirmation: {
    screen: CodeConfirmation,
    navigationOptions: {
      headerTitle: 'Create Account'
    }
  },
  ForgotPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      headerTitle: 'Forgot Password'
    }
  }
})

const AppStack = createStackNavigator({
  
  Detail: {
    screen: Detail,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  BlogDetail: {
    screen: BlogDetail,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  PostBlog: {
    screen: PostBlog,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Blog: {
    screen: Blog,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  
  Chat: {
    screen: MessageChat,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  
  Feedback: {
    screen: Feedback,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  
})

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  App: {
    screen: AppStack
  }
})

const Routes = createAppContainer(App)

export default Routes
