import {Form, useSearchParams} from 'react-router-dom'
import {confirmPasswordReset} from '../../lib/auth'
import {TextField, Button} from '../../components/Shared'

export async function action({request}) {
    const formData = await request.formData()
    const code = formData.get('code')
    const password = formData.get('password')

    await confirmPasswordReset(code, password)
}

const ConfirmPasswordReset = () => {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('oobCode') || ''

    return (
        <Form method="post">
            <div className="w-full flex flex-col items-center">
                <div className="w-11/12 md:w-8/12 my-4">
                    <TextField name="password" type="password" label="Nytt lösenord" className={'w-full'} />
                </div>
                <input name="code" readOnly type="hidden" value={code} />
                <Button type="submit" label="Uppdatera" primary />
            </div>
        </Form>
    )
}

export default ConfirmPasswordReset
