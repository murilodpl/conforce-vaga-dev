import api from "../services/api"
import { useState } from 'react'

export default function CadastroIng(props) {
    // Variable
    const [formData, setFormData] = useState({ id: 0, name: "", value: "" })
    const [check, setCheck] = useState({ name: false, value: false, err: false, isLoading: false, success: false })

    // Function
    function handleChange(e) {
        setCheck({ name: false, value: false, err: false, isLoading: false, success: false })

        let { name, value } = e.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function createIng(e) {
        e.preventDefault()

        // If field is filled
        if (formData.name == "") { return setCheck(prevCheck => ({ ...prevCheck, name: true })) } else { setCheck(prevCheck => ({ ...prevCheck, name: false })) }
        if (formData.value == "") { return setCheck(prevCheck => ({ ...prevCheck, value: true })) } else { setCheck(prevCheck => ({ ...prevCheck, value: false })) }

        setCheck(prevCheck => ({ ...prevCheck, isLoading: true, err: false }))

        api.post("/Ingrediente/CreateEdit", formData)
            .then(res => {
                // console.log(res)
                setFormData({ id: 0, name: "", value: "" })
                setCheck(prevCheck => ({ ...prevCheck, isLoading: false, success: true }))
                props.setChangeIng(prevIng => !prevIng)

                setTimeout(() => {
                    setCheck(prevCheck => ({ ...prevCheck, err: false, success: false }))
                }, 2000);
            })
            .catch(error => {
                // console.log(error)
                setCheck(prevCheck => ({ ...prevCheck, isLoading: false, err: true, success: false }))
            })
    }

    return (
        <div>
            <form id="formCadastrarIng">
                <input className={`${(check.name) && 'border-red-500 ring-red-500 border-2'} lg:col-span-2`} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do ingrediente..." required />
                <input className={`${(check.value) && 'border-red-500 ring-red-500 border-2'} lg:col-span-2`} type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Digite o preço do ingrediente..." required />

                <input className="btnRegister" type="submit" onClick={createIng} value="Cadastrar" />
            </form>

            <div className="mt-2 text-center">
                {(check.err) && <p className="text-red-500">Ocorreu um erro, tente novamente mais tarde.</p>}
                {(check.isLoading) && <div className="flex justify-center"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
                {(check.success) && <p className="text-green-500">Registrado com sucesso!</p>}
            </div>
        </div>
    )
}