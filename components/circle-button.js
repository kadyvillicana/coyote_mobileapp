import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const CircleButton = (props) => {
  const {icon, primary} = props;
  const { colors } = useTheme(); 
  return(
    <TouchableOpacity
      {...props}
      style={{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:30,
        height:30,
        backgroundColor: primary ? colors.primary : colors.error,
        borderRadius:50,
      }}>
        <Icon name={icon}/>
    </TouchableOpacity>
  )
}

export default CircleButton;
