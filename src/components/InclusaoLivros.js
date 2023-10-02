import { useState } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../config_axios";

const InclusaoLivros = () => {
    const { register, handleSubmit, reset } = useForm();
    const [aviso, setAviso] = useState("");
    const salvar = async (campos) => {

        try {
            const response = await inAxios.post("livros", campos);
            setAviso(`Ok! Livro cadastrado com código ${response.data.id}`);
        } catch (error) {
            setAviso(`Erro... Livro não cadastrado: ${error}`);
        }

        setTimeout(() => {
            setAviso("");
        }, 5000);

        reset({ titulo: "", autor: "", foto: "", ano: "", preço: "" });
    };

    return (
        <div className="container">
            <h4 className="fst-italic mt-4">Adicionar Livros</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group mt-3">
                    <input type="text" className="form-control" id="titulo" placeholder="Título" required autoFocus {...register("titulo")} />
                </div>
                <div className="form-group mt-3">
                    <input type="text" className="form-control" id="autor" placeholder="Autor" required {...register("autor")} />
                </div>
                <div className="form-group mt-3">
                    <input type="url" className="form-control" id="foto" placeholder="URL da capa" required {...register("foto")} />
                </div>
                <div className="row mt-3">
                    <div className="col-sm-5">
                        <div className="form-group">
                            <input type="number" className="form-control" id="ano" placeholder="Ano publicado" required {...register("ano")} />
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="form-group">
                            <input type="number" className="form-control" id="preco" step="0.01" placeholder="Preço R$" required {...register("preco")} />
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-secondary mt-3" value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3 ms-3" value="Limpar" />
            </form>

            <div className={aviso.startsWith("Ok!") ? "alert alert-success" : aviso.startsWith("Erro") ? "alert alert-danger" : ""}> {aviso}
            </div>
        </div>
    );
};

export default InclusaoLivros;