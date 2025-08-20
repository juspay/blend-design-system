import path from 'path'
import { scanDirectory } from '@/docs/utils'

const getDirItems = (dirPath: string) => {
    const items = scanDirectory(path.join(process.cwd(), dirPath))
    return items
}

export default getDirItems
