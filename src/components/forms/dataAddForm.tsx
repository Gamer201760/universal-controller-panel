import { createEffect, createSignal, Show } from "solid-js"
import { createStore } from "solid-js/store"
import EditCard from "../editCard"
import { IDataCard, TCard } from "../../types"


interface IProps {
    onData(obj: TCard): void
}

export default function DataAddForm(props: IProps) {
    const [data, setData] = createStore<IDataCard>({
        topic: "controller/gpio",
        title: "",
        values: []
    })
    const [edit, setEdit] = createSignal(false)
    createEffect(() => props.onData(data))

    return (
        <>
            <form onSubmit={e => { e.preventDefault(); setEdit(true) }}>
                <input onInput={e => setData("title", e.target.value)} required={true} class="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" />
                <div class="relative flex items-center">
                    <input onInput={e => { setData("topic", e.target.value); setEdit(false) }} required={true} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic" value={data.topic} />
                    <button type="submit" class="ml-2 min-w-10 h-10 font-bold bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700">
                        Sub
                    </button>
                </div>
            </form>
            <Show when={edit()}>
                <EditCard onValues={v => setData('values', v)} topic={data.topic}></EditCard>
            </Show>
        </>
    )
}