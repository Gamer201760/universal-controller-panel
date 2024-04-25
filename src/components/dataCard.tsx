import { For, Show } from "solid-js"
import { IDataCard } from "../types"
import useSubscribe from "../sub"
import BaseCard from "./baseCard"

interface IDataCardProps {
    obj: IDataCard,
    onDelete(): void
}

export default function DataCard(props: IDataCardProps) {
    const [data, unSub] = useSubscribe<object>(props.obj.topic)

    const del = () => {
        unSub()
        props.onDelete()
    }

    return (
        <BaseCard onDel={del}>
            <Show when={data() !== undefined} fallback={
                <h1 class="text-4xl pb-1">Waiting...</h1>
            }>
                <h1 class='text-4xl pb-1'>{props.obj.title}</h1>
                <For each={props.obj.values}>{(key, _) =>
                    // @ts-ignore
                    <h3 class='text-3xl'>{key}: {data()[key]}</h3>
                }</For>
            </Show>
        </BaseCard>
    )
}