const PORTAL_ID = 'blend-modal-portal'

export const getPortalContainer = (): HTMLElement => {
    let portalContainer = document.getElementById(PORTAL_ID)

    if (!portalContainer) {
        portalContainer = document.createElement('div')
        portalContainer.id = PORTAL_ID
        portalContainer.style.position = 'relative'
        portalContainer.style.zIndex = '99'
        document.body.appendChild(portalContainer)
    }

    return portalContainer
}

export const cleanupPortalContainer = (): void => {
    const portalContainer = document.getElementById(PORTAL_ID)

    if (portalContainer && portalContainer.children.length === 0) {
        document.body.removeChild(portalContainer)
    }
}
