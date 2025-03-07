import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'


interface SettingsItemProps {
  icon:ImageSourcePropType,
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
  textStyle?: string;
}

const SettingsItem = ({ title, onPress,icon,textStyle, showArrow = true }:SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row justify-between items-center  py-3'>
    <View className='flex flex-row items-center gap-3'>
    <Image source={icon} className='size-6'/>
      <Text className={`text-lg text-rubik-medium ${textStyle}`}>{title}</Text> 
    </View>
    {showArrow && <Image source={icons.rightArrow} className='size-6'/>}
  </TouchableOpacity>
)


const Profile = () => {

  const {user, refetch} = useGlobalContext()

  const handleLogout = async () => {
    const result = await logout()
    if(result) {
      Alert.alert('Success', 'You have been logged out successfully')
      refetch()
    }else {
      Alert.alert('Error', 'An error occurred while logging out')
    }
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-6'/>
        </View>

        <View className='flex flex-row  justify-center mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{uri:user?.avatar}} className='size-44 relative rounded-full'/>
            <TouchableOpacity className='absolute bottom-11 right-2 '>
              <Image source={icons.edit} className='size-9'/>
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10'>
          <SettingsItem icon={icons.calendar} title='My Bookings' onPress={() => {}}/>
          <SettingsItem icon={icons.wallet} title='Payments' onPress={() => {}}/>
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          {settings.slice(2).map((setting, index) => (
            <SettingsItem key={index} {...setting} />
          ))}
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
        <SettingsItem icon={icons.logout} title='Logout' onPress={handleLogout} showArrow={false} textStyle='text-danger'/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile