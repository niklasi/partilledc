import {Form, Link, redirect} from 'react-router-dom'
import {firebaseAuth, signInWithEmailAndPassword} from '../../firebase'
import {TextField, Button} from '../../components/Shared'

export async function action({request}) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    await signInWithEmailAndPassword(firebaseAuth, email, password)
    return redirect('/')
}

const SignIn = () => {
    return (
        <Form method="post">
            <div className="w-full flex flex-col items-center">
                <div className="w-11/12 md:w-8/12 my-4">
                    <TextField name="email" label="Epost" type="text" className="w-full" />
                </div>
                <div className="w-11/12 md:w-8/12">
                    <TextField name="password" label="Lösenord" type="password" className="w-full" />
                </div>
                <Button type="submit" label="Logga in" primary />
                <div className="my-3.5">
                    <Link to="/reset-password">
                        <Button className="text-xs" label="Problem att logga in?" secondary />
                    </Link>
                </div>
            </div>
        </Form>
    )
}

export default SignIn
