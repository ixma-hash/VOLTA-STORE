import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { requestFormReset } from 'react-dom';
import { useState } from 'react';

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

export default function Categorias({ categorias }: { categorias: Categoria[] }) {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [categoriaEditar, setCategoriaEditar] = useState<Categoria | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nombre: '',
        descripcion: '',
    });

    const editarCategoria = (categoria: Categoria) => {
        setCategoriaEditar(categoria);

        setData({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion,
        });

        setMostrarFormulario(true);
    };

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
        setCategoriaEditar(null);
        reset();
    };

    const guardarCategoria = (e: React.FormEvent) => {
        e.preventDefault();

        if (categoriaEditar) {
            put(`/categorias/${categoriaEditar.id}`, {
                onSuccess: () => {
                    cerrarFormulario();
                },
            });
        } else {
            post('/categorias', {
                onSuccess: () => {
                    cerrarFormulario();
                },
            });
        }
    };

    const eliminarCategoria = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            destroy(`/categorias/${id}`);
        }
    };

    return (
        <>
            <Head title="Categorias" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">

                    <a
                        href="/productos/reporte-pdf"
                        target="_blank"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm
font-medium flex items-center gap-2"
                    >
                        Generar PDF Productos
                    </a>
                    <button
                        type="button"
                        onClick={() => setMostrarFormulario(true)}
                        className="m-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        + Nueva categoría
                    </button>

                    <table>
                        <thead>
                            <tr>
                                <th className="w-1/4 p-4">Id</th>
                                <th className="w-1/4 p-4">Categorias</th>
                                <th className="w-1/4 p-4">Descripcion</th>
                                <th className="w-1/4 p-4">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td className="w-1/4 p-4">
                                        {categoria.id}
                                    </td>

                                    <td className="w-1/4 p-4">
                                        {categoria.nombre}
                                    </td>

                                    <td className="w-1/4 p-4">
                                        {categoria.descripcion}
                                    </td>

                                    <td className="w-1/4 p-4">


                                        <button
                                            type="button"
                                            onClick={() => editarCategoria(categoria)}
                                            className="mr-2 rounded-lg bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => eliminarCategoria(categoria.id)}
                                            className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                                        >
                                            Eliminar
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {mostrarFormulario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">

                        <div className="mb-5 flex items-center justify-between">

                            <h2 className="text-xl font-bold">
                                {categoriaEditar
                                    ? 'Editar categoría'
                                    : 'Nueva categoría'}
                            </h2>

                            <button
                                type="button"
                                onClick={cerrarFormulario}
                                className="text-xl text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>

                        <form onSubmit={guardarCategoria}>


                            <div className="mb-4">

                                <label className="mb-2 block">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) =>
                                        setData('nombre', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                    placeholder="Nombre de la categoría"
                                />

                                {errors.nombre && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.nombre}
                                    </p>
                                )}

                            </div>


                            <div className="mb-5">

                                <label className="mb-2 block">
                                    Descripción
                                </label>

                                <textarea
                                    value={data.descripcion}
                                    onChange={(e) =>
                                        setData('descripcion', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                    placeholder="Descripción"
                                    rows={4}
                                />

                                {errors.descripcion && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.descripcion}
                                    </p>
                                )}

                            </div>


                            <div className="flex justify-end gap-2">

                                <button
                                    type="button"
                                    onClick={cerrarFormulario}
                                    className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                >
                                    {processing
                                        ? 'Guardando...'
                                        : 'Guardar'}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}
        </>
    );
}

Categorias.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
