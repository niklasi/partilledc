import { Form } from 'react-router-dom'
import { registerUser } from '../../actions'
import { firebaseAuth } from '../../firebase'
import { TextField, Button } from '../../components/Shared'

export async function action({request}) {
  const formData = await request.formData();
  const email = formData.get('email')
  const password = formData.get('password')
  await firebaseAuth.createUserWithEmailAndPassword(email, password)
}

const RegisterUser = ({ registerUser }) => {

  return (
    <Form method='POST'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-11/12 md:w-8/12 my-4'>
          <TextField name='email' label='Epost' type='email' className='w-full' />
        </div>
        <div className='w-11/12 md:w-8/12'>
          <TextField name='password' label='Lösenord' type='password' className='w-full' />
        </div>
        <Button type='submit' label='Skapa konto' primary />
      </div>
    </Form>
  )
}

export default RegisterUser