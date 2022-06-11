import {Form} from 'react-router-dom'
import {resetPassword} from '../../lib/auth'
import {TextField, Button} from '../../components/Shared'

export async function action({request}) {
    const formData = await request.formData()
    const email = formData.get('email')
    await resetPassword(email)
}

const ResetPassword = () => {
    return (
        <Form method="post">
            <div className="w-full flex flex-col items-center">
                <div className="w-11/12 md:w-8/12 my-4">
                    <TextField name="email" label="Epost" type="text" className="w-full" />
                </div>
                <Button type="submit" label="Återställ lösenord" primary />
            </div>
        </Form>
    )
}

export default ResetPassword
