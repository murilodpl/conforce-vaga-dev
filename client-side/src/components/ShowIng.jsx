import api from "../services/api"
import trashSvg from "../assets/img/trash.svg"
import { useEffect, useState } from 'react'

export default function ShowIng(props) {
    // Variables
    const [ing, setIng] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    // Get All Ingredientes
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

    // Functions
    function deleteIng(id) {
        api.delete(`/Ingrediente/Delete?id=${id}`)
            .then(res => {
                props.setChangeIng(prevIng => !prevIng)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const ingElement = (ing.length != 0) ?
        ing.map((ing, index) => <tr className="relative" key={index}>
            <td>{ing.id}</td>
            <td>{ing.name}</td>
            <td>R$ {ing.value.toFixed(2)}</td>
            <td><button className="btnDeletar" onClick={() => deleteIng(ing.id)} aria-label="Botão de deletar"><img width="24px" height="24px" src={trashSvg} alt="Icone de Lixeira" /></button></td>
        </tr>) : false

    return (
        <>
            {
                (isLoading) ? <div className="flex justify-center"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                    :
                    (ingElement) ?
                        <div className="tableIng flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-tertiary border-b border-tertiary">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Preço</th>
                                                    <th scope="col">Deletar</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-white">
                                                {ingElement}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <p className="my-4 text-center text-primary">Nenhum ingrediente cadastrado.</p>
            }
        </>
    )
}