import path from 'path'
import scanDirectory from './scan'

const getDirItems = (dirPath: string) => {
    const items = scanDirectory(path.join(process.cwd(), dirPath))
    return items
}

export default getDirItems
