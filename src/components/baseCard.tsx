import { createSignal, ParentProps } from "solid-js"

interface IProps extends ParentProps {
    onDel: () => void
    color?: string
}

export default function BaseCard(props: IProps) {
    const [trash, setTrash] = createSignal(true)

    return (
        <div onMouseLeave={() => setTrash(true)} onMouseEnter={() => setTrash(false)} class={`relative flex flex-col items-center justify-center ${props.color ? props.color : "bg-slate-700"} m-4 p-1 border border-none rounded text-white w-10/12 min-h-24 font-bold font-mono`}>
            <span onClick={props.onDel} hidden={trash()} class="absolute top-0 right-0 pt-1 pr-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0,0,256,256">
                    <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10.80664,2c-0.517,0 -1.01095,0.20431 -1.37695,0.57031l-0.42969,0.42969h-5c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h16c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5l-0.42969,-0.42969c-0.365,-0.366 -0.85995,-0.57031 -1.37695,-0.57031zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path></g></g>
                </svg>
            </span>
            {props.children}
        </div>
    )
}