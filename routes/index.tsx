/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts"
import { h } from "preact"
import { BlogSettings, IndexProps } from "../models/interfaces.ts"

import { preparePosts } from "../utils/blog.ts"
import { tw } from "@twind"
import { POSTS } from "../utils/vars.ts"
import { PostCard } from "../components/post-card.tsx"
import { Pagination } from "../components/pagination.tsx"
import { Footer } from "../components/footer.tsx"
import { socialAppIcons } from "../utils/social-icons.tsx"
import { Tooltip } from "../components/tooltip.tsx"

export const handler: Handlers<IndexProps> = {
    GET(req, ctx) {
        const { searchParams } = new URL(req.url)
        const page = searchParams.get("page") ?? 1
        const indexProps: IndexProps = {
            posts: preparePosts(POSTS, searchParams, +page),
            postsAmount: POSTS.size,
            currentPage: +page,
        }

        return ctx.render(indexProps)
    },
}

export const state: BlogSettings = {
    author: "Sammy",
    title: "Sammy Shehter",
    description: "@sammyshehter",
    avatar: "https://avatars.githubusercontent.com/u/51539466?s=400&u=d75fa91b0939920239d7fc65be539e967669c0c2&v=4",
    avatarClass: "rounded-full",
    theme: "dark",
    links: [
        { title: "Email", url: "mailto:sammyshehter@gmail.com" },
        { title: "GitHub", url: "https://github.com/SammyShehter" },
        { title: "Twitter", url: "https://twitter.com/sammyshehter" },
    ],
} //Maybe change to dynamic?

export default function Index(props: PageProps<IndexProps>) {
    let { posts, postsAmount, currentPage } = props.data
    const perPage = 5
    currentPage = +currentPage ?? 1
    const pagesAmount = Math.round(postsAmount / perPage)
    return (
        <div class={tw`dark:bg-black`}>
                {
                    <header
                        class={tw`w-full h-80 lt-sm:h-80 bg-cover bg-center bg-no-repeat`}
                    >
                        <div
                            class={tw`max-w-screen-sm h-full px-6 mx-auto flex flex-col items-center justify-center`}
                        >
                            <a
                                href="/"
                                class={tw`bg-cover bg-center bg-no-repeat w-24 h-24 border-4 border-white rounded-full`}
                                style={{
                                    backgroundImage: `url(${state.avatar})`,
                                }}
                            />

                            <h1
                                class={tw`mt-3 text-4xl text-gray-900 dark:text-gray-100 font-bold`}
                                style={{ color: state.coverTextColor }}
                            >
                                {state.title}
                            </h1>
                            {state.description && (
                                <p
                                    class={tw`text-lg text-gray-600 dark:text-gray-400`}
                                    style={{ color: state.coverTextColor }}
                                >
                                    {state.description}
                                </p>
                            )}
                            {state.links && (
                                <nav class={tw`mt-3 flex gap-2`}>
                                    {state.links.map(link => {
                                        const url = new URL(link.url)
                                        let iconRender =
                                            socialAppIcons.get("externalLink")
                                        if (url.protocol === "mailto:") {
                                            iconRender =
                                                socialAppIcons.get("email")
                                        } else {
                                            const icon = socialAppIcons.get(
                                                url.hostname.replace(
                                                    /^www\./,
                                                    ""
                                                )
                                            )
                                            if (icon) {
                                                iconRender = icon
                                            }
                                        }

                                        return (
                                            <a
                                                class={tw`relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-600 hover:bg-gray-400 hover:text-black dark:hover:text-white transition-colors group`}
                                                href={link.url}
                                                rel={
                                                    link.target === "_blank"
                                                        ? "noopener noreferrer"
                                                        : ""
                                                }
                                                target={link.target ?? "_self"}
                                            >
                                                {iconRender}
                                                <Tooltip>{link.title}</Tooltip>
                                            </a>
                                        )
                                    })}
                                </nav>
                            )}
                        </div>
                    </header>
                }

                <div class={tw`max-w-screen-sm px-6 mx-auto`}>
                    <div
                        class={tw`pt-16 lt-sm:pt-12 border-t-1 border-gray-300`}
                    >
                        {posts.map(post => (
                            <PostCard
                                post={post}
                                key={post.pathname}
                                lang={state.lang}
                            />
                        ))}
                    </div>
                    {<Pagination
                        currentPage={currentPage}
                        pagesAmount={pagesAmount}
                    />}
                    <Footer author={state.author} />
                </div>
            </div>
    )
}
