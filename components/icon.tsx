/** @jsx h */
import { h } from "preact"
import {icons} from "../models/enums.ts"
import { tw } from "@twind"
export function Icon({iconSvg}: {iconSvg: icons}) {
    return (
        <svg
            class={tw`inline-block w-5 h-5`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d={iconSvg}
                fill="currentColor"
            />
        </svg>
    )
}
