
export type TCard = ICard | IDataCard | IGPIOCard | ISliderCard

interface ICard {
    title: string
    topic: string
}

export interface IDataCard extends ICard {
    values: string[]
}

export interface IGPIOCard extends ICard {
    pin: number
}

export interface ISliderCard extends IGPIOCard {
    channel: number
    maxVoltage?: number
}

function checkCard(obj: any): obj is ICard {
    return 'title' in obj && 'topic' in obj
}

export function checkDataCard(obj: any): obj is IDataCard {
    return 'values' in obj && checkCard(obj)
}

export function checkGPIOCard(obj: any): obj is IGPIOCard {
    return 'pin' in obj && checkCard(obj)
}

export function checkSliderCard(obj: any): obj is ISliderCard {
    return 'channel' in obj && checkGPIOCard(obj)
}
