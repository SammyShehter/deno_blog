/** @jsx h */
import { h } from "preact"
import { Post } from "../models/interfaces.ts";
import { DateStyle } from "../models/types.ts";
import { tw } from "twind";
import {Tags} from './tags.tsx'
import { PrettyDate } from "./pretty-date.tsx";

export function PostCard({
    post,
    dateStyle,
    lang,
}: {
    post: Post
    dateStyle?: DateStyle
    lang?: string
}) {
    return (
        <div class={tw`pt-12 first:pt-0`}>
            <h3 class={tw`text-2xl font-bold`}>
                <a class="" href={post.pathname}>
                    {post.title}
                </a>
            </h3>
            <Tags tags={post.tags} />
            <p class={tw`text-gray-500`}>
                {post.author && <span>By {post.author || ""} at </span>}
                <PrettyDate
                    date={post.publishDate}
                    dateStyle={dateStyle}
                    lang={lang}
                />
            </p>
            <p class={tw`mt-3 text-gray-600 dark:text-gray-400`}>
                {post.snippet}
            </p>
            <p class={tw`mt-3`}>
                <a
                    class={tw`leading-tight text-gray-900 dark:text-gray-100 inline-block border-b-1 border-gray-600 hover:text-gray-500 hover:border-gray-500 transition-colors`}
                    href={post.pathname}
                    title={`Read "${post.title}"`}
                >
                    Read More
                </a>
            </p>
        </div>
    )
}


