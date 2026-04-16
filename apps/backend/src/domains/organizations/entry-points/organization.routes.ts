import { Router, type IRouter, type Request, type Response } from 'express'
import { authenticate, requireRole } from '@/middlewares/auth.js'
import { asyncHandler } from '@/middlewares/errorHandler.js'
import {
    validate,
    createOrgSchema,
    updateOrgSchema,
    addMemberSchema,
    updateMemberRoleSchema,
} from '@/middlewares/validate.js'
import * as orgRepo from '../data-access/organization.repository.js'
import * as auditLogRepo from '@/domains/audit/data-access/auditlog.repository.js'

const router: IRouter = Router()

// ---------------------------------------------------------------------------
// List Organizations (admin only)
// ---------------------------------------------------------------------------
router.get(
    '/',
    authenticate,
    requireRole('admin'),
    asyncHandler(async (req: Request, res: Response) => {
        const { organizations, nextCursor } = await orgRepo.listOrganizations({
            limit: parseInt(req.query.limit as string) || 20,
            cursor: req.query.cursor as string,
        })
        res.json({ success: true, data: { organizations, nextCursor } })
    })
)

// ---------------------------------------------------------------------------
// Get Organization by ID
// ---------------------------------------------------------------------------
router.get(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const org = await orgRepo.getOrganizationById(req.params.id)
        if (!org) {
            res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Organization not found' },
            })
            return
        }
        res.json({ success: true, data: { organization: org } })
    })
)

// ---------------------------------------------------------------------------
// Create Organization (admin only)
// ---------------------------------------------------------------------------
router.post(
    '/',
    authenticate,
    requireRole('admin'),
    validate({ body: createOrgSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const org = await orgRepo.createOrganization({
            name: req.body.name,
            slug: req.body.slug,
        })
        res.status(201).json({ success: true, data: { organization: org } })
    })
)

// ---------------------------------------------------------------------------
// Self-Service Org Creation (onboarding)
//
// Any authenticated user who is NOT yet in an org can create one.
// They automatically become the org admin. This enables smooth onboarding
// without needing a superadmin to manually create orgs for new users.
// ---------------------------------------------------------------------------
router.post(
    '/onboarding',
    authenticate,
    validate({ body: createOrgSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        // Check if user is already a member of an organization
        const existingOrgs = await orgRepo.getMemberOrganizations(req.user!.id)
        if (existingOrgs.length > 0) {
            res.status(409).json({
                success: false,
                error: {
                    code: 'ALREADY_IN_ORG',
                    message:
                        'You are already a member of an organization. Use the admin panel to create additional orgs.',
                },
            })
            return
        }

        // Create the org and add the user as admin
        const org = await orgRepo.createOrganization({
            name: req.body.name,
            slug: req.body.slug,
        })

        await orgRepo.addMember({
            organizationId: org.id,
            userId: req.user!.id,
            role: 'admin',
        })

        res.status(201).json({
            success: true,
            data: {
                organization: org,
                message: 'Organization created. You are now the admin.',
            },
        })
    })
)

// ---------------------------------------------------------------------------
// Update Organization
// ---------------------------------------------------------------------------
router.patch(
    '/:id',
    authenticate,
    requireRole('admin'),
    validate({ body: updateOrgSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const org = await orgRepo.updateOrganization(req.params.id, req.body)
        if (!org) {
            res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'Organization not found' },
            })
            return
        }
        res.json({ success: true, data: { organization: org } })
    })
)

// ---------------------------------------------------------------------------
// List Members
// ---------------------------------------------------------------------------
router.get(
    '/:id/members',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const members = await orgRepo.listMembers(req.params.id)
        res.json({ success: true, data: { members } })
    })
)

// ---------------------------------------------------------------------------
// Add Member
// ---------------------------------------------------------------------------
router.post(
    '/:id/members',
    authenticate,
    requireRole('admin'),
    validate({ body: addMemberSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const member = await orgRepo.addMember({
            organizationId: req.params.id,
            userId: req.body.userId,
            role: req.body.role,
        })
        res.status(201).json({ success: true, data: { member } })
    })
)

// ---------------------------------------------------------------------------
// Remove Member
// ---------------------------------------------------------------------------
router.delete(
    '/:id/members/:userId',
    authenticate,
    requireRole('admin'),
    asyncHandler(async (req: Request, res: Response) => {
        await orgRepo.removeMember(req.params.id, req.params.userId)
        res.json({ success: true, message: 'Member removed' })
    })
)

// ---------------------------------------------------------------------------
// Update Member Role
// ---------------------------------------------------------------------------
router.patch(
    '/:id/members/:userId/role',
    authenticate,
    requireRole('admin'),
    validate({ body: updateMemberRoleSchema }),
    asyncHandler(async (req: Request, res: Response) => {
        const member = await orgRepo.updateMemberRole(
            req.params.id,
            req.params.userId,
            req.body.role
        )
        res.json({ success: true, data: { member } })
    })
)

// ---------------------------------------------------------------------------
// Audit Logs
// ---------------------------------------------------------------------------
router.get(
    '/:id/audit-logs',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
        const { logs, nextCursor } = await auditLogRepo.listAuditLogs({
            organizationId: req.params.id,
            action: req.query.action as any,
            targetType: req.query.targetType as string,
            targetId: req.query.targetId as string,
            actorId: req.query.actorId as string,
            limit: parseInt(req.query.limit as string) || 50,
            cursor: req.query.cursor as string,
        })
        res.json({ success: true, data: { logs, nextCursor } })
    })
)

export default router
