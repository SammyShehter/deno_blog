/** @jsx h */
import { h } from "preact"
import { tw } from "twind";

export function Tags({ tags }: { tags?: string[] }) {
    return tags && tags.length > 0 ? (
        <section class={tw`flex gap-x-2 flex-wrap`}>
            {tags?.map(tag => (
                <a
                    class={tw`text-bluegray-500 font-bold`}
                    href={`/?tag=${tag}`}
                >
                    #{tag}
                </a>
            ))}
        </section>
    ) : null
}