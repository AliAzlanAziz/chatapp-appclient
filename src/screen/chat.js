import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native'
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const Chat = ({ navigation, route }) => {
    const { token } = React.useContext(AuthContext)
    const [form, setForm] = React.useState({
        toid: '',
        msg: ''
    })
    const [height, setHeight] = React.useState(0)
    const [messageList, setMessageList] = React.useState([])
    let timerId

    const sendMessage = async () => {
        try{
            if(form.msg === '')
                return

            const data = {
                toid: form.toid,
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
                setForm({...form, msg:''})
                return;
            }
        }catch(err){
            console.log(err)
        }
    }

    const getLastMessages = async () => {
        try{
            if(messageList.length > 0){
                const res = await axios({
                    url: `http://192.168.0.111:5000/api/v1/message/getlastmessages/${route.params.toid}/${messageList[0].id}`,
                    method: 'get',
                    headers: {
                        'token': `${token}`
                    }
                })

                if(res.data.success){
                    const list = res.data.data
                    setMessageList([...messageList, list])
                }
            }else{
                const res = await axios({
                    url: `http://192.168.0.111:5000/api/v1/message/getlastmessages/${route.params.toid}/0`,
                    method: 'get',
                    headers: {
                        'token': `${token}`
                    }
                })

                if(res.data.success){
                    const list = res.data.data
                    setMessageList(list)
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(() => {
        navigation.setOptions({
            title: route.params.title +"'s Chat" ,
        })

        setForm({...form, toid: route.params.toid})
        timerId = setInterval(() => getLastMessages(), 3000);

        return () => clearInterval(timerId);
    },[])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{justifyContent: 'flex-end'}}>
                {
                    messageList.map(item => {
                        return item.toid != form.toid ?
                            <View style={styles.otheruserMsgContainer} key={item.id}>
                                <Text style={styles.otheruserDate}>{new Date(item.sendtime).toTimeString()}</Text>
                                <Text style={styles.otheruserMsg}>{item.msg}</Text>
                            </View>
                            :
                            <View style={styles.userMsgContainer} key={item.id}>
                                <Text style={styles.userDate}>{new Date(item.sendtime).toTimeString()}</Text>
                                <Text style={styles.userMsg}>{item.msg}</Text>
                            </View>
                    })
                }
                </View>
            </ScrollView>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Type message..."
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {height: height}]}
                    autoCapitalize="none"
                    onChangeText={(val) => setForm({...form, msg: val})}
                    defaultValue={form.msg}
                    onContentSizeChange={(e) => { e.nativeEvent.contentSize.height < 200 ? setHeight(e.nativeEvent.contentSize.height + 50) : setHeight(200)}}
                    multiline={true}
                />
                <TouchableOpacity onPress={() => sendMessage()} style={{justifyContent: 'center'}}>
                    <MaterialCommunityIcons
                        name='send-circle'
                        style={{marginBottom:5, marginRight:5}}
                        size={40}
                        color='#5B1B9B'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-end'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: "#000",
        fontFamily: 'Nunito-Regular',
    },
    otheruserMsgContainer:{
        borderRadius: 10, 
        padding: 10, 
        marginVertical:5, 
        marginHorizontal: 10, 
        backgroundColor: "#ECE2F7",
        borderBottomLeftRadius: 0
    },
    userMsgContainer:{
        borderRadius: 10, 
        alignItems: 'flex-end', 
        padding: 10, 
        marginVertical:5, 
        marginHorizontal: 10, 
        backgroundColor: "#5B1B9B",
        borderBottomRightRadius: 0
    },
    otheruserDate: {
        fontFamily: 'Nunito-Regular', 
        fontSize: 10, 
        color: "#000", 
        alignSelf: 'flex-end'
    },
    otheruserMsg: {
        fontFamily: 'Nunito-Regular', 
        fontSize: 18, 
        color: "#000", 
    },
    userDate: {
        fontFamily: 'Nunito-Regular', 
        fontSize: 10, 
        color: "#fff", 
        alignSelf: 'flex-start'
    },
    userMsg: {
        fontFamily: 'Nunito-Regular', 
        fontSize: 18, 
        color: "#fff", 
    }
})