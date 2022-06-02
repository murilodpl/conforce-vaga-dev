import api from "../services/api"
import { useState } from 'react'

export default function CadastroLanche(props) {
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

    function createLanche(e) {
        e.preventDefault()

        // If field is filled
        if (formData.name == "") { return setCheck(prevCheck => ({ ...prevCheck, name: true })) } else { setCheck(prevCheck => ({ ...prevCheck, name: false })) }
        if (formData.value == "") { return setCheck(prevCheck => ({ ...prevCheck, value: true })) } else { setCheck(prevCheck => ({ ...prevCheck, value: false })) }

        setCheck(prevCheck => ({ ...prevCheck, isLoading: true, err: false }))

        api.post("/Lanche/CreateEdit", formData)
            .then(res => {
                // console.log(res)
                if (res.data.statusCode == 200) {
                    setFormData({ id: 0, name: "", value: "" })
                    setCheck(prevCheck => ({ ...prevCheck, isLoading: false, success: true }))
                    props.setChangeLanche(prevLanche => !prevLanche)
                } else {
                    setCheck(prevCheck => ({ ...prevCheck, isLoading: false, err: true, success: false }))
                }

                setTimeout(() => {
                    setCheck(prevCheck => ({ ...prevCheck, err: false, success: false }))
                }, 3000);
            })
            .catch(error => {
                // console.log(error)
                setCheck(prevCheck => ({ ...prevCheck, isLoading: false, err: true, success: false }))
            })
    }

    return (
        <div>
            <form id="formCadastrarLanche">
                <input className={`${(check.name) && 'border-red-500 ring-red-500 border-2'} lg:col-span-2`} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do lanche..." required />
                <input className={`${(check.value) && 'border-red-500 ring-red-500 border-2'} lg:col-span-2`} type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Digite o preço do lanche..." required />

                <input className="btnRegister" type="submit" onClick={createLanche} value="Cadastrar" />
            </form>

            <div className="my-2 text-center">
                {(check.err) && <p className="text-red-500">Ocorreu um erro, tente novamente mais tarde.</p>}
                {(check.isLoading) && <div className="flex justify-center"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
                {(check.success) && <p className="text-green-500">Registrado com sucesso!</p>}
            </div>
        </div>
    )
}