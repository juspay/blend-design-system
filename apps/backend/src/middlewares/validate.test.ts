import { beforeEach, describe, expect, it } from 'vitest'
import express, { type Express } from 'express'
import request from 'supertest'
import { z } from 'zod'

import { validate } from './validate.js'

describe('validate middleware (rescan round-2, CWE-20)', () => {
    let app: Express
    let captured: { params?: unknown; query?: unknown; body?: unknown }

    beforeEach(() => {
        captured = {}
        app = express()
        app.use(express.json())
    })

    it('writes parsed params back so handlers receive coerced values', async () => {
        app.get(
            '/items/:id',
            validate({
                params: z.object({
                    id: z.string().transform((value) => value.trim()),
                }),
            }),
            (req, res) => {
                captured.params = req.params
                res.json({ ok: true })
            }
        )

        const res = await request(app).get('/items/abc')

        expect(res.status).toBe(200)
        expect(captured.params).toEqual({ id: 'abc' })
    })

    it('applies schema transformations to params, not just validation', async () => {
        app.get(
            '/items/:id',
            validate({
                params: z.object({
                    id: z.coerce.number().int(),
                }),
            }),
            (req, res) => {
                captured.params = req.params
                res.json({ ok: true })
            }
        )

        const res = await request(app).get('/items/42')

        expect(res.status).toBe(200)
        expect(captured.params).toEqual({ id: 42 })
    })

    it('rejects params that fail the schema', async () => {
        app.get(
            '/items/:id',
            validate({
                params: z.object({
                    id: z.string().uuid(),
                }),
            }),
            (req, res) => {
                captured.params = req.params
                res.json({ ok: true })
            }
        )

        const res = await request(app).get('/items/not-a-uuid')

        expect(res.status).toBe(400)
        expect(res.body.error.details).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ field: 'params.id' }),
            ])
        )
        expect(captured.params).toBeUndefined()
    })
})
