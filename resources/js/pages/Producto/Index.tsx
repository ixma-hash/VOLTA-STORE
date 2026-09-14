
import { Head, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { pdf } from '@/routes/productos';
import { useState } from 'react';

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    fecha_vencimiento: string | null;
    categoria_id: number;
    categoria?: Categoria;
}

export default function Productos({ productos, categorias }: { productos: Producto[]; categorias: Categoria[] }) {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditar, setProductoEditar] = useState<Producto | null>(null);

    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        fecha_vencimiento: '',
        categoria_id: '',
    });

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
        setProductoEditar(null);
        reset();
    };

    const guardarProducto = (e: React.FormEvent) => {
        e.preventDefault();

        if (productoEditar) {
            put(`/productos/${productoEditar.id}`, {
                onSuccess: () => {
                    cerrarFormulario();
                },
            });
        } else {
            post('/productos', {
                onSuccess: () => {
                    cerrarFormulario();
                },
            });
        }
    };

    const editarProducto = (producto: Producto) => {
        setProductoEditar(producto);

        setData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: String(producto.precio),
            stock: String(producto.stock),
            fecha_vencimiento: producto.fecha_vencimiento || '',
            categoria_id: String(producto.categoria_id),
        });

        setMostrarFormulario(true);
    };

    const eliminarProducto = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            destroy(`/productos/${id}`);
        }
    };

    return (
        <>
            <Head title="Productos" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <a
                        href={pdf().url}
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
                        + Nuevo producto
                    </button>

                    <table>
                        <thead>
                            <tr>
                                <th className="p-4">Id</th>
                                <th className="p-4">Producto</th>
                                <th className="p-4">Descripción</th>
                                <th className="p-4">Precio</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Fecha de Vencimiento</th>
                                <th className="p-4">Categoría</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>

                                    <td className="p-4">
                                        {producto.id}
                                    </td>

                                    <td className="p-4">
                                        {producto.nombre}
                                    </td>

                                    <td className="p-4">
                                        {producto.descripcion}
                                    </td>

                                    <td className="p-4">
                                        {producto.precio}
                                    </td>

                                    <td className="p-4">
                                        {producto.stock}
                                    </td>

                                    <td className="p-4">
                                        {producto.fecha_vencimiento}
                                    </td>

                                    <td className="p-4">
                                        {producto.categoria?.nombre ?? producto.categoria_id}
                                    </td>

                                    <td className="p-4">

                                        <button
                                            type="button"
                                            onClick={() => editarProducto(producto)}
                                            className="mr-2 rounded-lg bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => eliminarProducto(producto.id)}
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
                                {productoEditar
                                    ? 'Editar producto'
                                    : 'Nuevo producto'}
                            </h2>

                            <button
                                type="button"
                                onClick={cerrarFormulario}
                                className="text-xl text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>

                        <form onSubmit={guardarProducto}>

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
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block">
                                    Descripción
                                </label>

                                <textarea
                                    value={data.descripcion}
                                    onChange={(e) =>
                                        setData('descripcion', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block">
                                    Precio
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.precio}
                                    onChange={(e) =>
                                        setData('precio', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData('stock', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block">
                                    Fecha de vencimiento
                                </label>

                                <input
                                    type="date"
                                    value={data.fecha_vencimiento}
                                    onChange={(e) =>
                                        setData('fecha_vencimiento', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="mb-2 block">
                                    Categoría
                                </label>

                                <select
                                    value={data.categoria_id}
                                    onChange={(e) =>
                                        setData('categoria_id', e.target.value)
                                    }
                                    className="w-full rounded-lg border p-2 dark:bg-gray-800"
                                >
                                    <option value="">
                                        Seleccionar categoría
                                    </option>

                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
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

Productos.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

