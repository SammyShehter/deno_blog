/** @jsx h */
import { h } from "preact"
import { tw } from "twind";
import { DateStyle } from "../models/types.ts";

export function PrettyDate({
    date,
    dateStyle,
    lang,
}: {
    date: Date
    dateStyle?: DateStyle
    lang?: string
}) {
    const formatted = date.toLocaleDateString(lang ?? "en-US", { dateStyle })
    return <time dateTime={date.toISOString()}>{formatted}</time>
}