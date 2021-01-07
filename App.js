import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Formik, useFormikContext, useField } from 'formik';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Yup from 'yup';

// const validate = values => {
//   const errors = {}
//   if(!values.email){
//     errors.email = 'Requerido'
//   }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//     errors.email = 'Introduce un email valido'
//   }
//   return errors
// }

// export default function App() {
//   const formik = useFormik({
//     initialValues: {
//       email: 'lala@lala.com',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//       .email('Correo invalido')
//       .required('Requerido')
//     }),
//     onSubmit: x => console.warn(x)
//   })
//   return (
//     <View style={styles.container}>
//       <Text>Correo electrónico</Text>
//       <TextInput 
//         onBlur={formik.handleBlur('email')}
//         onChangeText={formik.handleChange('email')}
//         value={formik.values.email}
//       />
//       {formik.errors.email && formik.touched.email ? <Text>{formik.errors.email}</Text> : null}
//       <Button 
//         title='lala'
//         onPress={formik.handleSubmit}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const MyInput = ({ fieldName, ...props }) => {
  const [ field, meta ] = useField(fieldName)
  return(
    <>
    <TextInput
        style={styles.input}
        onChangeText={field.onChange(fieldName)}
        onBlur={field.onBlur(fieldName)}
        value={field.value}
        {...props}
      />   
      {meta.error && meta.touched && (
        <Text style={{ color: 'red'}}>{meta.error}</Text>
      )}
      </>
  )
}

const EmailForm = () => {
  const { submitForm, } = useFormikContext()
    return (
      <>
      <Text>Correo electrónico</Text>
      <MyInput 
        fieldName='email'
      />
      <MyInput 
        fieldName='name'
      />
          <Button 
            title='Enviar'
            onPress={submitForm}
          />
      </>
    )
}

export default function App(){


  return(
    <View style={styles.container}>
      <Formik
        onSubmit={x => console.log(x)}
        validationSchema={
          Yup.object({
            email: Yup.string()
            .email('Correo inválido')
            .required('Requerido'),
            name: Yup.string()
            .min(10, 'Este campo debe tener 10 letras minimo')
            .required('Requerido')
          })
        }
        initialValues={{ email: '', name: '' }}
      >
        <EmailForm/>
      </Formik>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 20,
    backgroundColor: '#ddd',
    width: 200
  },
});
