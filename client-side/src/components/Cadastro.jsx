function CadastroIng(props) {
    return (
        <div>
            <form id="formCadastrarIng">
                <input type="text" name="ingName" placeholder="Digite o nome do Ingrediente..." /> {/*value={props.formData.name}*/}
                <input type="number" name="ingPrice" placeholder="Digite o preço do Ingrediente..." /> {/*value={props.formData.price}*/}
            </form>
        </div>
    )
}

function CadastroLanche(props) {
    return (
        <div>
            <form id="formCadastrarLanche">
                <input type="text" name="lancheName" placeholder="Digite o nome do Lanche..." /> {/*value={props.formData.name}*/}

                <fieldset>
                    <legend>Escolha os ingredientes</legend>
                    <div>
                        <input type="checkbox" id="música" name="lancheIngredientes" value="Hamburguer" />
                        <label for="Hamburguer">Hamburguer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="codificação" name="lancheIngredientes" value="ovo" />
                        <label for="ovo">Ovo</label>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export { CadastroIng, CadastroLanche }