import api from "../services/api"
import { useState, useEffect } from 'react'

export default function CadastroLanche(props) {
    // Variable
    const [formData, setFormData] = useState({ id: 0, name: "", ingredientes: [] })
    const [check, setCheck] = useState({ name: false, ingredientes: false, err: false, isLoading: false, success: false })
    const [ing, setIng] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        async function getAllIng() {
            await api.get("/Ingrediente/GetAll")
                .then(res => {
                    setIng(res.data.value)
                })
                .catch(error => {
                    console.log(error)
                }).finally(() => {
                    setIsLoading(false)
                });
        }
        getAllIng();

        return () => setIsLoading(false);
    }, [props.changeIng])

    const ingElement = (ing.length != 0) ?
        ing.map((ing, index) => <div key={index}>
            <input type="checkbox" id={ing.name} name={ing.name} onChange={handleChange} />
            <label htmlFor={ing.name}>{ing.name}</label>
        </div>) : false

    // Function
    function handleChange(e) {
        setCheck({ name: false, ingredientes: false, err: false, isLoading: false, success: false })

        let { name, value, type } = e.target

        if (type === "checkbox") {
            let array = [];
            let checkedsInput = document.querySelectorAll('input[type=checkbox]:checked');
            for (let i = 0; i < checkedsInput.length; i++) {
                array.push(checkedsInput[i].name);
            }

            setFormData(prevData => ({
                ...prevData,
                "ingredientes": [
                    ...array
                ]
            }))
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    function createLanche(e) {
        e.preventDefault()

        // If field is filled
        if (formData.name == "") { return setCheck(prevCheck => ({ ...prevCheck, name: true })) } else { setCheck(prevCheck => ({ ...prevCheck, name: false })) }
        if (formData.ingredientes.length == 0) { return setCheck(prevCheck => ({ ...prevCheck, ingredientes: true })) } else { setCheck(prevCheck => ({ ...prevCheck, ingredientes: false })) }

        setCheck(prevCheck => ({ ...prevCheck, isLoading: true, err: false }))
        const formDataFinal = { id: formData.id, name: formData.name, ingredientes: formData.ingredientes.toString() }

        api.post("/Lanche/CreateEdit", formDataFinal)
            .then(res => {
                if (res.data.statusCode == 200) {
                    formData.ingredientes.forEach(element => {
                        document.getElementById(element).checked = false;
                    });

                    setFormData({ id: 0, name: "", ingredientes: [] })
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
                console.log(error)
                setCheck(prevCheck => ({ ...prevCheck, isLoading: false, err: true, success: false }))
            })
    }

    return (
        <div>
            <form id="formCadastrarLanche">
                <div className="grid lg:grid-cols-2 items-center gap-4 mb-4">
                    <label className="text-white" htmlFor="id">Id: <span className="text-primary">(Para cadastrar um novo lanche mantenha o Id em 0)</span></label>
                    <input type="number" name="id" value={formData.id} onChange={handleChange} />
                </div>

                <input className={`${(check.name) && 'border-red-500 ring-red-500 border-2'} w-full`} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do lanche..." required />

                <fieldset className={`${(check.ingredientes) && 'fieldset-error'} border border-primary p-3 my-3 text-white text-[15px]`}>
                    <legend className="text-primary text-sm">Ingredientes</legend>

                    {(isLoading) ? <div className="flex justify-center lg:col-span-2"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                        : (ingElement) ? ingElement : <p className="lg:col-span-2">Nenhum ingrediente cadastrado.</p>}
                </fieldset>


                <input className="btnRegister" type="submit" onClick={createLanche} value="Cadastrar" />
            </form>

            <div className="my-2 text-center">
                {(check.err) && <p className="text-red-500">Ocorreu um erro, digite o ID certo ou tente novamente mais tarde.</p>}
                {(check.isLoading) && <div className="flex justify-center"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
                {(check.success) && <p className="text-green-500">Registrado com sucesso!</p>}
            </div>
        </div>
    )
}