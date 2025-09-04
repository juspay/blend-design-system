import { redirect } from 'next/navigation'

const page = () => {
    // Redirect /docs to /docs/getting-started
    redirect('/docs/getting-started')
}

export default page
