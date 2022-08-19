/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { tw } from "twind";
import { parse as frontMatter } from "front-matter";
import { Footer } from "../components/footer.tsx"
import { state } from "./index.tsx"
import * as gfm from "https://deno.land/x/gfm@0.1.22/mod.ts";
import { PrettyDate } from "../components/pretty-date.tsx";
import { Tags } from "../components/tags.tsx";

function recordGetter(data: Record<string, unknown>) {
  return {
      get<T>(key: string): T | undefined {
          return data[key] as T
      },
  }
}

export interface Post {
  pathname: string;
  markdown: string;
  title: string;
  publishDate: Date;
  author?: string;
  snippet?: string;
  coverHtml?: string;
  /** An image URL which is used in the OpenGraph og:image tag. */
  ogImage?: string;
  tags?: string[];
}


export function PostPage(props: PageProps) {
  const postRaw = 
`
---
title: Hello World
publish_date: 2022-07-21
abstract: This is the first post.
---

Wrote my (unfortunate) [blog](https://github.com/SammyShehter/blogue_v3) until I found [this](https://deno.land/x/blog) solution.
I think I'll explore this repository and try to contribute to in it.
Contacted one of the participants, I hope my contribution will be useful.
In general, Deno pleasantly surprised.

<img src="media/hello_world/1.jpg"/>

Other news -
I bought a standing table. kewl.


What I like the most is that it uses .md markup
I can definitely adapt it to my needs

`
  // const postName = props.params.name
  const { content, data: _data } = frontMatter(postRaw) as {
    data: Record<string, string | string[] | Date>
    content: string
}
const data = recordGetter(_data)

const post: Post = {
title: data.get("title") ?? "Untitled",
author: data.get("author"),
pathname: data.get("pathname") || "default route",
publishDate: data.get("publish_date")!,
markdown: content,
coverHtml: data.get("cover_html"),
ogImage: data.get("og:image"),
tags: data.get("tags"),
}
  const html = gfm.render(post.markdown)
  return (
    <div class={`post ${post.pathname.substring(1)}`}>
      {/* {state.showHeaderOnPostPage && state.header} */}
      <div class={tw`max-w-screen-sm px-6 pt-8 mx-auto`}>
        <div class={tw`pb-16`}>
          <a
            href="/"
            class={tw`inline-flex items-center gap-1 text-sm text-gray-500/80 hover:text-gray-700 transition-color`}
            title="Back to Index Page"
          >
            <svg
              className="inline-block w-5 h-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.91675 14.4167L3.08341 10.5833C3.00008 10.5 2.94119 10.4097 2.90675 10.3125C2.87175 10.2153 2.85425 10.1111 2.85425 10C2.85425 9.88889 2.87175 9.78472 2.90675 9.6875C2.94119 9.59028 3.00008 9.5 3.08341 9.41667L6.93758 5.5625C7.09036 5.40972 7.27786 5.33334 7.50008 5.33334C7.7223 5.33334 7.91675 5.41667 8.08341 5.58334C8.23619 5.73611 8.31258 5.93056 8.31258 6.16667C8.31258 6.40278 8.23619 6.59722 8.08341 6.75L5.66675 9.16667H16.6667C16.9029 9.16667 17.1006 9.24639 17.2601 9.40584C17.4201 9.56584 17.5001 9.76389 17.5001 10C17.5001 10.2361 17.4201 10.4339 17.2601 10.5933C17.1006 10.7533 16.9029 10.8333 16.6667 10.8333H5.66675L8.10425 13.2708C8.25703 13.4236 8.33341 13.6111 8.33341 13.8333C8.33341 14.0556 8.25008 14.25 8.08341 14.4167C7.93064 14.5694 7.73619 14.6458 7.50008 14.6458C7.26397 14.6458 7.06953 14.5694 6.91675 14.4167Z"
                fill="currentColor"
              />
            </svg>
            INDEX
          </a>
        </div>
        <article>
          <h1 class={tw`text-4xl text-gray-900 dark:text-gray-100 font-bold`}>
            {post.title}
          </h1>
          <Tags tags={post.tags} />
          <p class={tw`mt-1 text-gray-500`}>
            {(post.author || state.author) && (
              <span>By {post.author || state.author} at{" "}</span>
            )}
            <PrettyDate
              date={post.publishDate}
              lang={state.lang}
            />
          </p>
          <div
            class={tw`mt-8 markdown-bod`}
            data-color-mode={state.theme ?? "auto"}
            data-light-theme="light"
            data-dark-theme="dark"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        {/* {state.section} */}

        <Footer author={state.author} />
      </div>
    </div>
  );
}