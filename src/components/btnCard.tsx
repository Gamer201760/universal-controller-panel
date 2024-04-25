import { createEffect, createSignal } from "solid-js"
import { IGPIOCard } from "../types"
import { useMQTT } from "../mqtt-hook"
import BaseCard from "./baseCard"

interface IBtnCardProps {
    obj: IGPIOCard
    onDelete(): void
}

export default function BtnCard(props: IBtnCardProps) {
    const [cli] = useMQTT()
    const [state, setState] = createSignal(false)

    createEffect(() => {
        cli.publish(props.obj.topic, JSON.stringify({
            pin: props.obj.pin,
            state: state()
        }))
    })

    return (
        <button onClick={() => setState(i => !i)}>
            <BaseCard onDel={props.onDelete} color={state() ? 'bg-green-500' : 'bg-red-500'}>
                <h1 class="text-4xl pb-1 select-none">{props.obj.title}</h1>
            </BaseCard>
        </button>
    )
}