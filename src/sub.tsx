
import { createEffect, createSignal } from "solid-js";
import { useMQTT } from "./mqtt-hook";
import { filter, map, first } from 'rxjs'


export default function useSubscribe<T>(topic: string, firstFlag: boolean = false) {
    const [cli, stream] = useMQTT()
    const [data, setData] = createSignal<T>({} as T)
    
    let stream$ = stream
    .pipe(
            // tap(([_, v]) => console.log(v.toString())),
            // @ts-expect-error
            filter(([t]) => t === topic),
            map(([_, v]) => JSON.parse(v.toString()) as T),
        )

    if (firstFlag) {
        stream$ = stream
        .pipe(
            // tap(([_, v]) => console.log(v.toString())),
            first(([t]) => t === topic),
            map(([_, v]) => JSON.parse(v.toString()) as T),
        )
    } 

    const sub$ = stream$.subscribe({
        next: (v) => {
            setData(() => v)
        },
        complete: () => {
            cli.unsubscribe(topic)
        }
    })

    const unSub = () => sub$.unsubscribe()

    createEffect(() => {
        cli.subscribe(topic)
    })

    return [data, unSub] as const
}
