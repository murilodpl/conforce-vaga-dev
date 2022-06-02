import api from "../services/api"
import { useState } from 'react'

export default function CadastroIng(props) {
    // Variable
    const [formData, setFormData] = useState({ id: "", name: "", value: "" })
    const [check, setCheck] = useState({ id: false, name: false, value: false, err: false, isLoading: false, success: false })

    // Function
    function handleChange(e) {
        setCheck({ id: false, name: false, value: false, err: false, isLoading: false, success: false })

        let { name, value } = e.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function editIng(e) {
        e.preventDefault()

        // If field is filled
        if (formData.id == "") { return setCheck(prevCheck => ({ ...prevCheck, id: true })) } else { setCheck(prevCheck => ({ ...prevCheck, id: false })) }
        if (formData.name == "") { return setCheck(prevCheck => ({ ...prevCheck, name: true })) } else { setCheck(prevCheck => ({ ...prevCheck, name: false })) }
        if (formData.value == "") { return setCheck(prevCheck => ({ ...prevCheck, value: true })) } else { setCheck(prevCheck => ({ ...prevCheck, value: false })) }

        setCheck(prevCheck => ({ ...prevCheck, isLoading: true, err: false }))

        api.post("/Ingrediente/CreateEdit", formData)
            .then(res => {
                console.log(res)
                if (res.data.statusCode == 200) {
                    setFormData({ id: "", name: "", value: "" })
                    setCheck(prevCheck => ({ ...prevCheck, isLoading: false, success: true }))
                    props.setChangeIng(prevIng => !prevIng)
                } else {
                    setCheck(prevCheck => ({ ...prevCheck, isLoading: false, err: true, success: false }))
                }

                setTimeout(() => {
                    setCheck(prevCheck => ({ ...prevCheck, err: false, success: false }))
                }, 3000);
            })
            .catch(error => {
                console.log(error)
                setCheck(prevCheck => ({ ...prevCheck, isLoading: false, err: true, success: false }))
            })
    }

    return (
        <div>
            <form id="formEditarIng">
                <input className={`${(check.id) && 'border-red-500 ring-red-500 border-2'} lg:col-span-1`} type="number" name="id" value={formData.id} onChange={handleChange} placeholder="Digite o id do ingrediente..." required />
                <input className={`${(check.name) && 'border-red-500 ring-red-500 border-2'} lg:col-span-2`} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do ingrediente..." required />
                <input className={`${(check.value) && 'border-red-500 ring-red-500 border-2'} lg:col-span-2`} type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Digite o preço do ingrediente..." required />

                <input className="btnRegister" type="submit" onClick={editIng} value="Editar" />
            </form>

            <div className="my-2 text-center">
                {(check.err) && <p className="text-red-500">Esse ingrediente não existe.</p>}
                {(check.isLoading) && <div className="flex justify-center"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
                {(check.success) && <p className="text-green-500">Editado com sucesso!</p>}
            </div>
        </div>
    )
}