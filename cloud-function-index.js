import functions from '@google-cloud/functions-framework'

// Simple liveness endpoint (audit #4, CWE-79): static payload only — no
// request-parameter reflection, no wildcard CORS, explicit content type
// and nosniff.
functions.http('ping', (req, res) => {
    if (req.method === 'OPTIONS') {
        res.status(204).send('')
        return
    }

    res.set('Content-Type', 'text/plain; charset=utf-8')
    res.set('X-Content-Type-Options', 'nosniff')
    res.status(200).send('Hello World!')
})
