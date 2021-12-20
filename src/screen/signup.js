import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import validator from 'validator'
import axios from 'axios'

const Signup = ({ navigation }) => {
    const [success, setSuccess] = React.useState(false)

    const [check, setCheck] = React.useState({
        fullname: false,
        username: false,
        password: false,
        confirmPassword: false,
        secureTextEntry: true,
    })

    const [form, setForm] = React.useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const signup = async () => {
        if(check.fullname && check.username && check.password)
        {
            try{
                const data = {
                    fullname: form.fullname,
                    username: form.username,
                    password: form.password
                }
                const res = await axios({
                    url: 'http://192.168.0.111:5000/api/v1/auth/register',
                    method: 'post',
                    data: data
                })
                if(res.data.success){
                    setSuccess(true)
                    setTimeout(() => {setSuccess(false)}, 15000)
                }
            }catch(err){
                console.log(err)
            }
        }else{
            return
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Sign Up Now!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer} >
                <ScrollView>
                    <Text style={styles.textFooter}>Name*</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={"#000"} size={20}/>
                        <TextInput 
                            placeholder="Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setForm({...form, fullname: val})}
                            onEndEditing={() => setCheck({...check, fullname: true})}
                        />
                        {validator.isLength(form.fullname, {min:2}) ? 
                            <Animatable.View animation="bounceIn" >
                                <Feather name="check-circle" color="green" size={20}/>
                            </Animatable.View>
                        :   null}
                    </View>
                    {check.fullname && (
                        validator.isLength(form.fullname, {min:2, max:256}) ? null
                        :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Name must contain from 2 to 256 characters.</Text>
                        </Animatable.View>
                    )}

                    <Text style={styles.textFooter}>Username*</Text>
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" color={"black"} size={20}/>
                        <TextInput 
                            placeholder="Username"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setForm({...form, username: val})}
                            onEndEditing={() => setCheck({...check, username: true})}
                        />
                    </View>
                    {check.username && (
                        validator.isLength(form.username, {min:6, max:32}) ? null
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username  must contain from 6 to 32 characters.</Text>
                        </Animatable.View>
                    )}
                
                    <Text style={styles.textFooter}>Password*</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color={"#000"} size={20}/>
                        <TextInput 
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={check.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setForm({...form, password: val})}
                            onEndEditing={() => setCheck({...check, password: true})}
                        />
                        <TouchableOpacity onPress={() => setCheck({ ...check, secureTextEntry: !check.secureTextEntry })}>
                        {check.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20}/>
                            :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                        </TouchableOpacity>
                    </View>
                    {check.password && (
                        validator.isLength(form.password, {min: 5}) ? null
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 5 characters long.</Text>
                        </Animatable.View>
                    )}

                    <View style={styles.action}>
                        <Feather name="lock" color={"#000"} size={20}/>
                        <TextInput 
                            placeholder="Confirm Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={check.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setForm({...form, confirmPassword: val})}
                            onEndEditing={() => setCheck({...check, confirmPassword: true})}
                        />
                        <TouchableOpacity onPress={() => setCheck({ ...check, secureTextEntry: !check.secureTextEntry })}>
                            {check.secureTextEntry ? 
                                <Feather name="eye-off" color="grey" size={20}/>
                                :
                                <Feather name="eye" color="grey" size={20}/>
                            }
                        </TouchableOpacity>
                    </View>
                    {check.confirmPassword && (
                        form.confirmPassword === form.password ? null
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Passwords do not match.</Text>
                        </Animatable.View>
                    )}
                    {
                        !success ? null
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.infoMsg}>Successfully Signed Up! Move to Sign In Screen</Text>
                        </Animatable.View>
                    }
                
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => signup()} style={styles.signupButton}>
                            <LinearGradient colors={['#5B1B9B', '#7063AD']} style={styles.signupButton}>
                                    <Text style={styles.textSignin}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.signinButton}>
                            <Text style={styles.textSignup}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
      );
};
  
export default Signup;

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
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textHeader: {
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        fontSize: 30
    },
    textFooter: {
        fontFamily: 'Nunito-Regular',
        color: '#000',
        fontSize: 18,
        marginTop: 5
    },
    textFooterGender: {
        fontFamily: 'Nunito-Regular',
        color: '#000',
        fontSize: 18,
        marginTop: 15,
        marginBottom: -13
    },
    textFooterBirthday: {
        fontFamily: 'Nunito-Regular',
        color: '#000',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 0
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionBirthday: {
        marginTop: 10,
        flexDirection: 'row',
    },
    separatorBirthday: {
        marginTop: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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
    infoMsg: {
        fontFamily: 'Nunito-Regular',
        color: '#3048B2',
        fontSize: 14,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    signupButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    signinButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#5B1B9B',
        borderWidth: 1,
        marginTop: 10
    },
    textSignin: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#fff'
    },
    textSignup: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#5B1B9B'
    }
});