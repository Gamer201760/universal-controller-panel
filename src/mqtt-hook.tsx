import mqtt, { MqttClient } from "mqtt";
import { fromEvent, Observable } from 'rxjs'
import { createSignal, createContext, useContext, ParentProps, createEffect, Show } from "solid-js";

const MQTTContext = createContext<TMQTTContext>();

interface IMQTTProps extends ParentProps {
    url: string
    username: string
    password: string
}

type TMQTTContext = [client: MqttClient, stream: Observable<mqtt.Packet>]

export function MQTTProvider(props: IMQTTProps) {
    const [client, _] = createSignal(mqtt.connect(props.url, {username: props.username, password: props.password}))
    const [connected, setConnected] = createSignal<boolean>(false)
    // @ts-ignore
    const stream$ = fromEvent<mqtt.Packet>(client(), 'message')
    
    
    createEffect(() => {
        if (client()) {
            client().on('connect', () => {
                console.log('Connected to', props.url)
                setConnected(true)
            })
            client().on('error', (e) => {
                console.log(e)
                setConnected(false)
            })
        }
    })

    return (
        <MQTTContext.Provider value={[client(), stream$]}>
            <Show when={connected()} fallback={<p>Connecting...</p>}>
                {props.children}
            </Show>
        </MQTTContext.Provider>
    );
}

//@ts-ignore
export function useMQTT(): TMQTTContext { return useContext(MQTTContext); }