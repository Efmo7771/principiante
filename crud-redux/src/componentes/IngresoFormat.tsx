import { Card, Button, TextInput, Title, Badge } from "@tremor/react";
import { userActions } from "../hooks/userActions"
import { useState } from "react";


export function IngresoFormat() {
    const { addUser } = userActions()
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResult(null)
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string
        if (!name || !email || !github) {
            return setResult('ko')
        }
        addUser({ name, email, github })
        setResult('ok')
        form.reset()
    }
    return (
        <Card style={{ marginTop: "20px", textAlign: "center", marginLeft: "150px", border: "1px solid #000", marginRight: "50px", maxWidth: "80%" }}>
            <Title>Crear nuevo usuario</Title>
            <form onSubmit={handleSubmit}>
                <TextInput
                    onKeyDown={()=>setResult(null)}
                    name="name"
                    placeholder="Aquí el Nombre"
                />
                <TextInput
                    name="email"
                    placeholder="Aquí el Email"
                />
                <TextInput
                    name="github"
                    placeholder="Aquí el usuario de Github"
                />
                <div>
                    <Button style={{ marginTop: "15px" }} type="submit">
                        Crear usuario
                    </Button>
                    <span>
                        {result === 'ok' && <Badge color='green'>Guardado Correctamente</Badge>}
                        {result === 'ko' && <Badge color='red'>ERROR al llenar los datos</Badge>}
                    </span>
                </div>
            </form>
        </Card>
    )
}