/** @jsx h */
import { h } from "preact"
import { DirectionProps, PaginationPageProps, PaginationProps } from "../models/interfaces.ts";
import { tw } from "twind";

export function Pagination({ currentPage, pagesAmount }: PaginationProps) {
    function preparePagPages(pagesAmount: number) {
        const pages = []
        for (let current = 1; current < pagesAmount; current++) {
            if (pagesAmount < 7) {
                pages.push(
                    <PaginationPage
                        pageNumber={current}
                        disable={current === currentPage}
                    />
                )
                continue
            }

            const firstThird = current <= 3
            const lastTwo = current >= pagesAmount - 2

            if (current === Math.floor(pagesAmount / 2)) {
                pages.push(
                    <span
                        class={tw`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700`}
                    >
                        {" "}
                        ...{" "}
                    </span>
                )
                continue
            }
            if (firstThird || lastTwo) {
                pages.push(
                    <PaginationPage
                        pageNumber={current}
                        disable={current === currentPage}
                    />
                )
            }
            continue
        }
        return pages
    }
    return (
        <div class={tw`flex mx-auto max-w-screen-sm pt-12`}>
            <nav
                class={tw`inline-flex rounded-md shadow-sm mx-auto`}
                aria-label="Pagination"
            >
                <Direction way="Previous" page={currentPage - 1} limit={0} />
                {preparePagPages(pagesAmount)}
                <Direction
                    way="Next"
                    page={currentPage + 1}
                    limit={pagesAmount}
                />
            </nav>
        </div>
    )
}

function PaginationPage({ pageNumber, disable }: PaginationPageProps) {
    return (
        <a
            href={`?page=${pageNumber}`}
            class={
                `${
                    disable
                        ? tw`pointer-events-none bg-indigo-50 border-indigo-500 text-indigo-600 `
                        : tw`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 `
                }` +
                tw`relative inline-flex items-center px-4 py-2 border text-sm font-medium`
            }
        >
            {" "}
            {pageNumber}{" "}
        </a>
    )
}



function Direction({ way, page, limit }: DirectionProps) {
    return (
        <a
            href={`?page=${page}`}
            class={
                `${
                    limit >= page && limit <= page
                        ? tw`pointer-events-none `
                        : ""
                }${way === "Next" ? tw`rounded-r-md ` : tw`rounded-l-md `}` +
                tw`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`
            }
        >
            <span class={tw`sr-only`}>{way}</span>
            <svg
                class={tw`h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d={
                        way === "Next"
                            ? "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            : "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    }
                    clip-rule="evenodd"
                />
            </svg>
        </a>
    )
}
