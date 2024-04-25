import { createSignal, For, Show } from "solid-js"
import { useStorage } from "../storage"
import { checkDataCard, checkSliderCard, IDataCard, IGPIOCard, ISliderCard } from "../types"
import DataCard from "./dataCard"
import BtnCard from "./btnCard"
import AddDialog from "./addDialog"
import AddCard from "./addCard"
import SliderCard from "./sliderCard"


export default function Cards() {
    const [hidden, setHidden] = createSignal(false)
    const [cards, actions] = useStorage()

    const check = (obj: any, index: number) => {
        if (checkDataCard(obj)) return <DataCard obj={obj as IDataCard} onDelete={() => actions.delCard(index)}></DataCard>
        if (checkSliderCard(obj)) return <SliderCard obj={obj as ISliderCard} onDelete={() => actions.delCard(index)}></SliderCard>
        return <BtnCard obj={obj as IGPIOCard} onDelete={() => actions.delCard(index)}></BtnCard>
    }

    return (
        <>
            <Show when={hidden()}><AddDialog onHide={() => setHidden(false)} onAdd={obj => actions.addCard(obj)} /></Show>
            <div class='grid grid-cols-auto-190'>
                <For each={cards}>{(card, index) =>
                    // @ts-ignore
                    <Dynamic component={check(card, index())}></Dynamic>
                }
                </For>
                <button onClick={() => setHidden(true)}><AddCard /></button>
            </div>
        </>
    )
}
