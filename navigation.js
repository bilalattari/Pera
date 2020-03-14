/* eslint-disable */

import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
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
import Yourchart from './screens/Yourchart';
import Checkout from './screens/Checkout';
import MyOrders from './screens/MyOrders';
import AddPhoto from './screens/AddPhoto';
import MyAddress from './screens/MyAddress';
import Payment from './screens/Payment';
import SelectBlog from './screens/SelectBlog';
import BlogCategory from './screens/BlogCategory';
import Privacy from './screens/Privacy';
import Support from './screens/Support';
import Shop from './screens/Shop';
import AddProduct from './screens/AddProduct'
import ProductPay from './screens/ProductPay'
import SavedCards from './screens/SavedCards'
import SearchUsers from './screens/SearchUsers'
import Comments from './screens/Comments'


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
  },
  BlogCategory : {
    screen: BlogCategory,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
})

const AppStack = createStackNavigator({
  
  Payment : {
    screen: Payment,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Support : {
    screen: Support,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  SelectBlog : {
    screen: SelectBlog,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  MyAddress : {
    screen: MyAddress,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  AddPhoto : {
    screen: AddPhoto,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  MyOrders : {
    screen: MyOrders,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Checkout : {
    screen: Checkout,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Yourchart: {
    screen: Yourchart,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      headerTitle: 'Feedback'
    }
  },
  Privacy: {
    screen: Privacy,
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
    },
  }, 
  Shop: {
    screen: Shop,
    navigationOptions: {
      headerTitle: 'Shop'
    },
  },
  AddProduct: {
    screen: AddProduct,
    navigationOptions: {
      headerTitle: 'Shop'
    }
  },
  ProductPay: {
    screen: ProductPay,
    navigationOptions: {
      headerTitle: 'Payment'
    }
  },
  SavedCards: {
    screen: SavedCards,
    navigationOptions: {
      headerTitle: 'Saved Cards'
    }
  },
  SearchUsers: {
    screen: SearchUsers,
    navigationOptions: {
      headerTitle: 'Search Users'
    }
  },
  Comments: {
    screen: Comments,
    navigationOptions: {
      headerTitle: 'Search Users'
    }
  }
} , {initialRouteName : 'Blog', header: null})

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  App: {
    screen: AppStack
  },
})

const Routes = createAppContainer(App)

export default Routes
