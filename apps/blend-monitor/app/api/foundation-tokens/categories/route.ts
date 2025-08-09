import { NextRequest, NextResponse } from 'next/server'
import { query } from '../../../../src/backend/lib/database'

export async function GET(request: NextRequest) {
    try {
        // Get all unique categories
        const categoriesResult = await query(`
      SELECT DISTINCT category 
      FROM foundation_tokens 
      WHERE category IS NOT NULL 
      ORDER BY category
    `)

        // Get all unique subcategories for each category
        const subcategoriesResult = await query(`
      SELECT DISTINCT category, subcategory 
      FROM foundation_tokens 
      WHERE subcategory IS NOT NULL 
      ORDER BY category, subcategory
    `)

        // Group subcategories by category
        const subcategoriesByCategory: Record<string, string[]> = {}
        subcategoriesResult.rows.forEach((row: any) => {
            if (!subcategoriesByCategory[row.category]) {
                subcategoriesByCategory[row.category] = []
            }
            subcategoriesByCategory[row.category].push(row.subcategory)
        })

        const categories = categoriesResult.rows.map((row: any) => row.category)

        return NextResponse.json({
            success: true,
            data: {
                categories,
                subcategoriesByCategory,
            },
        })
    } catch (error) {
        console.error('Error fetching token categories:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch token categories',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
