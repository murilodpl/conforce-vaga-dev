import api from "../services/api"
import trashSvg from "../assets/img/trash.svg"
import { useEffect, useState } from 'react'

export default function ShowLanche(props) {
    // Variables
    const [lanche, setLanche] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    // Get All Ingredientes
    useEffect(() => {
        setIsLoading(true)

        async function getAllLanche() {
            await api.get("/Lanche/GetAll")
                .then(res => {
                    // console.log(res)
                    setLanche(res.data.value)
                })
                .catch(error => {
                    console.log(error)
                }).finally(() => {
                    setIsLoading(false)
                });
        }
        getAllLanche();

        return () => setIsLoading(false);
    }, [props.changeLanche])

    // Functions
    function deleteLanche(id) {
        api.delete(`/Lanche/Delete?id=${id}`)
            .then(res => {
                console.log(res)
                props.setChangeLanche(prevLanche => !prevLanche)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const lancheElement = (lanche.length != 0) ?
        lanche.map((lanche, index) => <tr className="relative" key={index}>
            <td>{lanche.id}</td>
            <td>{lanche.name}</td>
            <td>R$ {lanche.value.toFixed(2)}</td>
            <td><button className="btnDeletar" onClick={() => deleteLanche(lanche.id)} aria-label="Botão de deletar"><img width="24px" height="24px" src={trashSvg} alt="Icone de Lixeira" /></button></td>
        </tr>) : false

    return (
        <>
            {
                (isLoading) ? <div className="flex justify-center"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                    :
                    (lancheElement) ?
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
                                                {lancheElement}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <p className="my-4 text-center text-primary">Nenhum lanche cadastrado.</p>
            }
        </>
    )
}