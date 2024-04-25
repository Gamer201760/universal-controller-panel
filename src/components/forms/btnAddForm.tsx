import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import { IGPIOCard, TCard } from "../../types"


interface IProps {
    onData(obj: TCard): void
}

export default function BtnAddForm(props: IProps) {
    const [data, setData] = createStore<IGPIOCard>({
        topic: "controller/gpio/ctr",
        title: "",
        pin: 0
    })
    createEffect(() => props.onData(data))

    return (
        <>
            <input onInput={e => setData("title", e.target.value)} required={true} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" />
            <input onInput={e => setData("topic", e.target.value)} required={true} class="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic" value={data.topic} />
            <input min={0} type="number" onInput={e => { setData("pin", parseInt(e.target.value)) }} required={true} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="pin" />
        </>
    )
}