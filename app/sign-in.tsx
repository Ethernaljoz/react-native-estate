import { View, Text, ScrollView,Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { loginWithGoogle } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {

  const {refetch, loading, isLoggedIn} = useGlobalContext()

  if(!loading && isLoggedIn)  return <Redirect href='/' />

  const handleLogin = async() => {
    const result = await loginWithGoogle()
    if(result) {
      refetch()
      console.log('Login Success')
    }else {
     Alert.alert('Error','Failed to login')
    }
  }



  return (
    <SafeAreaProvider className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image source={images.onboarding} className='w-full h-4/6' resizeMode="contain" />
        <View className='px-10'>
          <Text className='text-base font-black-200 font-rubik text-center uppercase'>Welcome to Estate</Text>
          <Text className='text-3xl font-rubik-bold text-center text-black-300 mt-2'>Let's Get You closer to {"\n"}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>
          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>Login to Estate with Google</Text>
          <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
            <View className='flex-row justify-center items-center'>
            <Image source={icons.google} className='w-5 h-5' resizeMode='contain' />
            <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default SignIn