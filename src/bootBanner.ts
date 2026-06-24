// Console boot banner. Prints a styled product banner for any curious nerd who
// pops open the browser console.
//
// This runs purely client-side, so it works the same on the local dev server
// (`npm run dev`) and on the deployed GitHub Pages site — there's no server
// involved, the browser just runs the bundled JS either way. The call is gated
// behind `import.meta.env.DEV` in main.tsx so it stays dev-only.

// Half-block figlet banner: "APEX DYNAMICS". String.raw keeps the backslashes
// and block glyphs intact regardless of escaping.
const BANNER = String.raw`
█▀█ █▀█ █▀▀ ▀▄▀   █▀▄ █▄█ █▄█ █▀█ █▀▄▀█ █ █▀▀ █▀▀
█▀█ █▀▀ ██▄ █░█   █▄▀ ░█░ █░█ █▀█ █░▀░█ █ █▄▄ ▄██
`

// Guard flag so hot-module reloads and React StrictMode re-invocations don't
// reprint the banner on every refresh during development.
const PRINTED_FLAG = '__apexConsoleBannerPrinted'

/** Print the styled console boot banner. Safe to call more than once: it
 *  no-ops after the first run and bails out in non-browser environments. */
export function printBootBanner(): void {
  if (typeof window === 'undefined' || typeof console === 'undefined') return

  const flags = window as unknown as Record<string, boolean>
  if (flags[PRINTED_FLAG]) return
  flags[PRINTED_FLAG] = true

  const accent = '#a78bfa' // brand violet (--accent)
  const purple = '#863bff' // brand purple hairline (--topbar-border)
  const muted = '#8b949e' // telemetry text (--text-muted)

  console.log(`%c${BANNER}`, `color:${purple};font-weight:700;`)

  console.log(
    '%cClearance granted. %cWelcome to the command-center console.',
    `color:${accent};font-weight:700;`,
    `color:${muted};`,
  )
}
