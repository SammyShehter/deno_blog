/** @jsx h */
import { h } from "preact"
import { icons } from "../models/enums.ts"
import { Icon } from "../components/icon.tsx"

export const socialAppIcons: Map<string, h.JSX.Element> = new Map([
    ["email", <Icon iconSvg={icons.mail} />],
    ["github.com", <Icon iconSvg={icons.github} />],
    ["twitter.com", <Icon iconSvg={icons.twitter} />],
    ["instagram.com", <Icon iconSvg={icons.instagram} />],
    ["linkedin.com", <Icon iconSvg={icons.linkedIn} />],
    ["externalLink", <Icon iconSvg={icons.externalLink} />],
])
