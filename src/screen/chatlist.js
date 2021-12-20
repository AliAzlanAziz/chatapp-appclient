import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const ChatList = ({ navigation }) => {
    const [chatlist, setChatList] = React.useState()
    const [height, setHeight] = React.useState(0)
    const [form, setForm] = React.useState({
        tousername: '',
        msg: ''
    });
    const {token} = React.useContext(AuthContext)
    let timerId

    const sendMessage = async () => {
        try{
            if(form.msg === '')
                return

            const data = {
                tousername: form.tousername,
                msg: form.msg
            } 

            const res = await axios({
                url: 'http://192.168.0.111:5000/api/v1/message/specific',
                method: 'post',
                headers: {
                    'token': `${token}`
                },
                data: data
            })

            if(res.data.success){
                getAllUsers()
                setForm({...form, tousername:'', msg:''})
                return;
            }
        }catch(err){
            console.log(err)
        }
    }

    const getAllUsers = async () => {
        try{
            const res = await axios({
                url: 'http://192.168.0.111:5000/api/v1/message/getallusers',
                method: 'get',
                headers: {
                    'token': `${token}` 
                }
            })
            if(res.data.success){
                const result = res.data.data
                setChatList(result)
            }
        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(() => {
        timerId = setInterval(() => getAllUsers(), 10000);

        return () => clearInterval(timerId);
    } , [])

    const handleLongPress =  () => {
        setToggleText(true)
        setTimeout(() => {setToggleText(false)}, 10000)
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chat', { title: item.fullname, toid: item.id})}>
                <View style={styles.row}>
                    <View style={styles.rowContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.fullname}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.subjectText} numberOfLines={1} ellipsizeMode="tail">@{item.username}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <FlatList 
                extraData={chatlist}
                data={chatlist}
                keyExtractor = {(item) => {
                    return item.id;
                }}
                renderItem={renderItem}
            />
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.textFooter}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="envelope-o"
                        color={"#000"}
                        size={20}
                    />
                    <TextInput 
                        placeholder="@username"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setForm({...form, tousername: val})}
                        defaultValue={form.tousername}
                    />
                </View>

                <Text style={styles.textFooter}>Message</Text>
                <View style={styles.action}>
                    <Feather 
                        name="message-square"
                        color={"#000"}
                        size={20}
                    />
                    <TextInput 
                        placeholder="Type your message"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {height: height}]}
                        onContentSizeChange={(e) => { e.nativeEvent.contentSize.height < 200 ? setHeight(e.nativeEvent.contentSize.height) : setHeight(300)}}
                        multiline={true}
                        autoCapitalize="none"
                        onChangeText={(val) => setForm({...form, msg: val})}
                        defaultValue={form.msg}
                    />
                </View>

                <TouchableOpacity onPress={ () => sendMessage() } style={styles.signUpButton}>
                    <Text style={styles.textSignUp}>Send Message</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

export default ChatList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footer: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: "#000",
        fontFamily: 'Nunito-Regular'
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
    textSignUp: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        color: '#5B1B9B'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    rowContainer: {
        marginVertical: 10, 
        marginLeft: 10
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        fontFamily: 'Nunito-Regular',
        marginLeft: 10,
        color: '#000',
        fontSize: 18,
        width: '65%',
    },
    msgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subjectText: {
        fontFamily: 'Nunito-Regular',
        color: '#151515',
        fontSize: 12,
        marginLeft: 10,
        width: '65%',
    },
    prcText: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '300',
        color: '#151515',
        fontSize: 13
    }
});