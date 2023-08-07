import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router';
import axios from '../api/axios';
import { useAuth } from '../context/auth';

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState('');
    const router = useRouter();
    const { logIn, user } = useAuth()

    const langMode = "BN";

    const { userLogin, setUserLogin } = useState([]);

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('userDetails', jsonValue);
        } catch (e) {
          // saving error
        }
    };    
    
    const storePassword = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('rememberedPassword', jsonValue);
        } catch (e) {
          // saving error
        }
    };

    const getPassData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('rememberedPassword');
          return jsonValue != null ? jsonValue : null;
        } catch (e) {
          // error reading value
        }
    };

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('rememberedPassword')
        } catch(e) {
          // remove error
        }
    }

    const hanndleLogin = async(event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            await axios.post('/login', {email, password}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
         
                if ( typeof res.data.status !== 'undefined') {
                    if( res.data.status == 'Error' ) {
                        setProcessing(false)
                        setMessage( ( langMode == 'BN' ) ? res.data.message_bn : res.data.message)
                    }
                } else {
                    const data = {
                        token: res.data.token,
                        normal_user: {
                            email: res.data.normal_user.email,
                            name: res.data.normal_user.name,
                            lastName: res.data.normal_user.last_name
                        }
                    };

                    storeData(data);
                    logIn(data);
                    //setUserLogin(res.data);
                    setProcessing(false);
    
                    if( res.data?.normal_user?.interest == null ) {
                        router.push('/interests');
                    } else {
                        router.push('/home');
                        //console.log(router)
                    }
                    //console.log(data)
                }
            });
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setMessage( ( langMode == 'BN' ) ? 'আনপ্রসেস এন্টিটি: অনুগ্রহ করে আপনার ইনপুট চেক করুন।' : 'Unprocessable Entity: Please check your input.');
            } else {
                setMessage( ( langMode == 'BN' ) ? 'একটি ত্রুটি ঘটেছে. অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন.' : 'An error occurred. Please try again later.');
            }
            setProcessing(false);
            console.log(e)
        }

        if (rememberMe) {
            storePassword(password)
        } else {
            removeValue();
        }
    };

    useEffect(() => {
        const getPasswordData = async () => {
            const passData = await getPassData();
            if (passData) {
                setPassword(passData); // Set the password state with the retrieved password string
                setRememberMe(true);
            }
        };
        getPasswordData();
    }, []);
    
    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    return (
        <SafeAreaView>
            <View className="form_wrapper bg-white dark:bg-[#272727] dark:text-white mt-32 py-24 px-6 bg-white">
                { !userLogin && (userLogin?.normal_user !== 'undefined' ) ? (
                    <View className="max-w-[425px] mx-auto mb-0">
                        <View className="form-title text-center">
                            <Text className="text-4xl font-semibold mb-2 leading-none">
                                { langMode == 'BN' ? 'লগইন' : 'Login'}
                            </Text>
                            <Text className="text-2xl text-black">
                                { langMode == 'BN' ? 'আপনার ইমেইল এবং পাসওয়ার্ড ব্যবহার করে এখানে লগইন করুন' : ' Login here using your email and password'}
                            </Text>
                        </View>
                        <Text>{"\n"}</Text>

                        <View className="form-group mt-6">
                            <Text className="label">
                                { langMode == 'BN' ? 'ইমেইল *' : 'Email Address *'}
                            </Text>
                            <TextInput 
                                className="form-control bg-white dark:bg-[#272727] dark:text-white"
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Email"
                                placeholderTextColor="#a9a9a9"
                                required
                            />
                        </View>

                        <View className="form-group mt-6">
                            <Text className="label">
                                { langMode == 'BN' ? 'পাসওয়ার্ড' : 'Password'}
                            </Text>
                            <TextInput 
                                className="form-control bg-white dark:bg-[#272727] dark:text-white"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder="Password"
                                placeholderTextColor="#a9a9a9"
                                required
                            />
                        </View>

                        <View className="form-group mt-6">
                            <TouchableOpacity
                            onPress={hanndleLogin}
                            disabled={processing}
                            >
                                {processing ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        {langMode === 'BN' ? 'সাইন ইন করুন' : 'Sign In'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text>login</Text>
                ) }
            </View>
            { message && (
                <Text>{message}</Text>
            ) }
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({})