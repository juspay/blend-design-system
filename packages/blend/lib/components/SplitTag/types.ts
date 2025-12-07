import { TagProps, TagShape, TagSize } from '../Tags'

export type SplitTagProps = {
    primaryTag: Omit<TagProps, 'splitTagPosition' | 'size' | 'shape'>
    secondaryTag?: Omit<TagProps, 'splitTagPosition' | 'size' | 'shape'>
    size?: TagSize
    shape?: TagShape
}
