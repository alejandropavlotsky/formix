import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFormik } from 'formik';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const validate = values => {
  const errors = {}
  if(!values.email){
    errors.email = 'Requerido'
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = 'Introduce un email valido'
  }
  return errors
}

export default function App() {
  const formik = useFormik({
    initialValues: {
      email: 'lala@lala.com',
    },
    validate,
    onSubmit: x => console.warn(x)
  })
  return (
    <View style={styles.container}>
      <Text>Correo electrónico</Text>
      <TextInput 
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
      />
      {formik.errors.email ? <Text>{formik.errors.email}</Text> : null}
      <Button 
        title='lala'
        onPress={formik.handleSubmit}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
