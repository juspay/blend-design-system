import { Router, type IRouter, type Request, type Response } from 'express'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import { listGoogleFonts } from './google-fonts.service.js'

const router: IRouter = Router()

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const sort = req.query.sort as
            | 'alpha'
            | 'date'
            | 'popularity'
            | 'style'
            | 'trending'
            | undefined

        try {
            const fonts = await listGoogleFonts({ sort })
            return res.json({
                success: true,
                data: { fonts, total: fonts.length },
            })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Unknown error'

            if (message.includes('GOOGLE_FONTS_API_KEY')) {
                return res.status(503).json({
                    success: false,
                    error: {
                        code: 'GOOGLE_FONTS_NOT_CONFIGURED',
                        message:
                            'Google Fonts API key is not configured on the server',
                    },
                })
            }

            throw error
        }
    })
)

export default router
