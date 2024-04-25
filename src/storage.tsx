import { createContext, useContext, ParentProps } from "solid-js";
import { createLocalStore, removeIndex } from "./utils";
import { TCard } from "./types";


type TStorageContext = [
    cards: TCard[],
    {
        addCard: (obj: TCard) => void,
        delCard: (index: number) => void
    }
]

const StorageContext = createContext<TStorageContext>([
    [],
    {
        addCard: () => undefined,
        delCard: () => undefined
    }
]);

export function StorageProvider(props: ParentProps) {
    const [cards, setCards] = createLocalStore<TCard[]>('cards', [])

    const addCard = (obj: TCard) => setCards(cards.length, obj)
    const delCard = (index: number) => setCards(i => removeIndex(i, index))
    
    return (
        <StorageContext.Provider value={[cards, {addCard, delCard}]}>
            {props.children}
        </StorageContext.Provider>
    );
}

export function useStorage() { return useContext(StorageContext); }