/**
 * Chromatic Configuration Reference
 *
 * Note: Chromatic primarily uses CLI flags, not config files.
 * This file serves as documentation for available options.
 *
 * To use these options, pass them as CLI flags:
 *
 * Example:
 *   chromatic --project-token=xxx --only-changed --exit-zero-on-changes
 *
 * Available CLI flags:
 *   --project-token <token>     Your Chromatic project token
 *   --build-script-name <name>  Script to build Storybook (default: build-storybook)
 *   --storybook-build-dir <dir> Build output directory (default: storybook-static)
 *   --only-changed              Only test changed stories
 *   --exit-zero-on-changes      Exit 0 even if changes detected (for CI)
 *   --auto-accept-changes       Auto-accept all changes (use with caution)
 *   --exit-once-uploaded        Exit after upload, don't wait for results
 *   --ignore-last-build-on-branch <branch>  Ignore last build on branch
 *   --ci                        Enable CI mode
 */

// Chromatic doesn't use a config file by default.
// Configure via CLI flags or environment variables.
// See CHROMATIC_SETUP.md for detailed instructions.
