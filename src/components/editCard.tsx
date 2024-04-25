import { createEffect, createSignal, For } from "solid-js";
import useSubscribe from "../sub";
import { removeIndex } from "../utils";

interface IEditCardProps {
    topic: string
    onValues(values: string[]): void
}

export default function EditCard(props: IEditCardProps) {
    const [data, unSub] = useSubscribe<object>(props.topic, true)
    const [values, setValues] = createSignal<string[]>([])

    createEffect(() => setValues(Object.keys(data())))
    createEffect(() => props.onValues(values()))

    setTimeout(() => { if (values().length === 0) unSub() }, 10000)

    return (
        <For each={values()} fallback={<p>Нет данных</p>}>{(item, index) =>
            <div class="relative pt-4 flex items-center">
                {/* @ts-ignore */}
                <p>{item}: {data()[item]}</p>
                {/* @ts-ignore */}
                <button onClick={() => setValues(i => removeIndex(i, index()))} class="ml-2 min-w-10 h-10 font-bold bg-red-600 text-white text-center rounded-lg hover:bg-red-700">
                    -
                </button>
            </div>
        }</For>
    )
}