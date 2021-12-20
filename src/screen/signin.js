import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StatusBar,
    StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const Signin = ({ navigation }) => {
    const {setToken} = React.useContext(AuthContext)

    const [form, setForm] = React.useState({
        username: '',
        password: '',
        secureTextEntry: true
    });

    const signin = async () => {
        try{
            if(form.username === '' && form.password === '')
                return
            
            const data = {
                username: form.username,
                password: form.password
            }

            const res = await axios({
                url: 'http://192.168.0.111:5000/api/v1/auth/login',
                method: 'post',
                data: data
            })
            if(res.data.token != ''){
                setToken(res.data.token)
                navigation.navigate('ChatList')
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Sign In!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.textFooter}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="envelope-o"
                        color={"#000"}
                        size={20}
                    />
                    <TextInput 
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setForm({...form, username: val})}
                    />
                </View>

                <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color={"#000"}
                        size={20}
                    />
                    <TextInput 
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={form.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setForm({...form, password: val})}
                    />
                    <TouchableOpacity onPress={() => setForm({...form, secureTextEntry: !form.secureTextEntry})}>
                        {form.secureTextEntry ? 
                            <Feather 
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                        :
                            <Feather 
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => signin()}>
                        <LinearGradient colors={['#5B1B9B', '#7063AD']} style={styles.signIn}>
                            <Text style={styles.textSignIn}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.signUpButton}>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
      );
};
  
export default Signin

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#551A91'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textHeader: {
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        fontSize: 30
    },
    textFooter: {
        fontFamily: 'Nunito-Regular',
        backgroundColor: "#fff",
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: "#000",
        fontFamily: 'Nunito-Regular'
    },
    errorMsg: {
        fontFamily: 'Nunito-Regular',
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    signUpButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#5B1B9B',
        borderWidth: 1,
        marginTop: 15
    },
    forgetPasswordLink:{
        fontFamily: 'Nunito-Regular',
        color: '#5B1B9B', 
        marginTop:15
    },
    textSignIn: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#fff'
    },
    textSignUp: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#5B1B9B'
    }
});