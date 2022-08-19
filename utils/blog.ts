import {join ,relative} from "std/path/mod.ts"
import {walk} from "std/fs/walk.ts"
import {parse as frontMatter} from "front-matter"
import { POSTS } from "./vars.ts"
import { Post } from "../models/interfaces.ts"

export async function loadContent() {
    const postsDirectory = join("blog", "posts")
    for await (const entry of walk(postsDirectory)) {
        if (entry.isFile && entry.path.endsWith(".md")) {
            await loadPost(postsDirectory, entry.path)
        }
    }
}

async function loadPost(postsDirectory: string, path: string) {
    const contents = await Deno.readTextFile(path)
    let pathname = "/" + relative(postsDirectory, path)
    // Remove .md extension.
    pathname = pathname.slice(0, -3)
    const { content, data: _data } = frontMatter(contents) as {
        data: Record<string, string | string[] | Date>
        content: string
    }

    const data = recordGetter(_data)

    const post: Post = {
        title: data.get("title") ?? "Untitled",
        author: data.get("author"),
        pathname: data.get("pathname") ?? pathname,
        publishDate: data.get("publish_date")!,
        markdown: content,
        coverHtml: data.get("cover_html"),
        ogImage: data.get("og:image"),
        tags: data.get("tags"),
    }
    POSTS.set(pathname, post)
    console.log("Load: ", post.pathname)
}

export function preparePosts(posts: Map<string, Post>, searchParams: URLSearchParams, page: number): Array<Post>{
    const filteredPosts = filterPosts(posts, searchParams)
    const sortedPosts = sortPostsByDate(filteredPosts)
    return paginatedPosts(sortedPosts, page)
}

function paginatedPosts(sortedPosts: Post[], page: number) {
    const perPage = 5
    const postsAmount = sortedPosts.length
    const outOfRange = page*perPage >= postsAmount && postsAmount > (page - 1)*perPage
	const validRange = postsAmount > page * perPage
    
	if (outOfRange) {
		return sortedPosts.slice(perPage * (page - 1), postsAmount)
	}
    
    if (validRange) {
		return sortedPosts.slice(perPage * (page - 1), perPage*(page))
	}

    return sortedPosts.slice(0, perPage)
}

function filterPosts(posts: Map<string, Post>, searchParams: URLSearchParams): Map<string, Post> {
    const tag = searchParams.get("tag")
    if (!tag) {
        return posts
    }
    return new Map(
        Array.from(posts.entries()).filter(([, p]) => p.tags?.includes(tag))
    )
}

function sortPostsByDate(postsMap: Map<string, Post>) {
    const postIndex = [];
    for (const [_key, post] of postsMap.entries()) {
      postIndex.push(post);
    }
    return postIndex.sort(
      (a, b) => (b.publishDate?.getTime() ?? 0) - (a.publishDate?.getTime() ?? 0),
    );
  
}

function recordGetter(data: Record<string, unknown>) {
    return {
        get<T>(key: string): T | undefined {
            return data[key] as T
        },
    }
}










// export async function handler(req: Request, ctx: BlogContext) {
//     const { state: blogState } = ctx
//     let { pathname, searchParams } = new URL(req.url)
//     pathname = decodeURI(pathname)

//     const canonicalUrl = blogState.canonicalUrl || new URL(req.url).origin


//     if (pathname === "/") {
//         const page = searchParams.get("page") ?? 1
        
//         return html({
//             ...sharedHtmlOptions,
//             title: blogState.title ?? "My Blog",
//             meta: {
//                 description: blogState.description,
//                 "og:title": blogState.title,
//                 "og:description": blogState.description,
//                 "og:image": blogState.ogImage ?? blogState.cover,
//                 "twitter:title": blogState.title,
//                 "twitter:description": blogState.description,
//                 "twitter:image": blogState.ogImage ?? blogState.cover,
//                 "twitter:card": blogState.ogImage
//                     ? "summary_large_image"
//                     : undefined,
//             },
//             styles: [...(blogState.style ? [blogState.style] : [])],
//             body: (
//                 <Index
//                     state={blogState}
//                     posts={preparePosts(POSTS, searchParams, +page)}
//                     postsAmount={POSTS.size}
//                     currentPage = {+page}
//                 />
//             ),
//         })
//     }

//     const post = POSTS.get(pathname)
//     if (post) {
//         return html({
//             ...sharedHtmlOptions,
//             title: post.title,
//             meta: {
//                 description: post.snippet,
//                 "og:title": post.title,
//                 "og:description": post.snippet,
//                 "og:image": post.ogImage,
//                 "twitter:title": post.title,
//                 "twitter:description": post.snippet,
//                 "twitter:image": post.ogImage,
//                 "twitter:card": post.ogImage
//                     ? "summary_large_image"
//                     : undefined,
//             },
//             styles: [
//                 gfm.CSS,
//                 `.markdown-body { --color-canvas-default: transparent !important; --color-canvas-subtle: #edf0f2; --color-border-muted: rgba(128,128,128,0.2); } .markdown-body img + p { margin-top: 16px; }`,
//                 ...(blogState.style ? [blogState.style] : []),
//             ],
//             body: <PostPage post={post} state={blogState} />,
//         })
//     }

//     let fsRoot = blogState.directory
//     try {
//         await Deno.lstat(join(blogState.directory, "./posts", pathname))
//         fsRoot = join(blogState.directory, "./posts")
//     } catch (e) {
//         if (!(e instanceof Deno.errors.NotFound)) {
//             console.error(e)
//             return new Response(e.message, { status: 500 })
//         }
//     }

//     return serveDir(req, { fsRoot })
// }