import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { createStore } from "solid-js/store";
import EditCard from "./editCard";
import { TCard } from "../types";


export default function AddDialog() {

    return (
            <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-md w-full relative">
                    <button onClick={props.onHide} class="flex items-center justify-center min-w-5 h-5 font-bold bg-red-700 text-white text-center rounded-md hover:bg-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="relative flex items-center my-4">
                        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Add new</h1>
                        <select onChange={e => setData('state', e.target.value)} class="bg-gray-50 h-min-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="data">Data card</option>
                            <option value="btn">Btn card</option>
                            <option value="slider">Slider card</option>
                        </select>
                    </div>

                    <input onInput={e => setData("title", e.target.value)} required={true} class="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" />

                    <Show when={data.state == 'btn'}>
                        <input min={0} type="number" onInput={e => { setData("pin", Number(e.target.value)) }} required={true} class="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="pin" />
                    </Show>

                    <form onSubmit={e => { e.preventDefault(); setData('editState', true) }} class="relative flex items-center">
                        <input onInput={e => { setData("topic", e.target.value); setData('editState', false) }} required={true} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic" value={"controller/gpio"} />
                        <button hidden={data.state != 'data'} type="submit" class="ml-2 min-w-10 h-10 font-bold bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700">
                            Sub
                        </button>
                    </form>
                    <Show when={data.editState && data.state == 'data'}>
                        <EditCard onValues={(v) => setData('values', v)} topic={data.topic}></EditCard>
                    </Show>

                    <button onClick={add} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add</button>
                </div>
            </div>
    );
};
