import React, { useContext, useState } from "react";
import {

   View,
   TouchableOpacity,
   Switch,
   StyleSheet,
   Text,
   ScrollView,

} from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';

export default function Notifications({ navigation })