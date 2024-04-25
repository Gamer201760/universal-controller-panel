import { createSignal } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { TCard } from "../types";
import DataAddForm from "./forms/dataAddForm";
import BtnAddForm from "./forms/btnAddForm";
import SliderAddForm from "./forms/sliderAddForm";


interface IAddDialogProps {
    onHide(): void
    onAdd(obj: TCard): void
}

const options = {
    data: DataAddForm,
    btn: BtnAddForm,
    slider: SliderAddForm,
}

export default function AddDialog(props: IAddDialogProps) {
    const [data, setData] = createSignal<TCard>({
        title: "",
        topic: ""
    })
    const [cardType, setCardType] = createSignal<"data" | "btn" | "slider">("data")

    const add = (e: Event) => {
        e.preventDefault()
        props.onAdd(data())
        props.onHide()
    }

    return (
        <Portal>
            <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-md w-full relative">
                    <button onClick={props.onHide} class="flex items-center justify-center min-w-5 h-5 font-bold bg-red-700 text-white text-center rounded-md hover:bg-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="relative flex items-center my-4">
                        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Add new</h1>
                        { /* @ts-ignore */}
                        <select onChange={e => setCardType(e.target.value)} class="bg-gray-50 h-min-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="data">Data card</option>
                            <option value="btn">Btn card</option>
                            <option value="slider">Slider card</option>
                        </select>
                    </div>
                    <form onSubmit={add}>
                        { /* @ts-ignore */}
                        <Dynamic component={options[cardType()]} onData={d => setData(d)}></Dynamic>
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add</button>
                    </form>
                </div>
            </div>
        </Portal>
    );
};
