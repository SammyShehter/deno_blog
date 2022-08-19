/** @jsx h */
import { h } from "preact"
import { tw } from "twind"

export function Footer(props: { author?: string }) {
    return (
        <footer class={tw`mt-20 pb-16 lt-sm:pb-8 lt-sm:mt-16`}>
            <p
                class={tw`flex items-center gap-2.5 text-gray-400 dark:text-gray-500 text-sm`}
            >
                <span>
                    &copy; {new Date().getFullYear()} {props.author} &middot;
                </span>
                <a
                    href="/feed"
                    class={tw`inline-flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors`}
                    title="Atom Feed"
                >
                    <IconRssFeed /> RSS
                </a>
            </p>
        </footer>
    )
}

function IconRssFeed() {
    return (
        <svg
            class={tw`inline-block w-4 h-4`}
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
            <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
    )
}