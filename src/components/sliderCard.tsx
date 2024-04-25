import { createEffect, createSignal } from 'solid-js';
import BaseCard from './baseCard';
import { useMQTT } from '../mqtt-hook';
import { ISliderCard } from '../types';

interface ISliderCardProps {
    obj: ISliderCard
    onDelete(): void
}

export default function SliderCard(props: ISliderCardProps) {
    const [sliderValue, setSliderValue] = createSignal(0);
    const [cli] = useMQTT()

    createEffect(() => cli.publish(props.obj.topic, JSON.stringify({
        pin: props.obj.pin,
        duty: sliderValue(),
        channel: props.obj.channel
    })))

    return (
        <BaseCard onDel={props.onDelete}>
            <h1 class='text-3xl'>{props.obj.title}</h1>
            <input
                type="range"
                min="0"
                max="2048"
                value={sliderValue()}
                onInput={e => setSliderValue(parseInt(e.target.value))}
                class="w-11/12 range [--fallback-bc:#CECFC7] range-primary"
            />
            <span class="my-2">
                {Math.round(((props.obj.maxVoltage ? props.obj.maxVoltage : 3.284) * sliderValue()) / 2048 * 100) / 100}V
            </span>
        </BaseCard>
    );
};
